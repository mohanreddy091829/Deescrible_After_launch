"use client";

import React, { useEffect, useRef } from "react";

/**
 * Scroll transition between sections: as a section scrolls in from below it arrives like a card, slightly
 * tilted, scaled down and rounded, and settles flat and full-width. The content inside is untouched.
 * Once settled the transform is removed entirely, so fixed-position dialogs and sticky children inside the
 * section behave normally. Reduced-motion visitors get no transition.
 */
export function CardTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;

    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      // 0 while the card's top edge is at the bottom of the screen, 1 once it has risen 55% of the way
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.55)));
      if (p >= 1 || top > vh) {
        if (el.style.transform) {
          el.style.transform = "";
          el.style.borderRadius = "";
          el.style.boxShadow = "";
          el.style.willChange = "";
        }
        return;
      }
      const e = 1 - Math.pow(1 - p, 3); // ease out
      const k = 1 - e;
      const wide = window.innerWidth >= 900;
      el.style.willChange = "transform";
      el.style.transformOrigin = "50% 0%";
      el.style.transform = `translate3d(0, ${(k * 5).toFixed(2)}vh, 0) rotate(${(k * (wide ? -2.2 : -1.4)).toFixed(3)}deg) scale(${(1 - k * 0.06).toFixed(4)})`;
      el.style.borderRadius = `${(k * 36).toFixed(1)}px ${(k * 36).toFixed(1)}px 0 0`;
      el.style.boxShadow = `0 -${(k * 34).toFixed(1)}px ${(k * 70).toFixed(1)}px -${(k * 20).toFixed(1)}px rgba(20, 3, 6, ${(k * 0.45).toFixed(2)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="ct">
      {children}
    </div>
  );
}
