import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, CheckCircle2, Info, PlayCircle, Quote } from "lucide-react";
import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SectionHead from "@/components/SectionHead";
import ProgramCard from "@/components/ProgramCard";
import CTABand from "@/components/CTABand";
import LeadForm from "@/components/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import icons from "@/components/programIcons";
import { useLang } from "@/i18n/LanguageContext";
import { AUDIENCES, featuredPrograms, programsForAudience } from "@/data/programs";
import {
  FRAMEWORK_8D, JOURNEY, DIFFERENTIATORS, FOUNDERS, TESTIMONIALS, STATS, IMAGES, BADGES,
} from "@/data/site";

function Discovery() {
  const { t } = useLang();
  const [active, setActive] = useState("students");
  const list = programsForAudience(active);
  return (
    <section id="discovery" className="py-16 sm:py-24 lg:py-28">
      <div className="container-x">
        <SectionHead eyebrow="sections.discover.eyebrow" titleKey="sections.discover.title" subKey="sections.discover.sub" />
        <Reveal className="mt-10 flex gap-3 overflow-x-auto no-scrollbar pb-2" y={16}>
          {AUDIENCES.map((key) => (
            <button
              key={key}
              type="button"
              data-testid={`audience-chip-${key}`}
              onClick={() => setActive(key)}
              aria-pressed={active === key}
              className={`shrink-0 rounded-2xl border px-5 py-3 text-left transition-all duration-200 ${active === key ? "border-navy bg-navy text-white shadow-lg" : "border-border bg-white text-navy hover:border-navy/40"}`}
            >
              <span className="block text-sm font-bold">{t(`audiences.${key}.label`)}</span>
              <span className={`mt-0.5 block text-xs ${active === key ? "text-white/60" : "text-muted-foreground"}`}>{t(`audiences.${key}.sub`)}</span>
            </button>
          ))}
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="discovery-grid">
          {list.map((p) => <ProgramCard key={p.slug} program={p} />)}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const { t } = useLang();
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="sections.featured.eyebrow" titleKey="sections.featured.title" subKey="sections.featured.sub" />
          <Reveal delay={0.1}>
            <Link to="/programs" className="inline-flex items-center gap-2 text-sm font-bold text-royal hover:text-navy" data-testid="featured-view-all">
              {t("sections.featured.all")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {featuredPrograms.map((p) => (
            <RevealItem key={p.slug} className="h-full"><ProgramCard program={p} /></RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Framework() {
  const { L } = useLang();
  return (
    <section className="grain relative overflow-hidden bg-navy py-16 sm:py-24 lg:py-28" data-testid="framework-8d">
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-royal/25 blur-3xl" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHead dark eyebrow="sections.framework.eyebrow" titleKey="sections.framework.title" subKey="sections.framework.sub" />
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {FRAMEWORK_8D.map((d) => (
            <RevealItem key={d.n} className="group bg-navy p-8 transition-colors duration-300 hover:bg-navy-2">
              <p className="font-display text-4xl font-semibold text-gold-shimmer">{d.n}</p>
              <h3 className="mt-4 text-base font-bold leading-snug text-white">{L(d.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{L(d.desc)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.2}><p className="mt-6 text-xs text-white/40">Career Master 8D Career Transformation Framework™ — proprietary to AI Career Master.</p></Reveal>
      </div>
    </section>
  );
}

function Journey() {
  const { L } = useLang();
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <div className="container-x">
        <SectionHead align="center" eyebrow="sections.journey.eyebrow" titleKey="sections.journey.title" subKey="sections.journey.sub" />
        <RevealGroup className="mt-14 grid gap-10 lg:grid-cols-5 lg:gap-6" stagger={0.12}>
          {JOURNEY.map((s, i) => (
            <RevealItem key={i} className="relative text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-white font-display text-lg font-bold text-navy shadow-sm" data-testid={`journey-step-${i + 1}`}>
                  {i + 1}
                </span>
                <h3 className="mt-5 text-base font-bold text-navy">{L(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{L(s.desc)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Differentiators() {
  const { t, L } = useLang();
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28" data-testid="differentiators">
      <div className="container-x grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHead eyebrow="sections.diff.eyebrow" titleKey="sections.diff.title" subKey="sections.diff.sub" />
          <div className="mt-10 space-y-7">
            {DIFFERENTIATORS.map((d, i) => {
              const Icon = icons[d.icon] || icons.Sparkles;
              return (
                <Reveal key={i} delay={i * 0.05} className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-royal/10 text-royal"><Icon className="h-6 w-6" /></span>
                  <div>
                    <h3 className="font-bold text-navy">{L(d.title)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{L(d.desc)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Reveal delay={0.15} className="self-start lg:sticky lg:top-28">
          <div className="grain relative overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-10" data-testid="outcomes-card">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-royal/30 blur-3xl" aria-hidden="true" />
            <p className="eyebrow text-gold">Outcomes</p>
            <div className="relative mt-8 grid grid-cols-2 gap-8">
              {STATS.map((s) => (
                <div key={s.id}>
                  <p className="font-display text-4xl font-semibold text-gold-shimmer" data-testid={`stat-${s.id}`}>{s.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/60">{t(`stats.${s.id}`)}</p>
                </div>
              ))}
            </div>
            <div className="hairline-gold my-8" />
            <div className="flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-1.5 text-[11px] font-semibold text-gold/90">
                  <BadgeCheck className="h-3.5 w-3.5" /> {b}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-white/45">{t("misc.placeholderStat")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Institutional() {
  const { t, L } = useLang();
  return (
    <section className="py-16 sm:py-24 lg:py-28" data-testid="institutional-section">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="absolute -inset-3 rounded-[28px] border border-gold/50" aria-hidden="true" />
          <img src={IMAGES.campus} alt="Partner college campus" className="aspect-[4/3] w-full rounded-3xl object-cover" data-testid="institutional-image" />
        </Reveal>
        <div>
          <SectionHead eyebrow="sections.partners.eyebrow" titleKey="sections.partners.title" subKey="sections.partners.sub" />
          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3" stagger={0.08}>
            {[
              { icon: "BriefcaseBusiness", key: "Placement Drives" },
              { icon: "Presentation", key: "Faculty Development" },
              { icon: "Lightbulb", key: "AI Innovation Lab" },
            ].map((m) => {
              const Icon = icons[m.icon];
              return (
                <RevealItem key={m.key} className="rounded-2xl border border-border bg-white p-5">
                  <Icon className="h-6 w-6 text-orange" />
                  <p className="mt-3 text-sm font-bold text-navy">{m.key}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <Reveal delay={0.2}>
            <Link to="/colleges" className="btn-navy mt-8" data-testid="institutional-cta">{t("sections.partners.cta")}</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Founders() {
  const { L } = useLang();
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28" data-testid="founders-section">
      <div className="container-x">
        <SectionHead eyebrow="sections.founders.eyebrow" titleKey="sections.founders.title" subKey="sections.founders.sub" />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-cream card-lift" data-testid={`founder-card-${f.id}`}>
                <div className="relative overflow-hidden">
                  <img src={f.photo} alt={f.name} className="aspect-[4/4.4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" data-testid={`founder-photo-${f.id}`} />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/80 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-5">
                    <h3 className="font-display text-2xl font-semibold text-white">{f.id === "prashant" ? f.nameMr : L(f.name ? { en: f.name, mr: f.nameMr } : f.name)}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">{L(f.role)}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-sm leading-relaxed text-muted-foreground">{L(f.bio)}</p>
                  <ul className="mt-5 space-y-2.5">
                    {f.creds.map((c, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-navy/80">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {L(c)}
                      </li>
                    ))}
                  </ul>
                  <blockquote className="mt-6 border-l-2 border-gold pl-4 font-display text-sm italic leading-relaxed text-navy/80">
                    “{L(f.quote)}”
                  </blockquote>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t, L } = useLang();
  return (
    <section className="py-16 sm:py-24 lg:py-28" data-testid="testimonials-section">
      <div className="container-x">
        <SectionHead eyebrow="sections.testimonials.eyebrow" titleKey="sections.testimonials.title" subKey="sections.testimonials.sub" />
        {TESTIMONIALS.note && (
          <Reveal className="mt-8">
            <div className="flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-sm font-semibold text-navy" role="note" data-testid="testimonials-placeholder-note">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-dim" />
              {t("sections.testimonials.sampleNote")}
            </div>
          </Reveal>
        )}
        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {TESTIMONIALS.items.map((tm, i) => (
            <RevealItem key={i} className="relative rounded-2xl border border-border bg-white p-7">
              <span className="absolute right-6 top-6 rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-dim" data-testid={`testimonial-placeholder-tag-${i}`}>
                {t("sections.testimonials.sampleTag")}
              </span>
              <Quote className="h-8 w-8 text-gold/60" />
              <div className="mt-5 space-y-2.5" aria-hidden="true">
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-11/12 animate-pulse rounded bg-muted" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
              </div>
              <div className="mt-6">
                <p className="text-sm font-bold text-navy">{L(tm.name)}</p>
                <p className="text-xs text-muted-foreground">{L(tm.role)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-10">
          <div className="grid items-center gap-6 overflow-hidden rounded-3xl border border-border bg-navy p-6 sm:grid-cols-[0.9fr_1.1fr] sm:p-8">
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-white/15 bg-navy-2" data-testid="testimonial-video-placeholder">
              <div className="text-center">
                <PlayCircle className="mx-auto h-12 w-12 text-gold" />
                <p className="mt-3 px-6 text-xs font-semibold text-white/60">{t("sections.testimonials.videoNote")}</p>
              </div>
            </div>
            <div>
              <p className="eyebrow text-gold">{L(TESTIMONIALS.video.title)}</p>
              <p className="mt-4 max-w-md font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
                {t("sections.testimonials.title")}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">{t("sections.testimonials.sampleNote")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEO title="" description="AI Career Master — Marathi-first AI programs, placement sprints and career transformation for students, professionals, teachers, entrepreneurs and colleges." />
      <Hero />
      <Marquee />
      <Discovery />
      <Featured />
      <Framework />
      <Journey />
      <Differentiators />
      <Institutional />
      <Founders />
      <Testimonials />
      <CTABand />
    </>
  );
}
