import os
import csv
import io
import time
import uuid
import logging
from datetime import datetime, timezone
from typing import Optional, Dict

import httpx
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field, BeforeValidator, field_validator
from typing_extensions import Annotated
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="AI Career Master API")
api_router = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("aicm")


# ── Models ──────────────────────────────────────────────────────────────
PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v))]


class LeadIn(BaseModel):
    lead_type: str = Field(pattern="^(student|college|strategy)$")
    name: str = Field(min_length=2, max_length=200)
    phone: str = Field(min_length=6, max_length=25)
    phone_country_code: Optional[str] = Field(default=None, max_length=6)
    email: Optional[str] = Field(default=None, max_length=200)
    program: Optional[str] = Field(default=None, max_length=120)
    org: Optional[str] = Field(default=None, max_length=250)
    role: Optional[str] = Field(default=None, max_length=150)
    interest: Optional[str] = Field(default=None, max_length=150)
    status: Optional[str] = Field(default=None, max_length=150)
    message: Optional[str] = Field(default=None, max_length=3000)
    consent: bool
    lang: Optional[str] = Field(default="en", max_length=8)
    page: Optional[str] = Field(default=None, max_length=400)
    utm: Dict[str, str] = Field(default_factory=dict)

    @field_validator("consent")
    @classmethod
    def consent_must_be_true(cls, v):
        if not v:
            raise ValueError("Consent is required")
        return v


# ── Simple in-memory rate limiting (per IP, no external dependency) ─────
RATE_LIMIT_MAX = 10
RATE_LIMIT_WINDOW = 60
_rate_store: Dict[str, list] = {}


def rate_limited(ip: str) -> bool:
    now = time.time()
    hits = [h for h in _rate_store.get(ip, []) if now - h < RATE_LIMIT_WINDOW]
    if len(hits) >= RATE_LIMIT_MAX:
        return True
    hits.append(now)
    _rate_store[ip] = hits
    return False


# ── Google Forms relay (credential-free formResponse endpoint) ──────────
# Owner configures per lead_type in backend/.env, e.g.:
#   GOOGLE_STUDENT_ACTION=https://docs.google.com/forms/d/e/<id>/formResponse
#   GOOGLE_STUDENT_NAME_ENTRY=entry.123456   (exact entry IDs from the form HTML)
#   GOOGLE_STUDENT_EMAIL_ENTRY=entry.234567
#   GOOGLE_STUDENT_PHONE_ENTRY=entry.345678
#   GOOGLE_STUDENT_MESSAGE_ENTRY=entry.456789
_PREFIX = {"student": "STUDENT", "college": "PARTNERSHIP", "strategy": "STRATEGY"}


def _google_cfg(lead_type: str) -> dict:
    p = _PREFIX.get(lead_type, "")
    def g(key):
        return (os.getenv(f"GOOGLE_{p}_{key}", "") or "").strip()
    return {"action": g("ACTION"), "name": g("NAME_ENTRY"), "email": g("EMAIL_ENTRY"),
            "phone": g("PHONE_ENTRY"), "message": g("MESSAGE_ENTRY")}


def _configured(cfg: dict) -> bool:
    return bool(cfg["action"] and cfg["name"] and cfg["email"])


async def relay_to_google(lead: LeadIn) -> (bool, str):
    cfg = _google_cfg(lead.lead_type)
    if not _configured(cfg):
        return False, "not_configured"
    payload = {cfg["name"]: lead.name, cfg["email"]: lead.email or ""}
    if lead.phone and cfg["phone"]:
        payload[cfg["phone"]] = (lead.phone_country_code or "+91") + " " + lead.phone
    if lead.message and cfg["message"]:
        payload[cfg["message"]] = lead.message
    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=10) as ac:
            r = await ac.post(cfg["action"], data=payload)
        return (200 <= r.status_code < 400), f"http_{r.status_code}"
    except httpx.HTTPError as exc:
        logger.warning("Google relay failed: %s", exc)
        return False, type(exc).__name__


# ── AI Career Assistant (Emergent universal key: Claude / ChatGPT / Gemini) ──
import json as _json
from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

AI_MODELS = {
    "claude": ("anthropic", "claude-sonnet-5-5"),
    "chatgpt": ("openai", "gpt-5.4"),
    "gemini": ("gemini", "gemini-3.1-pro-preview"),
}

AI_KB_EN = """1. PLACE EASILY — Career Transformation Program (final-year students, fresh graduates) — flagship 90-day journey: diagnostic career mapping, AI skills, resume, LinkedIn, mock interviews, placement drives.
2. 21 Days CM Placement Sprint (final-year students, fresh graduates) — intensive 21-day placement prep: aptitude, company patterns, ATS resume, GD & HR rounds.
3. AI for All (absolute beginners, all audiences incl. parents) — Marathi-first AI literacy, 10 practical modules: basic computer to AI tools, prompt engineering, data science basics, vibe coding. No IT background needed.
4. AI for Vyapari (small business owners) — AI posters & product photos, WhatsApp marketing, ads, automated customer replies, daily ops.
5. AI for Teachers (educators) — lesson plans, worksheets, assessments, presentations, parent communication with AI.
6. AI for Students (students & parents) — AI study systems, notes, projects, presentations, intro to coding, career planning.
7. AI for Working Professionals — AI Career Growth Strategy (working professionals) — AI productivity stack, workflow automation, personal brand, 90-day growth plan; free 1-on-1 strategy call.
8. AI Software Generation (professionals, graduates, business owners) — build custom GPTs, chatbots, AI agents, no-code automations.
Format: offline at Sai Computers, Tarale (Satara) + online live across Maharashtra. Teaching language: Marathi-first. Mentors: Ganesh Diwate (10+ yrs corporate: Tata International, P&G, Mondelez, Volkswagen) and Prashant Amane (30+ yrs education, MKCL Master Trainer). Contact: +91 91751 57977, careermaster1998@gmail.com, www.aicareermaster.com."""


