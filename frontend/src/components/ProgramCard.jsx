import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Signal } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import icons from "./programIcons";

const ACCENT = {
  royal: { chip: "bg-royal/10 text-royal", hover: "hover:border-royal/60", bar: "bg-royal" },
  orange: { chip: "bg-orange/10 text-orange", hover: "hover:border-orange/60", bar: "bg-orange" },
  gold: { chip: "bg-gold/15 text-gold-dim", hover: "hover:border-gold/70", bar: "bg-gold" },
};

export default function ProgramCard({ program }) {
  const { t, L } = useLang();
  const a = ACCENT[program.accent] || ACCENT.royal;
  const Icon = icons[program.icon] || icons.Sparkles;
  return (
    <Link
      to={`/programs/${program.slug}`}
      data-testid={`program-card-${program.slug}`}
      className={`card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 sm:p-8 ${a.hover}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${a.bar} opacity-80`} />
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${a.chip}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold leading-snug text-navy">
        {L(program.name)}
      </h3>
      <p className="mt-1 text-sm font-semibold text-royal">{L(program.tag)}</p>
      <p className="mt-4 flex-1 text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-3">
        {L(program.summary)}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-navy/70">
        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{L(program.duration)}</span>
        <span className="inline-flex items-center gap-1.5"><Signal className="h-3.5 w-3.5" />{L(program.level)}</span>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy">
        {t("misc.viewProgram")}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
