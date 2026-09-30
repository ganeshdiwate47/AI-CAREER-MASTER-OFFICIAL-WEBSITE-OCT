import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "@/i18n/LanguageContext";

const LINKS = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/programs", key: "nav.programs" },
  { to: "/colleges", key: "nav.colleges" },
  { to: "/contact", key: "nav.contact" },
];

export function LangToggle({ dark = true }) {
  const { lang, setLang, t } = useLang();
  const base = `rounded-full px-3 py-1.5 text-xs font-bold transition-colors duration-200`;
  return (
    <div
      role="group"
      aria-label="Language switch"
      className={`inline-flex items-center rounded-full border p-1 ${dark ? "border-white/20 bg-white/5" : "border-navy/20 bg-white"}`}
    >
      {["en", "mr"].map((code) => (
        <button
          key={code}
          type="button"
          data-testid={`language-toggle-${code}`}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`${base} ${lang === code ? "bg-orange text-white" : dark ? "text-white/70 hover:text-white" : "text-navy/60 hover:text-navy"}`}
        >
          {code === "en" ? "EN" : "मराठी"}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "glass-dark shadow-lg shadow-navy/20" : "bg-transparent"}`}
      data-testid="site-navbar"
    >
      <div className="container-x flex h-[72px] items-center justify-between py-3">
        <Link to="/" aria-label="AI Career Master — Home" data-testid="nav-logo-link">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-link-${l.to === "/" ? "home" : l.to.slice(1)}`}
              className={({ isActive }) =>
                `relative text-sm font-semibold transition-colors duration-200 ${isActive ? "text-gold" : "text-white/80 hover:text-white"}`
              }
            >
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LangToggle />
          <Link
            to="/contact?form=strategy"
            data-testid="nav-cta"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-deep"
          >
            {t("nav.cta")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("nav.close") : t("nav.menu")}
          aria-expanded={open}
          data-testid="nav-mobile-toggle"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden overflow-hidden glass-dark border-t border-white/10"
            aria-label="Mobile"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  data-testid={`nav-mobile-link-${l.to === "/" ? "home" : l.to.slice(1)}`}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-semibold ${isActive ? "bg-white/10 text-gold" : "text-white/85"}`
                  }
                >
                  {t(l.key)}
                </NavLink>
              ))}
              <div className="mt-3 flex items-center justify-between gap-3 px-2">
                <LangToggle />
                <Link
                  to="/contact?form=strategy"
                  data-testid="nav-mobile-cta"
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white"
                >
                  {t("nav.cta")}
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
