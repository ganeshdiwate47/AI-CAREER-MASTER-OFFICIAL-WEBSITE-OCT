import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "./Reveal";

export default function SectionHead({ eyebrow, titleKey, subKey, dark = false, align = "left" }) {
  const { t } = useLang();
  const title = t(titleKey);
  const sub = subKey ? t(subKey) : null;
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow text-orange ${dark ? "text-orange-soft" : ""}`}>{t(eyebrow)}</p>
      <h2 className={`mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight ${dark ? "text-white" : "text-navy"}`} data-testid={`heading-${titleKey.replace(/\./g, "-")}`}>
        {title}
      </h2>
      <div className={`mt-5 h-px w-24 ${dark ? "hairline-gold" : "bg-gold/70"}`} />
      {sub && <p className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>{sub}</p>}
    </Reveal>
  );
}
