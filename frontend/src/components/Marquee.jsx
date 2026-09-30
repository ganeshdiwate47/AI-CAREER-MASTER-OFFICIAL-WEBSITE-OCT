import { useLang } from "@/i18n/LanguageContext";
import { FALLBACK_PROGRAMS as PROGRAMS } from "@/data/programs";

// One slow, editorial marquee. Items render once per loop; the duplicate
// track is aria-hidden and only exists to make the loop seamless.
export default function Marquee() {
  const { L } = useLang();
  const items = PROGRAMS.map((p) => L(p.name).toUpperCase());
  const track = [...items, "8D FRAMEWORK™"];

  return (
    <section
      aria-label="Our programs marquee"
      data-testid="program-marquee"
      className="relative overflow-hidden border-y border-gold/20 bg-navy py-6 sm:py-8"
    >
      <div className="marquee-mask paused-none flex">
        <div className="marquee-track flex w-max shrink-0 items-center animate-marquee">
          {track.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl font-medium italic text-cream/90 px-6 sm:px-10 whitespace-nowrap">
                {item}
              </span>
              <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
            </span>
          ))}
        </div>
        <div className="marquee-track flex w-max shrink-0 items-center animate-marquee" aria-hidden="true">
          {track.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl font-medium italic text-cream/90 px-6 sm:px-10 whitespace-nowrap">
                {item}
              </span>
              <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
