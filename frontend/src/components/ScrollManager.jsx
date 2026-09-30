import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

// Lenis momentum scrolling + scroll reset on route change.
export default function ScrollManager() {
  const lenisRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
