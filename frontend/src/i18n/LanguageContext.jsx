import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./en";
import mr from "./mr";

const dicts = { en, mr };
const LANG_KEY = "acm-lang";

const LangCtx = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(LANG_KEY) === "mr" ? "mr" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {}
    document.documentElement.lang = lang === "mr" ? "mr" : "en";
  }, [lang]);

  const value = useMemo(() => {
    const t = (key, fallback) =>
      key
        .split(".")
        .reduce((o, part) => (o == null ? undefined : o[part]), dicts[lang]) ??
      fallback ??
      key;
    // L({en:"...", mr:"..."}) -> localized string; plain strings pass through
    const L = (obj) =>
      obj && typeof obj === "object" && !Array.isArray(obj) && lang in obj
        ? obj[lang]
        : obj;
    return { lang, setLang, t, L };
  }, [lang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
