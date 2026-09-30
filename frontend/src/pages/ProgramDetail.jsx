import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronRight, Clock, Signal, Users } from "lucide-react";
import SEO from "@/components/SEO";
import LeadForm from "@/components/LeadForm";
import ProgramCard from "@/components/ProgramCard";
import { Reveal } from "@/components/Reveal";
import icons from "@/components/programIcons";
import { useLang } from "@/i18n/LanguageContext";
import { PROGRAMS, getProgram } from "@/data/programs";

export default function ProgramDetail() {
  const { slug } = useParams();
  const { t, L } = useLang();
  const p = getProgram(slug);

  if (!p) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-cream px-6 pt-24 text-center">
        <p className="font-display text-3xl font-semibold text-navy">{t("pages.program.notFound")}</p>
        <Link to="/programs" className="btn-primary" data-testid="program-back-after-notfound">{t("pages.program.backCta")}</Link>
      </div>
    );
  }

  const Icon = icons[p.icon] || icons.Sparkles;
  const related = PROGRAMS.filter((r) => r.slug !== p.slug && r.audience.some((a) => p.audience.includes(a))).slice(0, 3);

  return (
    <>
      <SEO title={`${L(p.name)} — ${L(p.tag)}`} description={L(p.summary).slice(0, 155)} />
      <section className="grain relative overflow-hidden bg-navy pb-16 pt-32 sm:pt-40">
        <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-royal/25 blur-3xl" aria-hidden="true" />
        <div className="container-x relative">
          <Link to="/programs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-gold" data-testid="program-detail-back">
            <ArrowLeft className="h-4 w-4" /> {t("pages.program.all")}
          </Link>
          <div className="mt-8 flex flex-wrap items-start gap-6">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-gold"><Icon className="h-8 w-8" /></span>
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl" data-testid="program-detail-title">{L(p.name)}</h1>
              <p className="mt-2 font-display text-lg italic text-gold sm:text-xl" data-testid="program-detail-tag">{L(p.tag)}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3" data-testid="program-detail-meta">
            {[["pages.program.duration", p.duration, Clock], ["pages.program.format", p.format, ChevronRight], ["pages.program.level", p.level, Signal]].map(([key, val, I], i) => {
              const Ic = i === 0 ? Clock : i === 1 ? Users : Signal;
              return (
                <span key={key} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white/85">
                  <Ic className="h-3.5 w-3.5 text-gold" /> {t(key)}: {L(val)}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-12">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-navy">{t("pages.program.overview")}</h2>
              <div className="mt-3 h-px w-20 bg-gold/70" />
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{L(p.summary)}</p>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-navy">{t("pages.program.highlights")}</h2>
              <div className="mt-3 h-px w-20 bg-gold/70" />
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {p.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-xl border border-border bg-white p-4 text-sm font-semibold text-navy/85" data-testid={`program-highlight-${i}`}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {L(h)}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-navy">{t("pages.program.curriculum")}</h2>
              <div className="mt-3 h-px w-20 bg-gold/70" />
              <ol className="mt-5 space-y-px overflow-hidden rounded-2xl border border-border">
                {p.modules.map((m, i) => (
                  <li key={i} className="flex items-baseline gap-5 bg-white p-5 transition-colors duration-200 hover:bg-cream" data-testid={`program-module-${i}`}>
                    <span className="font-display text-lg font-semibold text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-semibold text-navy">{L(m)}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-navy">{t("pages.program.outcomes")}</h2>
              <div className="mt-3 h-px w-20 bg-gold/70" />
              <ul className="mt-5 space-y-3">
                {p.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-navy/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-royal" /> {L(o)}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-navy">{t("pages.program.careers")}</h2>
              <div className="mt-3 h-px w-20 bg-gold/70" />
              <div className="mt-5 flex flex-wrap gap-2.5">
                {p.careers.map((c, i) => (
                  <span key={i} className="rounded-full border border-royal/30 bg-royal/5 px-4 py-2 text-xs font-bold text-royal" data-testid={`program-career-${i}`}>{L(c)}</span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-28">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-navy/5 sm:p-8" data-testid="program-enquiry-card">
                <h3 className="font-display text-xl font-semibold text-navy">{t("pages.program.enroll")}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{L(p.name)}</p>
                <div className="mt-6">
                  <LeadForm variant="student" defaultProgram={p.slug} testId="program-detail-lead-form" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-14 sm:py-20" data-testid="related-programs">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{t("pages.program.related")}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ProgramCard key={r.slug} program={r} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
