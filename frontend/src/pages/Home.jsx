import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Quote, BadgeCheck, Info } from "lucide-react";
import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SectionHead from "@/components/SectionHead";
import ProgramCard from "@/components/ProgramCard";
import CTABand from "@/components/CTABand";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { TrustBand, Methodology, Roadmap10, Modules12, HomeFaq } from "@/components/HomeSections";
import icons from "@/components/programIcons";
import { useLang } from "@/i18n/LanguageContext";
import { usePrograms } from "@/context/ProgramsContext";
import { AUDIENCES, programsForAudience } from "@/data/programs";
import { FOUNDERS, IMAGES, COLLEGE_MODELS } from "@/data/site";

function Discovery() {
  const { t } = useLang();
  const { programs } = usePrograms();
  const [active, setActive] = useState("students");
  const list = programsForAudience(programs, active);
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
  const { featured } = usePrograms();
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
          {featured.map((p) => (
            <RevealItem key={p.slug} className="h-full"><ProgramCard program={p} /></RevealItem>
          ))}
        </RevealGroup>
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
            {COLLEGE_MODELS.slice(0, 3).map((m) => {
              const Icon = icons[m.icon] || icons.Users;
              return (
                <RevealItem key={m.icon} className="rounded-2xl border border-border bg-white p-5">
                  <Icon className="h-6 w-6 text-orange" />
                  <p className="mt-3 text-sm font-bold text-navy">{L(m.title)}</p>
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
                    <h3 className="font-display text-2xl font-semibold text-white">{f.id === "prashant" ? f.nameMr : f.name}</h3>
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

export default function Home() {
  return (
    <>
      <SEO title="" description="AI Career Master — Marathi-first AI programs, 10-month career transformation, placement sprints and college partnerships across Maharashtra." />
      <Hero />
      <Marquee />
      <TrustBand />
      <Featured />
      <Discovery />
      <Methodology />
      <Roadmap10 />
      <Modules12 />
      <Institutional />
      <Founders />
      <HomeFaq />
      <CTABand />
    </>
  );
}
