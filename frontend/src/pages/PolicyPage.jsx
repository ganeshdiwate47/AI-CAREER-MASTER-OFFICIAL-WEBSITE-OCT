import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import SEO from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";
import { POLICIES, CONTACT_BLOCK } from "@/data/policies";

export default function PolicyPage({ policyKey }) {
  const { t } = useLang();
  const policy = POLICIES[policyKey];
  return (
    <>
      <SEO title={policy.title} description={policy.meta} path={`/${policyKey === "privacy" ? "privacy-policy" : policyKey === "refund" ? "refund-policy" : "terms-and-conditions"}`} />
      <section className="grain relative overflow-hidden bg-navy pb-14 pt-36 sm:pt-44">
        <div className="container-x relative">
          <p className="eyebrow text-orange-soft">AI Career Master</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl" data-testid={`policy-title-${policyKey}`}>
            {policy.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">{policy.subtitle}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-xs font-semibold text-gold" data-testid={`policy-updated-${policyKey}`}>
            <ShieldCheck className="h-3.5 w-3.5" /> {policy.updated}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-royal hover:text-navy" data-testid={`policy-back-${policyKey}`}>
            <ArrowLeft className="h-4 w-4" /> {t("misc.backHome")}
          </Link>

          <div className="mt-8 space-y-5">
            {policy.intro.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">{typeof p === "string" ? p : p.note && (
                <span className="mt-2 block rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm font-semibold text-navy">{p.note}</span>
              )}</p>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            {policy.sections.map((s, i) => (
              <Reveal key={i} y={18}>
                <div data-testid={`policy-section-${policyKey}-${i}`}>
                  <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">{s.h}</h2>
                  <div className="mt-3 space-y-3">
                    {s.blocks.map((b, j) => {
                      if (b.t === "ul") {
                        return (
                          <ul key={j} className="space-y-2 pl-1">
                            {b.v.map((item, k) => (
                              <li key={k} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" /> {item}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (b.t === "contact") {
                        return (
                          <div key={j} className="rounded-2xl border border-border bg-white p-6 text-sm leading-relaxed" data-testid={`policy-contact-${policyKey}`}>
                            <p className="font-display text-lg font-semibold text-navy">{CONTACT_BLOCK.org}</p>
                            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-royal">{CONTACT_BLOCK.brand}</p>
                            <ul className="mt-4 space-y-2.5 text-navy/80">
                              <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-gold" /><a href={CONTACT_BLOCK.phoneHref} className="hover:text-royal">{CONTACT_BLOCK.phone}</a></li>
                              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-gold" /><a href={CONTACT_BLOCK.emailHref} className="break-all hover:text-royal">{CONTACT_BLOCK.email}</a></li>
                              <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{CONTACT_BLOCK.address}</li>
                            </ul>
                          </div>
                        );
                      }
                      return <p key={j} className="text-sm leading-relaxed text-muted-foreground sm:text-base">{b.v}</p>;
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-border bg-white p-6 text-sm">
            <p className="font-semibold text-navy">AI Career Master — A brand by SHRIVAI Technologies</p>
            <p className="mt-1 text-muted-foreground">AI-powered career, education, business and technology solutions.</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold">
              <Link to="/" className="text-royal hover:underline">Home</Link>
              <Link to="/privacy-policy" className="text-royal hover:underline">Privacy Policy</Link>
              <Link to="/refund-policy" className="text-royal hover:underline">Refund & Cancellation Policy</Link>
              <Link to="/terms-and-conditions" className="text-royal hover:underline">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
