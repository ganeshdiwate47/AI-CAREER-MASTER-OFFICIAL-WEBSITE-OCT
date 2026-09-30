import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import SectionHead from "@/components/SectionHead";
import LeadForm from "@/components/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import icons from "@/components/programIcons";
import { useLang } from "@/i18n/LanguageContext";
import { COLLEGE_MODELS, COLLEGE_PROCESS, COLLEGE_BENEFITS, IMAGES } from "@/data/site";

export default function ForColleges() {
  const { t, L } = useLang();
  return (
    <>
      <SEO title={t("pages.colleges.title")} description="Partner with AI Career Master — campus placement drives, faculty development programs, AI workshops and innovation labs for colleges across Maharashtra." />
      <section className="relative overflow-hidden bg-navy pb-16 pt-36 sm:pt-44 grain" data-testid="colleges-hero">
        <img src={IMAGES.campus} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHead dark eyebrow="pages.colleges.eyebrow" titleKey="pages.colleges.title" subKey="pages.colleges.sub" />
        </div>
      </section>

      <section className="py-16 sm:py-24" data-testid="college-models">
        <div className="container-x">
          <SectionHead eyebrow="pages.colleges.modelsEyebrow" titleKey="pages.colleges.modelsTitle" />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {COLLEGE_MODELS.map((m) => {
              const Icon = icons[m.icon] || icons.Users;
              return (
                <RevealItem key={m.icon} className="card-lift rounded-2xl border border-border bg-white p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal/10 text-royal"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-5 text-base font-bold text-navy">{L(m.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{L(m.desc)}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-navy py-16 sm:py-24" data-testid="college-process">
        <div className="container-x relative">
          <SectionHead dark eyebrow="pages.colleges.processEyebrow" titleKey="pages.colleges.processTitle" />
          <RevealGroup className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
            {COLLEGE_PROCESS.map((s, i) => (
              <RevealItem key={i}>
                <p className="font-display text-5xl font-semibold text-gold-shimmer">{i + 1}</p>
                <h3 className="mt-4 text-base font-bold text-white">{L(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{L(s.desc)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24" data-testid="college-benefits">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="pages.colleges.benefitsEyebrow" titleKey="pages.colleges.benefitsTitle" />
            <Reveal className="mt-10 relative">
              <img src={IMAGES.presentation} alt="Guest lecture at a partner college" className="aspect-[16/10] w-full rounded-3xl object-cover" data-testid="colleges-image" />
            </Reveal>
          </div>
          <RevealGroup className="space-y-5 lg:pt-24" stagger={0.08}>
            {COLLEGE_BENEFITS.map((b, i) => (
              <RevealItem key={i} className="flex gap-5 rounded-2xl border border-border bg-cream p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-sm font-bold text-gold-dim">{i + 1}</span>
                <div>
                  <h3 className="text-base font-bold text-navy">{L(b.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{L(b.desc)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-16 sm:py-24" id="partnership-form" data-testid="college-form-section">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead eyebrow="pages.colleges.formTitle" titleKey="pages.colleges.formTitle" subKey="pages.colleges.formSub" />
          </div>
          <Reveal delay={0.1} className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-navy/5 sm:p-8">
            <LeadForm variant="college" testId="college-lead-form" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
