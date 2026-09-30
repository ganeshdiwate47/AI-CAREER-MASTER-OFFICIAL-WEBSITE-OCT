# AI Career Master — PRD (Version 1.0)

## Original Problem Statement
Build Version 1.0 of the official AI Career Master website (AI Powered Career Acceleration Platform; positioning: bridging the gap between education and employment). Premium corporate modern EdTech; colors: royal blue, deep navy, white, vibrant orange, restrained gold. Generate student/parent/institutional leads and present all 8 programs. Pages: Home, About Us, Programs, Individual Program Details, For Colleges, Contact Us, Privacy Policy, Terms. Reusable lead forms (student enquiry, college partnership, strategy call) with consent, validation, success states, lead-source/campaign/program capture. CRM: Coacheasily primary, AI Autofunnel secondary — do not assume APIs; build integration-ready architecture. Responsive, accessible, SEO-ready, env-based secrets. Hosting target: Hostinger (inspect framework first). Phase 1 only. Later requests: bilingual EN/MR switching; no generated photos (provision for owner's originals); founder details supplied (Ganesh Diwate, Prashant Amane); contact details from aicarreermaster.lovable.app; then add Claude + ChatGPT + Gemini LLM integrations.

## Architecture
- Frontend: React 19 (CRA/craco) + Tailwind 3.4 + framer-motion 11 + lenis + react-helmet-async + shadcn/ui. Bilingual via i18n Context (en.js / mr.js), data-driven programs catalog (src/data/programs.js) + site content (src/data/site.js).
- Backend: FastAPI + Motor (MongoDB). Routes: GET /api, GET /api/health, POST /api/leads (validate → store → optional Google Forms formResponse relay), GET /api/leads/export (CSV, x-admin-token), GET /api/ai/models, POST /api/ai/chat (SSE streaming via emergentintegrations: Claude sonnet-5-5 / GPT-5.4 / Gemini 3.1 Pro; history in ai_chat_messages).
- Integrations: Google Forms relay (credential-free, env-configured GOOGLE_*_ACTION/ENTRY), Emergent universal LLM key for all 3 LLM providers.

## User Personas
1. Final-year UG/PG student seeking first job (PLACE EASILY, Sprint)
2. Fresh graduate (placement programs)
3. Working professional (AI Career Growth Strategy)
4. Teacher/educator (AI for Teachers)
5. Small business owner/vyapari (AI for Vyapari)
6. Parent evaluating for child (AI for Students/All)
7. College principal/TPO (institutional partnership, MoU/FDP/drives)

## Core Requirements (static)
8 programs, 8 pages, bilingual EN⇄MR toggle, 3 reusable lead forms with consent/validation/UTM capture, 8D Framework™ section, audience-based discovery, founder/leadership section, clearly-marked placeholder testimonials/video/figures, SEO metadata per page, data-testids throughout, no generated photos (swap-ready placeholders).

## Implemented (2026-09-30)
- Phase 1 site: Home (hero kinetic reveal + marquee + discovery + featured + 8D + journey + differentiators + institutional + founders + testimonial placeholders + strategy-call CTA), About, Programs (audience filter), Program Detail (sticky enquiry form), For Colleges (6 models, process, benefits, partnership form), Contact (3 form tabs, info, FAQ), Privacy, Terms — all bilingual EN/MR.
- Lead pipeline: POST /api/leads → MongoDB + optional Google Forms relay; CSV export with admin token; rate limiting; consent enforced server-side (422 without).
- AI Career Assistant (2026-09-30): floating widget, provider switcher Claude/ChatGPT/Gemini, SSE streaming, bilingual system prompt grounded on program catalog, chat history in MongoDB, quick prompts, rate-limited.
- Founder photos from owner's live site; contact details from owner's materials (phone, email, WhatsApp, Pune + Satara centre).

## Placeholder Items Awaiting Owner (marked on site)
- Approved final logo → drop at frontend/public/brand/logo.png (favicon: public/favicon.svg)
- Original photos → replace files in frontend/public/images/
- Verified testimonials, student-story video, result figures → src/data/site.js (TESTIMONIALS/STATS)

## Implemented (2026-09-30) — Phase 2 update
- Approved final logo extracted from owner attachment (brand/logo.png + cropped favicon); previous-branding assets removed from display.
- Program catalogue migrated to MongoDB with admin CRUD at /admin (login: HMAC httpOnly cookie); homepage rebuilt to the v1.0 section order; PLACE EASILY 10-month roadmap (infographic source), AI for All 12 modules (brochure source, EN+MR), corrected durations (10-month / 21-day / 9-day / 3-day workshop), FDP dual-name, vyapari custom enquiry fields, configurable student eligibility.
- Leads: extended fields (city, preferred language, student count, business type/challenge/AI applications), duplicate handling (phone+type+program / 24h), status workflow + analytics dashboard, cookie-protected CSV export, DB-first persistence with integration status logging.
- Social footer links (Instagram/Facebook/LinkedIn-derived/YouTube/WhatsApp), sitemap.xml, canonical support via REACT_APP_PUBLIC_URL.
- CRM adapter layer (Coacheasily-first, modular) with documented field mapping — inactive until account verification.

## Prioritized Backlog
- P0: Configure Google Forms env vars (owner supplies formResponse URL + entry IDs); Coacheasily capability audit before connecting; deploy to Hostinger.
- P1: Owner content pass (photos/testimonials/figures), sitemap.xml + OG image, WhatsApp chat API button tracking.
- P2: UTM dashboard for leads, blog/insights section, admission-calendar campaigns, auto-retry for failed Google relays.

## Next Tasks
1. Owner: create 3 Google Forms → fill GOOGLE_*_ACTION/ENTRY env vars → mapping test.
2. Owner: share approved logo + originals + verified testimonials/figures → swap placeholders.
3. Hostinger deployment: static React build (dist) + FastAPI needs Python hosting (VPS/Cloud) — document plan per actual plan type.
