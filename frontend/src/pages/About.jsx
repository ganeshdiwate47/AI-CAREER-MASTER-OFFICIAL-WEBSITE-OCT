import { Link } from "react-router-dom";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";
import SectionHead from "@/components/SectionHead";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";
import { FOUNDERS, IMAGES, STATS, BADGES } from "@/data/site";

export default function About() {
  const { t, L } = useLang();
  return (
    <>
      <SEO title={t("pages.about.title")} description="AI Career Master — mission, vision, values and the leadership building Maharashtra's AI-powered career acceleration platform." />
      <section className="grain relative overflow-hidden bg-navy pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-royal/25 blur-3xl" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHead dark eyebrow="pages.about.eyebrow" titleKey="pages.about.title" subKey="pages.about.sub" />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="pages.about.storyTitle" titleKey="pages.about.storyTitle" />
            <Reveal className="mt-6 space-y-5">
              {t("pages.about.story").map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.15} className="mt-8 grid grid-cols-2 gap-6">
              {STATS.slice(0, 4).map((s) => (
                <div key={s.id}>
                  <p className="font-display text-3xl font-semibold text-royal">{s.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(`stats.${s.id}`)}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative">
            <div className="absolute -inset-3 rounded-[28px] border border-gold/50" aria-hidden="true" />
            <img src={IMAGES.graduates} alt="Graduates celebrating success" className="aspect-[4/3.4] w-full rounded-3xl object-cover" data-testid="about-story-image" />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24" data-testid="about-vision-mission">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {[
            { icon: Eye, title: t("pages.about.visionTitle"), body: t("pages.about.vision"), tid: "about-vision" },
            { icon: Target, title: t("pages.about.missionTitle"), body: t("pages.about.mission"), tid: "about-mission" },
          ].map((c) => (
            <Reveal key={c.tid}>
              <div className="h-full rounded-3xl border border-border bg-cream p-8 sm:p-10" data-testid={c.tid}>
                <c.icon className="h-8 w-8 text-orange" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-navy">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24" data-testid="about-values">
        <div className="container-x">
          <SectionHead align="center" eyebrow="pages.about.valuesTitle" titleKey="pages.about.valuesTitle" />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
            {t("pages.about.values").map((v, i) => (
              <RevealItem key={i} className="rounded-2xl border border-border bg-white p-6 text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-display text-sm font-bold text-gold-dim">{i + 1}</span>
                <h3 className="mt-4 text-base font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-12 mx-auto max-w-3xl text-center">
            <p className="font-display text-xl italic leading-relaxed text-navy sm:text-2xl">“{t("pages.about.why")}”</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {BADGES.map((b) => (
                <span key={b} className="rounded-full border border-gold/40 px-3.5 py-1.5 text-xs font-semibold text-gold-dim">{b}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24" data-testid="about-founders">
        <div className="container-x">
          <SectionHead eyebrow="sections.founders.eyebrow" titleKey="sections.founders.title" subKey="sections.founders.sub" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.1}>
                <div className="flex h-full gap-6 rounded-3xl border border-border bg-cream p-7">
                  <img src={f.photo} alt={f.name} className="h-28 w-28 shrink-0 rounded-2xl object-cover object-top sm:h-36 sm:w-36" data-testid={`about-founder-photo-${f.id}`} />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy">{L({ en: f.name, mr: f.nameMr })}</h3>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-royal">{L(f.role)}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{L(f.bio)}</p>
                    <ul className="mt-4 space-y-2">
                      {f.creds.slice(0, 3).map((c, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-navy/75">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /> {L(c)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-12 text-center">
            <Link to="/programs" className="btn-primary" data-testid="about-cta">{t("pages.about.cta")}</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
