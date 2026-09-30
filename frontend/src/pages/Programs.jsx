import { useState } from "react";
import SEO from "@/components/SEO";
import SectionHead from "@/components/SectionHead";
import ProgramCard from "@/components/ProgramCard";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";
import { usePrograms } from "@/context/ProgramsContext";
import { AUDIENCES, programsForAudience } from "@/data/programs";

export default function Programs() {
  const { t } = useLang();
  const { programs } = usePrograms();
  const [active, setActive] = useState("all");
  const list = programsForAudience(programs, active);
  return (
    <>
      <SEO title={t("pages.programs.title")} description="Explore all AI Career Master programs — 10-month career transformation, placement sprint, AI for All, AI for Vyapari, Teachers FDP, Students, Working Professionals and AI Software Generation." />
      <section className="grain relative overflow-hidden bg-navy pb-14 pt-36 sm:pb-20 sm:pt-44">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-orange/15 blur-3xl" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHead dark eyebrow="pages.programs.eyebrow" titleKey="pages.programs.title" subKey="pages.programs.sub" />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <Reveal y={16} className="flex flex-wrap gap-2.5" data-testid="programs-filter">
            {["all", ...AUDIENCES].map((key) => (
              <button
                key={key}
                type="button"
                data-testid={`programs-filter-${key}`}
                onClick={() => setActive(key)}
                aria-pressed={active === key}
                className="rounded-full border px-4 py-2 text-xs font-bold transition-all duration-200"
                style={active === key ? { borderColor: "#0B132B", background: "#0B132B", color: "#fff" } : { borderColor: "#E2E8F0", background: "#fff", color: "rgba(11,19,43,0.7)" }}
              >
                {key === "all" ? t("pages.programs.filterAll") : t(`audiences.${key}.label`)}
              </button>
            ))}
          </Reveal>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-testid="programs-count">
            {list.length} {t("pages.programs.count")}
          </p>
          {list.length === 0 ? (
            <p className="mt-10 rounded-2xl border border-border bg-white p-8 text-center text-sm text-muted-foreground">{t("pages.programs.empty")}</p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="programs-grid">
              {list.map((p) => <ProgramCard key={p.slug} program={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