def _ai_system(lang: str) -> str:
    lang_line = (
        "Always reply in Marathi (Devanagari script), simple and warm."
        if lang == "mr"
        else "Always reply in English, simple and warm."
    )
    return (
        "You are the AI Career Assistant on the official AI Career Master website — an AI Powered "
        "Career Acceleration Platform bridging the gap between education and employment in Maharashtra. "
        + lang_line +
        " Keep answers under 120 words, friendly and specific. Recommend the most relevant program by name "
        "and point to the Programs page. For fees, schedules and instalments: never invent numbers — invite the "
        "visitor to book a free AI Career Growth Strategy call on the Contact page or join the WhatsApp community. "
        "Never promise a job guarantee. Ground every answer in the program catalog below.\n\nPROGRAM CATALOG:\n"
        + AI_KB_EN
    )


class ChatIn(BaseModel):
    session_id: str = Field(min_length=6, max_length=64)
    provider: str = Field(default="claude", pattern="^(claude|chatgpt|gemini)$")
    message: str = Field(min_length=1, max_length=2000)
    lang: str = Field(default="en", pattern="^(en|mr)$")


@api_router.get("/ai/models")
async def ai_models():
    return {"models": [{"id": k, "label": {"claude": "Claude", "chatgpt": "ChatGPT", "gemini": "Gemini"}[k]} for k in AI_MODELS]}


@api_router.post("/ai/chat")
async def ai_chat(body: ChatIn, request: Request):
    if rate_limited(request.client.host if request.client else "unknown"):
        raise HTTPException(status_code=429, detail="Too many requests.")

    provider, model = AI_MODELS[body.provider]

    async def gen():
        try:
            await db.ai_chat_messages.insert_one({
                "session_id": body.session_id, "role": "user", "provider": body.provider,
                "content": body.message, "created_at": datetime.now(timezone.utc).isoformat(),
            })
            history = await db.ai_chat_messages.find(
                {"session_id": body.session_id}, {"_id": 0, "role": 1, "content": 1}
            ).sort("created_at", 1).to_list(20)
            transcript = "\n".join(
                f"{'User' if m['role'] == 'user' else 'Assistant'}: {m['content'][:500]}" for m in history[-10:]
            )
            text = body.message if not transcript else f"Previous conversation:\n{transcript}\n\nUser's new message: {body.message}"
            chat = (
                LlmChat(
                    api_key=os.environ["EMERGENT_LLM_KEY"],
                    session_id=f"{body.session_id}-{body.provider}",
                    system_message=_ai_system(body.lang),
                )
                .with_model(provider, model)
            )
            full = ""
            async for ev in chat.stream_message(UserMessage(text=text)):
                if isinstance(ev, TextDelta):
                    full += ev.content
                    yield f"data: {_json.dumps({'delta': ev.content})}\n\n"
                elif isinstance(ev, StreamDone):
                    break
            await db.ai_chat_messages.insert_one({
                "session_id": body.session_id, "role": "assistant", "provider": body.provider,
                "content": full, "created_at": datetime.now(timezone.utc).isoformat(),
            })
            yield f"data: {_json.dumps({'done': True})}\n\n"
        except Exception as exc:
            logger.error("AI chat error: %s", exc)
            yield f"data: {_json.dumps({'error': 'ai_unavailable'})}\n\n"

    return StreamingResponse(
        gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── Routes ──────────────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"status": "ok", "service": "AI Career Master API"}


@api_router.get("/health")
async def health():
    try:
        await db.command("ping")
        return {"status": "ok", "db": "up"}
    except Exception as exc:  # pragma: no cover
        return {"status": "degraded", "db": str(exc)}


@api_router.post("/leads")
async def create_lead(lead: LeadIn, request: Request):
    if rate_limited(request.client.host if request.client else "unknown"):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again shortly.")

    doc = lead.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["google_submitted"] = False
    doc["google_result"] = "pending"

    result = await db.leads.insert_one(doc)  # store first — MongoDB is the safety net
    ok, status = await relay_to_google(lead)
    await db.leads.update_one(
        {"_id": result.inserted_id},
        {"$set": {"google_submitted": ok, "google_result": status}},
    )
    return {"ok": True, "id": str(result.inserted_id), "stored": True, "google_submitted": ok}


@api_router.get("/leads/export")
async def export_leads(request: Request):
    token = os.getenv("ADMIN_TOKEN", "").strip()
    if not token or request.headers.get("x-admin-token") != token:
        raise HTTPException(status_code=404, detail="Not found")
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(10000)
    buf = io.StringIO()
    if rows:
        fields = ["created_at", "lead_type", "name", "phone", "phone_country_code", "email",
                  "program", "org", "role", "interest", "status", "message", "lang", "page",
                  "utm_source", "utm_medium", "utm_campaign", "google_submitted", "google_result"]
        writer = csv.DictWriter(buf, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        for r in rows:
            utm = r.get("utm") or {}
            r["utm_source"] = utm.get("source", "")
            r["utm_medium"] = utm.get("medium", "")
            r["utm_campaign"] = utm.get("campaign", "")
            writer.writerow(r)
    buf.seek(0)
    return StreamingResponse(
        buf, media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=aicareermaster-leads.csv"},
    )


app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
