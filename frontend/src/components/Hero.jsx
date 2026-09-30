import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, Compass, BadgeCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { IMAGES, BADGES } from "@/data/site";

const line = {
  hidden: { y: "115%" },
  show: (i) => ({ y: "0%", transition: { delay: 0.25 + i * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={sectionRef} onMouseMove={onMove} className="grain relative flex min-h-screen items-center overflow-hidden bg-navy pt-28 pb-16" data-testid="hero-section">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-royal/30 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-orange/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold" data-testid="hero-badge">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
            </span>
            {t("hero.badge")}
          </motion.p>

          <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="hero-headline">
            {[t("hero.titleA"), t("hero.titleB"), t("hero.titleC")].map((l, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span custom={i} variants={line} initial="hidden" animate="show" className={`block ${i === 2 ? "italic text-gold-shimmer" : ""}`}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg" data-testid="hero-sub">
            {t("hero.sub")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.7 }} className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/programs" className="btn-primary" data-testid="hero-explore-cta">{t("hero.explore")}</Link>
            <Link to="/contact?form=strategy" className="btn-ghost-gold" data-testid="hero-partner-cta">{t("hero.partner")}</Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: 0.8 }} className="mt-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">{t("hero.badgesLabel")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/80">
                  <BadgeCheck className="h-3.5 w-3.5 text-gold" /> {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div style={{ y: yImg }} className="relative mx-auto w-full max-w-md lg:max-w-none" data-testid="hero-visual">
          <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} className="relative">
            <div className="absolute -inset-3 rounded-[28px] border border-gold/40" aria-hidden="true" />
            <div className="overflow-hidden rounded-[24px] shadow-2xl shadow-black/50">
              <img src={IMAGES.hero} alt="AI Career Master learners" className="aspect-[4/4.6] w-full object-cover" data-testid="hero-image" />
            </div>

            <motion.div className="absolute -left-6 top-8 sm:-left-10 animate-float">
              <div className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3.5 shadow-xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold"><Compass className="h-5 w-5" /></span>
                <span>
                  <span className="block text-sm font-bold text-white">{t("hero.cardA.title")}</span>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/55">{t("hero.cardA.sub")}</span>
                </span>
              </div>
            </motion.div>

            <motion.div className="absolute -bottom-6 right-2 sm:-right-8 animate-float">
              <div className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3.5 shadow-xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange/25 text-orange-soft"><BadgeCheck className="h-5 w-5" /></span>
                <span>
                  <span className="block text-sm font-bold text-white">{t("hero.cardB.title")}</span>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/55">{t("hero.cardB.sub")}</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a href="#discovery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-gold md:inline-flex" data-testid="hero-scroll-cue">
        {t("hero.scroll")} <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
