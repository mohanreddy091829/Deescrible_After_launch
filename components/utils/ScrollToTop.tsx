"use client";

import { useLayoutEffect } from "react";

/**
 * Opens the page on the hero. Browsers restore the previous scroll offset on reload / back navigation
 * (and pinned sections shift layout while loading), which could land visitors on the logo strip.
 * A deep link (#hash) is respected and left alone.
 */
export function ScrollToTop() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.location.hash) {
      const root = document.documentElement;
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      // layout settles after fonts / pinned spacers; re-assert once so nothing nudges the page down
      const t = window.setTimeout(() => {
        if (window.scrollY < 600 && window.scrollY !== 0) window.scrollTo(0, 0);
        root.style.scrollBehavior = prev;
      }, 400);
      return () => window.clearTimeout(t);
    }
  }, []);
  return null;
}
