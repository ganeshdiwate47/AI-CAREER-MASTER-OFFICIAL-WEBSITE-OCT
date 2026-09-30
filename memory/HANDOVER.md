# AI CAREER MASTER — V1.0 HANDOVER (2026-09-30)

## A. Summary of changes (this phase)
- Approved final logo extracted from your attachment → `frontend/public/brand/logo.png` (header/footer on a white chip) + favicon cropped from the AI monogram → `brand/favicon.png`. No redesign, no previous "Career Master" branding.
- Program catalogue moved to MongoDB (database-driven), seeded with your corrected facts:
  - PLACE EASILY: 10-month roadmap (all 10 monthly themes, focus areas, deliverables, outcomes), learning methodology, continuous tracking, college-value list — straight from your infographic. Duration fixed to "10 Months".
  - AI for All: 12 modules with English + Marathi descriptions from your brochures; delivery "9-day (timetable to be confirmed)"; benefits list; brochure image shown on the page.
  - 21-Day CM Placement Sprint: no invented day-wise curriculum — purpose, audience, outcomes, CTA only.
  - AI for Vyapari: "Customizable"; enquiry form now asks business type, main challenge and desired AI applications.
  - AI for Teachers: dual name "AI for Teachers / Faculty Development Program" everywhere.
  - AI for Students: age/education-level eligibility marked configurable.
  - AI Career Growth Strategy: 3-day workshop (not 6 weeks).
  - AI Software Generation: title/curriculum/delivery editable via admin.
- Homepage rebuilt to your section order: Hero (Explore Programs + Book a Strategy Call) → trust & learning benefits (verified only) → featured → audience discovery → methodology + mentors → PLACE EASILY 10-month roadmap → AI for All 12 modules → college partnership → FAQs → CTA + footer. Placeholder testimonial/video/figure sections REMOVED from the page (no fake proof).
- Admin console at /admin (noindex): login, lead analytics (status funnel, by program/source/campaign, 14-day chart, integration status), leads table with status workflow (new→contacted→qualified→enrolled→lost), CSV export, and full program CRUD (add/edit/publish/unpublish/order/price/brochure URL). New programs appear on the site instantly — no code needed.
- Leads: added city, preferred language, student count (colleges), vyapari fields; duplicate handling (same phone+type+program within 24h returns the original, never stored twice); DB saved first, then integrations; success only when stored.
- CRM adapter layer (modular, Coacheasily-first) + full configuration docs. Nothing assumed, nothing activated.
- Social icons in footer: Instagram, Facebook, LinkedIn, YouTube, WhatsApp Community.
- SEO: per-page titles/descriptions, canonical support (set REACT_APP_PUBLIC_URL when live), sitemap.xml (placeholder domain — update at deploy), robots.txt, lazy-loaded images.

## B. Working features + test evidence
- curl: 8 programs published (correct durations verified); admin 401 before login / 200 after; duplicate submission returned same id; lead stored then relay status recorded; CSV export token+cookie protected.
- UI (screenshots): home (desktop + mobile), 10-month roadmap, 12 modules, program detail (mobile), admin login→overview→leads→programs; EN⇄मराठी toggle; AI assistant streaming on Claude/ChatGPT/Gemini in both languages; form success states; no horizontal overflow at 390px/1440px.

## C. Not yet operational — and why
- Coacheasily sync: your account's capabilities/API access are NOT verified (no credentials/documentation in this workspace). Adapter prepared but reports "not_configured" — it will never guess an endpoint.
- Google Forms relay: architecture live; needs your formResponse URL + entry IDs (env). Until then it reports "not_configured" and every lead is still safely stored.
- Payments/LMS/appointments: no gateway/LMS configured in this workspace → enquiry flows only, honestly labelled. No fake dashboards or public "recordings".
- Testimonials/projects/outcome numbers: hidden until you supply verified material.

