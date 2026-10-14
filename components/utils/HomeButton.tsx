"use client";

import { useEffect, useState } from "react";
import { House } from "lucide-react";

/**
 * Round "home" button, fixed top-left. Hidden while the hero is on screen; once the hero has scrolled out of
 * view it fades in and returns the visitor to the top of the page in one tap.
 */
export function HomeButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    // "hero is out of view" = less than 8% of it still visible; avoids flicker at the exact edge
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting || e.intersectionRatio < 0.08), { threshold: [0, 0.08, 0.2] });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const goHome = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <button type="button" className="home-btn" data-show={show} onClick={goHome} aria-label="Back to the top of the page" tabIndex={show ? 0 : -1} aria-hidden={!show}>
      <House size={20} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
