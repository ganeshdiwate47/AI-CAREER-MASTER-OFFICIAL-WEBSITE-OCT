import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { LangToggle } from "./Navbar";
import { CONTACT } from "@/data/site";
import { featuredPrograms } from "@/data/programs";
import { useLang } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t, L } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-navy text-white" data-testid="site-footer">
      <div className="hairline-gold" />
      <div className="container-x grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{t("footer.about")}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["MKCL Approved", "Mindler Certified", "UT Austin Certified"].map((b) => (
              <span key={b} className="rounded-full border border-gold/30 px-3 py-1 text-[11px] font-semibold text-gold/90">
                {b}
              </span>
            ))}
          </div>
        </div>

        <nav aria-label={t("footer.quick")}>
          <h3 className="eyebrow text-gold">{t("footer.quick")}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[["/", "nav.home"], ["/about", "nav.about"], ["/programs", "nav.programs"], ["/colleges", "nav.colleges"], ["/contact", "nav.contact"]].map(([to, key]) => (
              <li key={to}>
                <Link to={to} className="text-white/75 transition-colors hover:text-gold" data-testid={`footer-link-${to === "/" ? "home" : to.slice(1)}`}>
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footer.programsTitle")}>
          <h3 className="eyebrow text-gold">{t("footer.programsTitle")}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {featuredPrograms.map((p) => (
              <li key={p.slug}>
                <Link to={`/programs/${p.slug}`} className="text-white/75 transition-colors hover:text-gold" data-testid={`footer-program-${p.slug}`}>
                  {L(p.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow text-gold">{t("footer.reach")}</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li><a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 hover:text-gold" data-testid="footer-phone"><Phone className="h-4 w-4 text-gold" />{CONTACT.phone}</a></li>
            <li><a href={CONTACT.emailHref} className="inline-flex items-center gap-2 hover:text-gold" data-testid="footer-email"><Mail className="h-4 w-4 text-gold" />{CONTACT.email}</a></li>
            <li><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold" data-testid="footer-whatsapp"><MessageCircle className="h-4 w-4 text-gold" />{t("sections.cta.whatsapp")}</a></li>
            <li className="inline-flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" />{L(CONTACT.location)}</li>
          </ul>
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">{t("footer.langLabel")}</p>
            <LangToggle />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} {t("footer.rights")}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gold" data-testid="footer-privacy">{t("pages.privacy.title")}</Link>
            <Link to="/terms" className="hover:text-gold" data-testid="footer-terms">{t("pages.terms.title")}</Link>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-gold/90 hover:text-gold" data-testid="footer-join-cta">
              {t("nav.cta")} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
