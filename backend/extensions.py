# Extensions: admin auth (HMAC cookie), public programs API, admin programs CRUD,
# admin leads/analytics, and the modular CRM adapter layer (Coacheasily-first).
# Self-contained: owns its own Mongo handle to avoid circular imports with server.py.
import os
import csv
import io
import hmac
import time
import hashlib
from datetime import datetime, timezone, timedelta
from typing import Optional, List

from fastapi import APIRouter, Request, HTTPException, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import httpx

from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

COOKIE_NAME = "acm_admin"
TOKEN_TTL = 12 * 3600
LEAD_STATUSES = {"new", "contacted", "qualified", "enrolled", "lost"}


# ── Admin auth: HMAC-signed token, never exposed to browser JS ──────────
def _secret() -> bytes:
    return os.environ.get("ADMIN_JWT_SECRET", "dev-only-change-me").encode()


def issue_token() -> str:
    exp = int(time.time()) + TOKEN_TTL
    payload = f"admin.{exp}"
    sig = hmac.new(_secret(), payload.encode(), hashlib.sha256).hexdigest()
    return f"{payload}.{sig}"


def verify_token(token: str) -> bool:
    try:
        payload, sig = token.rsplit(".", 1)
        role, exp = payload.split(".")
        if role != "admin" or int(exp) < time.time():
            return False
        return hmac.compare_digest(sig, hmac.new(_secret(), payload.encode(), hashlib.sha256).hexdigest())
    except Exception:
        return False


