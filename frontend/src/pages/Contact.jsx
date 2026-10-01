import { useSearchParams } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Clock, Building2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import SectionHead from "@/components/SectionHead";
import LeadForm from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT } from "@/data/site";

const TABS = ["student", "strategy", "college"];

export default function Contact() {
  const { t, L } = useLang();
  const [params, setParams] = useSearchParams();
  const formParam = params.get("form");
  const tab = TABS.includes(formParam) ? formParam : "student";

  const setTab = (v) => {
    const next = new URLSearchParams(params);
    next.set("form", v);
    setParams(next, { replace: true });
  };

  const info = [
    { icon: Phone, title: t("pages.contact.callTitle"), body: CONTACT.phone, href: CONTACT.phoneHref, tid: "contact-phone" },
    { icon: Mail, title: t("pages.contact.emailTitle"), body: CONTACT.email, href: CONTACT.emailHref, tid: "contact-email" },
    { icon: MessageCircle, title: t("pages.contact.whatsappCta"), body: CONTACT.whatsapp.replace("https://", ""), href: CONTACT.whatsapp, tid: "contact-whatsapp" },
    { icon: MapPin, title: t("pages.contact.locationTitle"), body: L(CONTACT.location), href: null, tid: "contact-location" },
  ];

  return (
    <>
      <SEO title={t("pages.contact.title")} description="Contact AI Career Master — call, WhatsApp or send an enquiry for programs, college partnerships and free AI career strategy calls." />
      <section className="grain relative overflow-hidden bg-navy pb-16 pt-36 sm:pt-44">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-royal/25 blur-3xl" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHead dark eyebrow="pages.contact.eyebrow" titleKey="pages.contact.title" subKey="pages.contact.sub" />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            {info.map((c) => {
              const Inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal/10 text-royal"><c.icon className="h-5 w-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{c.title}</span>
                    <span className="mt-0.5 block text-sm font-bold text-navy [overflow-wrap:anywhere]">{c.body}</span>
                  </span>
                </>
              );
              return (
                <Reveal key={c.tid} y={16}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all duration-200 hover:border-royal/50" data-testid={c.tid}>{Inner}</a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5" data-testid={c.tid}>{Inner}</div>
                  )}
                </Reveal>
              );
            })}
            <Reveal y={16}>
              <div className="rounded-2xl border border-gold/40 bg-gold/10 p-5" data-testid="contact-centre">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-dim"><Building2 className="h-4 w-4" /> {t("pages.contact.centreTitle")}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy/80">{t("pages.contact.centreBody")}</p>
              </div>
            </Reveal>
            <Reveal y={16}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5" data-testid="contact-hours">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal/10 text-royal"><Clock className="h-5 w-5" /></span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("pages.contact.hoursTitle")}</span>
                  <span className="mt-0.5 block text-sm font-bold text-navy">{t("pages.contact.hoursBody")}</span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-navy/5 sm:p-8" data-testid="contact-form-card">
            <h2 className="font-display text-2xl font-semibold text-navy">{t("pages.contact.tabsTitle")}</h2>
            <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Enquiry type">
              {TABS.map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={tab === v}
                  data-testid={`contact-tab-${v}`}
                  onClick={() => setTab(v)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition-all duration-200 ${tab === v ? "border-navy bg-navy text-white" : "border-border bg-white text-navy/60 hover:border-navy/40"}`}
                >
                  {t(`forms.${v}.title`)}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{t(`forms.${tab}.sub`)}</p>
            <div className="mt-6" key={tab}>
              <LeadForm variant={tab} testId={`contact-lead-form-${tab}`} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20" data-testid="faq-section">
        <div className="container-x max-w-4xl">
          <SectionHead align="center" eyebrow="FAQ" titleKey="pages.contact.faqTitle" />
          <Reveal className="mt-10">
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {t("faq").map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} data-testid={`faq-item-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-bold text-navy sm:text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
