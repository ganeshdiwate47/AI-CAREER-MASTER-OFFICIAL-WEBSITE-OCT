import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FALLBACK_PROGRAMS } from "@/data/programs";

const API = process.env.REACT_APP_BACKEND_URL;
const ProgramsCtx = createContext({ programs: FALLBACK_PROGRAMS, loading: true });

export function ProgramsProvider({ children }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`${API}/api/programs`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (alive && Array.isArray(d.programs) && d.programs.length) setPrograms(d.programs);
        else if (alive) setPrograms(FALLBACK_PROGRAMS);
      })
      .catch(() => alive && setPrograms(FALLBACK_PROGRAMS))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const value = useMemo(() => ({
    programs: programs.length ? programs : FALLBACK_PROGRAMS,
    loading,
    featured: (programs.length ? programs : FALLBACK_PROGRAMS).filter((p) => p.featured),
    bySlug: (slug) => (programs.length ? programs : FALLBACK_PROGRAMS).find((p) => p.slug === slug),
  }), [programs, loading]);

  return <ProgramsCtx.Provider value={value}>{children}</ProgramsCtx.Provider>;
}

export const usePrograms = () => useContext(ProgramsCtx);
