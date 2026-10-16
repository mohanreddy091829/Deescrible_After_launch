"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { BRANDS, BRAND_STRIP } from "@/data/brands";

/** Large positive offset so the infinite animation can be scrubbed backwards without hitting 0. */
const HEADROOM = 1000;

/** One copy of the list per half of the loop. The viewport is capped (see CSS) so the same logo is never on screen twice. */
const SET = BRANDS;

export function BrandMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const holdRef = useRef({ hover: false, focus: false, touch: false });
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const nudging = useRef(false);
  const drag = useRef<{ x: number; base: number } | null>(null);

  const sync = useCallback(() => {
    const a = animRef.current;
    if (!a || nudging.current) return;
    const { hover, focus, touch } = holdRef.current;
    if (hover || focus || touch) a.pause();
    else a.play();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const set = track.firstElementChild as HTMLElement;
    const build = () => {
      const old = animRef.current;
      const oldDur = Number(old?.effect?.getComputedTiming().duration ?? 0);
      const progress = old && oldDur ? (Number(old.currentTime) % oldDur) / oldDur : 0;
      old?.cancel();
      const dist = set.offsetWidth; // one set incl. trailing gap = exact loop distance
      const duration = (dist / BRAND_STRIP.speed) * 1000;
      const ltr = BRAND_STRIP.direction === "ltr";
      const a = track.animate(
        [
          { transform: ltr ? `translateX(-${dist}px)` : "translateX(0)" },
          { transform: ltr ? "translateX(0)" : `translateX(-${dist}px)` },
        ],
        { duration, iterations: Infinity, easing: "linear" },
      );
      a.currentTime = duration * HEADROOM + progress * duration; // keeps position across rebuilds
      animRef.current = a;
      sync();
    };
    build();

    let lastW = set.offsetWidth;
    const ro = new ResizeObserver(() => {
      if (set.offsetWidth !== lastW) {
        lastW = set.offsetWidth;
        build();
      }
    });
    ro.observe(set);
    return () => {
      ro.disconnect();
      animRef.current?.cancel();
      clearTimeout(resumeTimer.current);
    };
  }, [sync]);

  const nudge = (dir: "prev" | "next") => {
    const a = animRef.current;
    if (!a) return;
    const duration = Number(a.effect?.getComputedTiming().duration ?? 0);
    const ms = (BRAND_STRIP.step / BRAND_STRIP.speed) * 1000;
    // Time moving forward pushes a left→right strip rightwards, revealing earlier logos.
    const forward = (BRAND_STRIP.direction === "ltr") === (dir === "prev");
    const base = Number(a.currentTime);
    const proxy = { t: 0 };
    nudging.current = true;
    a.pause();
    gsap.to(proxy, {
      t: forward ? ms : -ms,
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
      onUpdate: () => {
        a.currentTime = Math.max(duration, base + proxy.t);
      },
      onComplete: () => {
        nudging.current = false;
        sync();
      },
    });
  };

  const hold = (key: "hover" | "focus" | "touch", v: boolean) => {
    holdRef.current[key] = v;
    sync();
  };

  const renderSet = (clone: boolean) => (
    <div className="brand-strip__set" data-clone={clone ? "" : undefined} aria-hidden={clone || undefined}>
      {SET.map((brand, i) => {
        const primary = !clone; // one focusable copy of each logo
        return (
          <a
            key={`${brand.id}-${i}`}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={primary ? 0 : -1}
            className={`brand-logo${brand.fit === "cover" ? " brand-logo--cover" : ""}`}
            style={{ "--accent": brand.accent, "--bg": brand.background } as React.CSSProperties}
            title={`${brand.name} — ${brand.category}`}
            aria-label={`${brand.name} (opens official site in a new tab)`}
          >
            <Image src={brand.logo} alt="" width={160} height={160} unoptimized draggable={false} />
          </a>
        );
      })}
    </div>
  );

  return (
    <section id="brands" className="brand-strip" style={{ "--n": BRANDS.length } as React.CSSProperties} aria-label="Brands I've worked with">
      <div className="brand-strip__row">
        <button type="button" className="brand-nav" onClick={() => nudge("prev")} aria-label="Show previous brands">
          <ChevronLeft size={18} />
        </button>

        <div
          className="brand-strip__viewport"
          onPointerEnter={(e) => e.pointerType === "mouse" && hold("hover", true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && hold("hover", false)}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse") return;
            clearTimeout(resumeTimer.current);
            hold("touch", true);
            // swipe: finger drag scrubs the strip directly (page still scrolls vertically)
            if (animRef.current) drag.current = { x: e.clientX, base: Number(animRef.current.currentTime) };
          }}
          onPointerMove={(e) => {
            const a = animRef.current;
            if (!drag.current || !a) return;
            const duration = Number(a.effect?.getComputedTiming().duration ?? 0);
            const ms = ((e.clientX - drag.current.x) / BRAND_STRIP.speed) * 1000;
            const dir = BRAND_STRIP.direction === "ltr" ? 1 : -1;
            a.currentTime = Math.max(duration, drag.current.base + ms * dir);
          }}
          onPointerUp={(e) => {
            if (e.pointerType === "mouse") return;
            drag.current = null;
            resumeTimer.current = setTimeout(() => hold("touch", false), 1800);
          }}
          onPointerCancel={() => {
            drag.current = null;
            hold("touch", false);
          }}
          onFocus={() => hold("focus", true)}
          onBlur={() => hold("focus", false)}
        >
          <div ref={trackRef} className="brand-strip__track">
            {renderSet(false)}
            {renderSet(true)}
          </div>
        </div>

        <button type="button" className="brand-nav" onClick={() => nudge("next")} aria-label="Show next brands">
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="brand-strip__label">Brands I&apos;ve worked with</p>
      <p className="brand-strip__sub">Consumer, B2B and political work, through agencies and in-house.</p>
    </section>
  );
}