def is_admin(request: Request) -> bool:
    auth = request.headers.get("authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else request.cookies.get(COOKIE_NAME, "")
    return bool(token) and verify_token(token)


def guard(request: Request):
    if not is_admin(request):
        raise HTTPException(status_code=401, detail="Unauthorized")


def dump(doc: dict) -> dict:
    d = dict(doc)
    d["id"] = str(d.pop("_id"))
    return d


# ── CRM adapter layer — Coacheasily first, modular by design ─────────────
# Capabilities are NOT assumed. Relay activates only when the owner configures
# and verifies the endpoint in .env. Field mapping documented in HANDOVER.md.
COACHEASILY_BASE = (os.getenv("COACHEASILY_API_BASE", "") or "").strip()
COACHEASILY_KEY = (os.getenv("COACHEASILY_API_KEY", "") or "").strip()

CRM_FIELD_MAP = {
    "name": "full_name", "phone": "phone", "email": "email", "program": "course_interest",
    "city": "city", "audience_category": "audience_type", "preferred_language": "language",
    "org": "organisation", "message": "notes", "page": "landing_page",
}


async def relay_to_coacheasily(lead: dict):
    if not (COACHEASILY_BASE and COACHEASILY_KEY):
        return False, "not_configured"
    # Endpoint contract unverified — never guess a CRM URL shape.
    try:
        payload = {CRM_FIELD_MAP[k]: v for k, v in lead.items() if k in CRM_FIELD_MAP and v}
        payload["utm"] = lead.get("utm", {})
        async with httpx.AsyncClient(timeout=10) as ac:
            r = await ac.post(COACHEASILY_BASE.rstrip("/") + "/leads", json=payload,
                              headers={"Authorization": f"Bearer {COACHEASILY_KEY}"})
        return (200 <= r.status_code < 300), f"http_{r.status_code}"
    except httpx.HTTPError as exc:
        return False, type(exc).__name__


# ── Public programs API ──────────────────────────────────────────────────
programs_router = APIRouter(prefix="/api")


@programs_router.get("/programs")
async def list_programs():
    docs = await db.programs.find({"status": "published"}, {"_id": 0}) \
        .sort([("display_order", 1), ("created_at", 1)]).to_list(200)
    return {"programs": docs, "count": len(docs)}


# ── Admin router ─────────────────────────────────────────────────────────
admin_router = APIRouter(prefix="/api/admin")


class LoginIn(BaseModel):
    email: str = Field(max_length=200)
    password: str = Field(max_length=200)


@admin_router.post("/login")
async def admin_login(body: LoginIn, response: Response, request: Request):
    email = (os.environ.get("ADMIN_EMAIL", "") or "").strip().lower()
    password = os.environ.get("ADMIN_PASSWORD", "")
    if not email or not password:
        raise HTTPException(status_code=404, detail="Not found")
    if body.email.strip().lower() != email or not hmac.compare_digest(body.password, password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    response.set_cookie(COOKIE_NAME, issue_token(), httponly=True, samesite="lax",
                        secure=True, max_age=TOKEN_TTL, path="/")
    return {"ok": True}


@admin_router.post("/logout")
async def admin_logout(response: Response):
    response.delete_cookie(COOKIE_NAME, path="/")
    return {"ok": True}


@admin_router.get("/me")
async def admin_me(request: Request):
    guard(request)
    return {"ok": True}


@admin_router.get("/stats")
async def admin_stats(request: Request):
    guard(request)
    total = await db.leads.count_documents({})
    by_status = {s: 0 for s in LEAD_STATUSES}
    async for row in db.leads.aggregate([{"$group": {"_id": "$status", "n": {"$sum": 1}}}]):
        if row["_id"] in by_status:
            by_status[row["_id"]] = row["n"]
    by_program_rows = await db.leads.aggregate([
        {"$group": {"_id": "$program", "n": {"$sum": 1}}}, {"$sort": {"n": -1}}, {"$limit": 10}
    ]).to_list(10)
    by_source_rows = await db.leads.aggregate([
        {"$group": {"_id": {"$ifNull": ["$utm.source", ""]}, "n": {"$sum": 1}}}, {"$sort": {"n": -1}}
    ]).to_list(20)
    by_campaign_rows = await db.leads.aggregate([
        {"$match": {"utm.campaign": {"$nin": [None, ""]}}},
        {"$group": {"_id": "$utm.campaign", "n": {"$sum": 1}}}, {"$sort": {"n": -1}}
    ]).to_list(20)
    google_configured = bool((os.getenv("GOOGLE_STUDENT_ACTION", "") or "").strip())
    pending = await db.leads.count_documents({"google_submitted": False, "google_result": "pending"})
    failed = await db.leads.count_documents({
        "google_submitted": False,
        "google_result": {"$nin": ["pending", "not_configured", None, ""]},
    })
    days = []
    today = datetime.now(timezone.utc).date()
    for i in range(13, -1, -1):
        day = today - timedelta(days=i)
        nxt = day + timedelta(days=1)
        days.append({"date": day.isoformat(), "count": await db.leads.count_documents({
            "created_at": {"$gte": day.isoformat(), "$lt": nxt.isoformat()}
        })})
    return {
        "total": total, "by_status": by_status,
        "by_program": [{"program": r["_id"] or "unassigned", "count": r["n"]} for r in by_program_rows],
        "by_source": [{"source": r["_id"] or "Direct/Unattributed", "count": r["n"]} for r in by_source_rows],
        "by_campaign": [{"campaign": r["_id"], "count": r["n"]} for r in by_campaign_rows],
        "integrations": {"google_forms_configured": google_configured, "pending_sync": pending, "failed": failed},
        "last14days": days,
    }


@admin_router.get("/leads")
async def admin_leads(request: Request, skip: int = 0, limit: int = 50, status: str = ""):
    guard(request)
    q = {}
    if status in LEAD_STATUSES:
        q["status"] = status
    total = await db.leads.count_documents(q)
    docs = await db.leads.find(q).sort("created_at", -1).skip(skip).limit(min(limit, 200)).to_list(200)
    return {"total": total, "leads": [dump(d) for d in docs]}


class StatusIn(BaseModel):
    status: str = Field(pattern="^(new|contacted|qualified|enrolled|lost)$")


@admin_router.patch("/leads/{lead_id}")
async def admin_lead_status(lead_id: str, body: StatusIn, request: Request):
    guard(request)
    from bson import ObjectId
    try:
        oid = ObjectId(lead_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Bad id")
    res = await db.leads.update_one({"_id": oid}, {"$set": {
        "status": body.status, "status_updated_at": datetime.now(timezone.utc).isoformat(),
    }})
    if not res.matched_count:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"ok": True}


@admin_router.get("/leads/export")
async def admin_export(request: Request):
    guard(request)
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(10000)
    buf = io.StringIO()
    if rows:
        fields = ["created_at", "lead_type", "status", "name", "phone", "phone_country_code", "email",
                  "program", "org", "role", "interest", "status_field", "message", "lang", "page", "city",
                  "audience_category", "preferred_language", "student_count", "business_type",
                  "main_challenge", "ai_applications", "utm_source", "utm_medium", "utm_campaign",
                  "google_submitted", "google_result", "crm_status"]
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


class ProgramIn(BaseModel):
    slug: str = Field(min_length=2, max_length=80)
    name: dict = Field(default_factory=dict)
    tag: dict = Field(default_factory=dict)
    summary: dict = Field(default_factory=dict)
    description: Optional[dict] = None
    icon: str = "Sparkles"
    accent: str = "royal"
    featured: bool = False
    audience: List[str] = Field(default_factory=list)
    duration: Optional[dict] = None
    format: Optional[dict] = None
    level: Optional[dict] = None
    eligibility: Optional[dict] = None
    prerequisites: Optional[dict] = None
    highlights: List[dict] = Field(default_factory=list)
    outcomes: List[dict] = Field(default_factory=list)
    modules: List[dict] = Field(default_factory=list)
    roadmap: List[dict] = Field(default_factory=list)
    methodology: List[dict] = Field(default_factory=list)
    tracking: List[dict] = Field(default_factory=list)
    college_value: List[dict] = Field(default_factory=list)
    careers: List[dict] = Field(default_factory=list)
    price: Optional[float] = None
    offer_price: Optional[float] = None
    cta_label: Optional[dict] = None
    brochure_url: Optional[str] = None
    status: str = Field(default="published", pattern="^(draft|published)$")
    display_order: int = 0


@admin_router.get("/programs")
async def admin_programs(request: Request):
    guard(request)
    docs = await db.programs.find({}).sort([("display_order", 1), ("created_at", 1)]).to_list(300)
    return {"programs": [dump(d) for d in docs]}


@admin_router.post("/programs")
async def admin_program_create(body: ProgramIn, request: Request):
    guard(request)
    if await db.programs.count_documents({"slug": body.slug}):
        raise HTTPException(status_code=409, detail="Slug already exists")
    doc = body.model_dump()
    now = datetime.now(timezone.utc).isoformat()
    doc["created_at"] = now
    doc["updated_at"] = now
    res = await db.programs.insert_one(doc)
    return {"ok": True, "id": str(res.inserted_id)}


@admin_router.put("/programs/{slug}")
async def admin_program_update(slug: str, body: ProgramIn, request: Request):
    guard(request)
    doc = body.model_dump()
    doc["updated_at"] = datetime.now(timezone.utc).isoformat()
    res = await db.programs.update_one({"slug": slug}, {"$set": doc})
    if not res.matched_count:
        raise HTTPException(status_code=404, detail="Program not found")
    return {"ok": True}


@admin_router.delete("/programs/{slug}")
async def admin_program_delete(slug: str, request: Request):
    guard(request)
    res = await db.programs.delete_one({"slug": slug})
    if not res.deleted_count:
        raise HTTPException(status_code=404, detail="Program not found")
    return {"ok": True}


# ── Seed on first run ────────────────────────────────────────────────────
async def seed_programs():
    from programs_seed import PROGRAMS_SEED
    if await db.programs.count_documents({}) == 0:
        now = datetime.now(timezone.utc).isoformat()
        for i, p in enumerate(PROGRAMS_SEED):
            p.setdefault("status", "published")
            p.setdefault("display_order", i)
            p.setdefault("price", None)
            p.setdefault("offer_price", None)
            p.setdefault("created_at", now)
            p.setdefault("updated_at", now)
            await db.programs.insert_one(dict(p))
        print(f"Seeded {len(PROGRAMS_SEED)} programs")