## D. CRM capability audit — what we need from you
Verified so far: none (cannot see your Coacheasily account from here). Please confirm:
1. Your Coacheasily plan includes: lead management, follow-up statuses, appointment booking, WhatsApp automation, payments, course/LMS, reporting.
2. Whether Coacheasily exposes in your plan: native lead API / webhook / Zapier or CSV import (documented in their help centre).
Required to configure: login URL or API docs, and if API exists — endpoint + key. AI Autofunnel is NOT needed for anything verified so far.

## E. CRM field mapping (proposed — confirm with Coacheasily docs)
name→full_name; phone(+91)→phone; email→email; program→course_interest; city→city; audience→audience_type; preferred_language→language; college org→organisation; message→notes; utm.source/medium/campaign→lead_source/utm fields; page→landing_page; consent recorded with timestamp. Workflow mapping: website lead→new; you set contacted/qualified/enrolled/lost in admin; exports carry status + integration results.

## F. Data ownership & flow
Visitor → form (validated) → YOUR MongoDB (`leads`, consent + timestamp + source + status) → optional relays (Google Forms → your Google Sheet; Coacheasily → your CRM) → results logged per lead (google_result, crm_status). Nothing is stored outside your accounts; relays fail safe (lead is never lost, failure is logged without personal data). Deletion/correction: on request, delete the record in the admin/DB; relays only receive data at submission time.

## G. Configuration & access prerequisites
- Admin: /admin — see test credentials file (change ADMIN_EMAIL/ADMIN_PASSWORD in backend/.env immediately after handover; admin JWT secret already set).
- Google Forms: create a form per lead type → get the formResponse URL + entry IDs (Ctrl+U → search "entry.") → fill GOOGLE_{STUDENT|PARTNERSHIP|STRATEGY}_ACTION + _NAME/EMAIL/PHONE/MESSAGE_ENTRY in backend/.env.
- Coacheasily: verify capabilities (D above); if API exists → COACHEASILY_API_BASE + COACHEASILY_API_KEY; the adapter then relays automatically. No code change needed.
- Canonical URL: set REACT_APP_PUBLIC_URL=https://www.aicareermaster.com in frontend/.env at deploy; update sitemap.xml domain.

## H. Additional costs — NOT approved (nothing purchased)
- None required for what is built. Potential later: Hostinger plan upgrade if shared hosting cannot run Python (see I), MongoDB Atlas free tier (₹0) if MongoDB can't be hosted, WhatsApp API costs if you choose automated WhatsApp (manual link costs nothing).

## I. Hostinger deployment & rollback checklist
Stack: React (static build) + FastAPI + MongoDB.
1. Shared Premium plan (PHP/Node): frontend `yarn build` → upload `build/` to public_html → works. FastAPI + MongoDB will NOT run on shared hosting → options: (a) Hostinger VPS (Python + MongoDB or Atlas free tier) — recurring cost, NOT approved yet; (b) static frontend on Hostinger + backend on the current Emergent deployment.
2. DNS: point domain A/CNAME per Hostinger panel; SSL via free Let's Encrypt in hPanel; force HTTPS redirect.
3. Set env vars on the backend host (all secrets from backend/.env) and REACT_APP_PUBLIC_URL + build before upload.
4. Backup/rollback: keep each `build/` as a zip (rollback = re-upload previous zip); DB: mongodump weekly + before every change; restore via mongorestore.
5. Do NOT publish or change DNS until 1–3 are confirmed. First deploy copies preview data once; content entered after that must be added on the live site.

## J. Prioritized remaining tasks
1. (P0) You: change admin password; supply Google Form links + entry IDs; confirm Coacheasily capabilities/docs.
2. (P0) Supply approved testimonials/photos/figures/videos → we unhide proof sections.
3. (P1) Confirm LinkedIn public URL (footer currently uses the derived /company/142922947/ form of your admin link — verify it opens).
4. (P1) Hostinger decision: VPS upgrade vs static-frontend-only → then deploy with the checklist above.
5. (P2) Confirm AI-for-All final timetable (9-day format) and AI-for-Students batch age bands; adjust in /admin in one click.
