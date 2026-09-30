import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, Signal, Users, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import LeadForm from "@/components/LeadForm";
import ProgramCard from "@/components/ProgramCard";
import { Reveal } from "@/components/Reveal";
import icons from "@/components/programIcons";
import { useLang } from "@/i18n/LanguageContext";
import { usePrograms } from "@/context/ProgramsContext";

function B({ label, children }) {
  return (
    <Reveal>
      <h2 className="font-display text-2xl font-semibold text-navy">{label}</h2>
      <div className="mt-3 h-px w-20 bg-gold/70" />
      {children}
    </Reveal>
  );
}

export default function ProgramDetail() {
  const { slug } = useParams();
  const { t, L } = useLang();
  const { bySlug, loading, programs } = usePrograms();
  const p = bySlug(slug);

  if (loading && !p) {
    return <div className="flex min-h-[70vh] items-center justify-center bg-cream pt-24"><Loader2 className="h-8 w-8 animate-spin text-royal" /></div>;
  }

  if (!p) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-cream px-6 pt-24 text-center">
        <p className="font-display text-3xl font-semibold text-navy">{t("pages.program.notFound")}</p>
        <Link to="/programs" className="btn-primary" data-testid="program-back-after-notfound">{t("pages.program.backCta")}</Link>
      </div>
    );
  }

  const Icon = icons[p.icon] || icons.Sparkles;
  const related = programs.filter((r) => r.slug !== p.slug && (r.audience || []).some((a) => (p.audience || []).includes(a))).slice(0, 3);
  const meta = [
    ["pages.program.duration", p.duration, Clock],
    ["pages.program.format", p.format, Users],
    ["pages.program.level", p.level, Signal],
  ].filter(([, v]) => v);

  return (
    <>
      <SEO title={`${L(p.name)} — ${L(p.tag)}`} description={(L(p.summary) || "").slice(0, 155)} />
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
            {meta.map(([key, val]) => (
              <span key={key} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white/85">
                {t(key)}: {L(val)}
              </span>
            ))}
            {p.eligibility && (
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold text-gold">
                {t("pages.program.whoFor")}: {L(p.eligibility)}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-12">
            <B label={t("pages.program.overview")}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{L(p.summary)}</p>
              {p.description && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{L(p.description)}</p>}
              {p.prerequisites && (
                <p className="mt-4 rounded-xl border border-border bg-white p-4 text-sm font-semibold text-navy/80" data-testid="program-prerequisites">
                  {t("pages.program.prerequisites")}: {L(p.prerequisites)}
                </p>
              )}
            </B>

            {p.highlights?.length > 0 && (
              <B label={t("pages.program.highlights")}>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {p.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 rounded-xl border border-border bg-white p-4 text-sm font-semibold text-navy/85" data-testid={`program-highlight-${i}`}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {L(h.desc ? h.desc : h)}
                    </li>
                  ))}
                </ul>
              </B>
            )}

            {p.roadmap?.length > 0 && (
              <B label={t("pages.program.roadmap")}>
                <ol className="mt-5 space-y-px overflow-hidden rounded-2xl border border-border" data-testid="program-roadmap">
                  {p.roadmap.map((r) => (
                    <li key={r.month} className="bg-white p-5 transition-colors duration-200 hover:bg-cream" data-testid={`roadmap-row-${r.month}`}>
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-lg font-bold text-gold-dim">M{r.month}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-navy">{L(r.theme)}</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{(L(r.focus) || []).join(" • ")}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {r.deliverable && <span className="rounded-full bg-royal/10 px-2.5 py-0.5 text-[10px] font-bold text-royal">{L(r.deliverable)}</span>}
                            {r.outcome && <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-bold text-gold-dim">{L(r.outcome)}</span>}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
                {p.methodology?.length > 0 && (
                  <div className="mt-5 rounded-2xl border border-border bg-white p-5" data-testid="program-methodology">
                    <p className="text-xs font-bold uppercase tracking-wider text-royal">{t("pages.program.methodology")}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.methodology.map((m, i) => (
                        <span key={i} className="rounded-full bg-cream border border-border px-3 py-1 text-[11px] font-semibold text-navy/80">{L(m.desc ? m.desc : m)}</span>
                      ))}
                    </div>
                  </div>
                )}
                {p.tracking?.length > 0 && (
                  <div className="mt-4 rounded-2xl border border-border bg-white p-5" data-testid="program-tracking">
                    <p className="text-xs font-bold uppercase tracking-wider text-royal">{t("pages.program.tracking")}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tracking.map((m, i) => (
                        <span key={i} className="rounded-full bg-cream border border-border px-3 py-1 text-[11px] font-semibold text-navy/80">{L(m.desc ? m.desc : m)}</span>
                      ))}
                    </div>
                  </div>
                )}
              </B>
            )}

            {p.modules?.length > 0 && (
              <B label={t("pages.program.curriculum")}>
                <ol className="mt-5 space-y-px overflow-hidden rounded-2xl border border-border">
                  {p.modules.map((m, i) => (
                    <li key={i} className="flex items-baseline gap-5 bg-white p-5 transition-colors duration-200 hover:bg-cream" data-testid={`program-module-${i}`}>
                      <span className="font-display text-lg font-semibold text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <span className="block text-sm font-semibold text-navy">{L(m.title ? m.title : m)}</span>
                        {m.desc && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{L(m.desc)}</span>}
                      </div>
                    </li>
                  ))}
                </ol>
              </B>
            )}

            <B label={t("pages.program.outcomes")}>
              <ul className="mt-5 space-y-3">
                {(p.outcomes || []).map((o, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-navy/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-royal" /> {L(o.desc ? o.desc : o)}
                  </li>
                ))}
              </ul>
            </B>

            {p.college_value?.length > 0 && (
              <B label={t("pages.program.collegeValue")}>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {p.college_value.map((o, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-navy/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {L(o.desc ? o.desc : o)}
                    </li>
                  ))}
                </ul>
              </B>
            )}

            {p.careers?.length > 0 && (
              <B label={t("pages.program.careers")}>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {p.careers.map((c, i) => (
                    <span key={i} className="rounded-full border border-royal/30 bg-royal/5 px-4 py-2 text-xs font-bold text-royal" data-testid={`program-career-${i}`}>{L(c.desc ? c.desc : c)}</span>
                  ))}
                </div>
              </B>
            )}

            {p.brochure_url && (
              <B label={t("pages.program.brochure")}>
                <a href={p.brochure_url} target="_blank" rel="noreferrer" data-testid="program-brochure">
                  <img src={p.brochure_url} alt={`${L(p.name)} brochure`} loading="lazy" className="mt-5 w-full max-w-md rounded-2xl border border-border shadow-lg" />
                </a>
              </B>
            )}
          </div>

          <div className="lg:sticky lg:top-28">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-navy/5 sm:p-8" data-testid="program-enquiry-card">
                <h3 className="font-display text-xl font-semibold text-navy">{L(p.cta_label) || t("pages.program.enroll")}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{L(p.name)}</p>
                {(p.price != null || p.offer_price != null) && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-cream p-4" data-testid="program-price">
                    {p.offer_price != null && <span className="font-display text-2xl font-bold text-orange">₹{p.offer_price}</span>}
                    {p.price != null && <span className={`text-sm ${p.offer_price != null ? "line-through text-muted-foreground" : "font-display text-2xl font-bold text-orange"}`}>₹{p.price}</span>}
                  </div>
                )}
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
