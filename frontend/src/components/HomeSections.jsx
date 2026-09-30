import { Link } from "react-router-dom";
import { Award, BookOpenCheck, GraduationCap, LineChart, Trophy, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHead from "@/components/SectionHead";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";
import { usePrograms } from "@/context/ProgramsContext";
import { BADGES, FOUNDERS, IMAGES } from "@/data/site";

// Trust & learning benefits — verified facts only (no invented numbers).
export function TrustBand() {
  const { t, L } = useLang();
  const trust = [
    { icon: Users, title: t("sections.trust.b1t"), desc: t("sections.trust.b1d") },
    { icon: BookOpenCheck, title: t("sections.trust.b2t"), desc: t("sections.trust.b2d") },
    { icon: Award, title: t("sections.trust.b3t"), desc: t("sections.trust.b3d") },
    { icon: LineChart, title: t("sections.trust.b4t"), desc: t("sections.trust.b4d") },
  ];
  return (
    <section className="bg-white py-16 sm:py-20" data-testid="trust-band">
      <div className="container-x">
        <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {trust.map((b) => (
            <RevealItem key={b.title} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-royal/10 text-royal"><b.icon className="h-6 w-6" /></span>
              <div>
                <h3 className="text-sm font-bold text-navy">{b.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {BADGES.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-cream px-4 py-1.5 text-xs font-bold text-gold-dim">
              <Trophy className="h-3.5 w-3.5" /> {b}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// Learning methodology + mentor introduction (verified).
export function Methodology() {
  const { t, L } = useLang();
  const p = usePrograms().bySlug("place-easily");
  const items = (p && p.methodology) ? p.methodology : [];
  if (!items.length) return null;
  return (
    <section className="py-16 sm:py-24" data-testid="methodology-section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHead eyebrow="sections.method.eyebrow" titleKey="sections.method.title" subKey="sections.method.sub" />
          <RevealGroup className="mt-9 grid gap-3 sm:grid-cols-2" stagger={0.05}>
            {items.map((m, i) => (
              <RevealItem key={i} className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                <span className="text-sm font-semibold text-navy/85">{L(m)}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2">
          {FOUNDERS.map((f) => (
            <Link to="/about" key={f.id} data-testid={`method-mentor-${f.id}`} className="card-lift rounded-2xl border border-border bg-white p-6 text-center">
              <img src={f.photo} alt={f.name} className="mx-auto h-24 w-24 rounded-full object-cover object-top ring-2 ring-gold/60" />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">{L({ en: f.name, mr: f.nameMr })}</h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-royal">{L(f.role)}</p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// PLACE EASILY — 10-month transformation roadmap (from the approved curriculum infographic).
export function Roadmap10() {
  const { t, L } = useLang();
  const p = usePrograms().bySlug("place-easily");
  const rows = (p && p.roadmap) || [];
  if (!rows.length) return null;
  return (
    <section className="grain relative overflow-hidden bg-navy py-16 sm:py-24" data-testid="roadmap-10">
      <div className="container-x relative">
        <SectionHead dark eyebrow="sections.roadmap.eyebrow" titleKey="sections.roadmap.title" subKey="sections.roadmap.sub" />
        <RevealGroup className="mt-12 space-y-3" stagger={0.04}>
          {rows.map((r) => (
            <RevealItem key={r.month} className="group grid grid-cols-[auto_1fr] items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:bg-white/10 sm:gap-6 sm:p-6" data-testid={`roadmap-month-${r.month}`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 font-display text-lg font-bold text-gold">
                {r.month}
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white sm:text-base">{L(r.theme)}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/60 sm:text-sm">
                  {(L(r.focus) || []).join(" • ")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-royal/20 px-3 py-1 text-[11px] font-semibold text-blue-100">{L(r.deliverable)}</span>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold text-gold">{L(r.outcome)}</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.2} className="mt-8 text-center">
          <Link to="/programs/place-easily" className="btn-primary" data-testid="roadmap-cta">{t("misc.viewProgram")} — PLACE EASILY</Link>
        </Reveal>
      </div>
    </section>
  );
}

// AI for All — 12 learning modules (from the approved brochures).
export function Modules12() {
  const { t, L } = useLang();
  const p = usePrograms().bySlug("ai-for-all");
  const mods = (p && p.modules) || [];
  if (!mods.length) return null;
  return (
    <section className="py-16 sm:py-24" data-testid="modules-12">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="sections.modules12.eyebrow" titleKey="sections.modules12.title" subKey="sections.modules12.sub" />
          <Reveal delay={0.1}>
            <Link to="/programs/ai-for-all" className="inline-flex items-center gap-2 text-sm font-bold text-royal hover:text-navy" data-testid="modules12-cta">
              {t("misc.viewProgram")} →
            </Link>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {mods.map((m, i) => (
            <RevealItem key={i} className="rounded-2xl border border-border bg-white p-6" data-testid={`module-card-${i + 1}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal/10 font-display text-sm font-bold text-royal">{i + 1}</span>
              <h3 className="mt-4 text-sm font-bold text-navy sm:text-base">{L(m.title)}</h3>
              {m.desc && <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{L(m.desc)}</p>}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

// FAQs (same verified set as the Contact page).
export function HomeFaq() {
  const { t } = useLang();
  return (
    <section className="bg-white py-16 sm:py-24" data-testid="home-faq">
      <div className="container-x max-w-4xl">
        <SectionHead align="center" eyebrow="FAQ" titleKey="pages.contact.faqTitle" />
        <Reveal className="mt-10">
          <Accordion type="single" collapsible className="w-full" data-testid="home-faq-accordion">
            {t("faq").map((f, i) => (
              <AccordionItem key={i} value={`hfaq-${i}`} data-testid={`home-faq-item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-bold text-navy sm:text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
