import { MessageCircle } from "lucide-react";
import LeadForm from "./LeadForm";
import SectionHead from "./SectionHead";
import { Reveal } from "./Reveal";
import { CONTACT } from "@/data/site";
import { useLang } from "@/i18n/LanguageContext";

export default function CTABand() {
  const { t } = useLang();
  return (
    <section className="relative grain overflow-hidden bg-navy py-16 sm:py-24 lg:py-28" data-testid="lead-cta-band">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-royal/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange/20 blur-3xl" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHead dark eyebrow="sections.cta.eyebrow" titleKey="sections.cta.title" subKey="sections.cta.sub" />
          <Reveal delay={0.15}>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="cta-band-whatsapp"
              className="btn-ghost-gold mt-8"
            >
              <MessageCircle className="h-4 w-4" /> {t("sections.cta.whatsapp")}
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <LeadForm variant="strategy" dark testId="cta-band-lead-form" />
        </Reveal>
      </div>
    </section>
  );
}
