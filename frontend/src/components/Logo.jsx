import { useState } from "react";
import { IMAGES } from "@/data/site";

// Provision: drop the approved final logo at /frontend/public/brand/logo.png
// (update the path in src/data/site.js if renamed) — until then the built-in mark shows.
export function LogoMark({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="AI Career Master">
      <rect width="64" height="64" rx="14" fill="#0B132B" />
      <text x="13" y="43" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="30" fontWeight="800" fill="#FFFFFF">A</text>
      <text x="32" y="43" fontFamily="Plus Jakarta Sans, Arial, sans-serif" fontSize="30" fontWeight="400" fill="#FFFFFF">i</text>
      <circle cx="45" cy="17" r="5" fill="#FF5722" />
      <rect x="13" y="49" width="38" height="3.5" rx="1.75" fill="#D4AF37" />
    </svg>
  );
}

export default function Logo({ light = true, compact = false, className = "" }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} data-testid="brand-logo">
      {imgOk ? (
        <img
          src={IMAGES.logo}
          onError={() => setImgOk(false)}
          alt="AI Career Master"
          className="h-11 w-11 rounded-xl object-cover"
        />
      ) : (
        <LogoMark className="h-11 w-11" />
      )}
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-lg font-bold tracking-tight ${light ? "text-white" : "text-navy"}`}>
            AI Career Master
          </span>
          <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${light ? "text-gold/90" : "text-royal"}`}>
            AI Powered Career Acceleration
          </span>
        </span>
      )}
    </span>
  );
}
