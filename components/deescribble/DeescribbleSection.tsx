"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { REELS, DEESCRIBBLE_STATS, DEESCRIBBLE_URL } from "@/data/reels";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { ArrowRight, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const BAND_IMAGES = REELS.map((r) => ({ src: r.poster ?? "", alt: r.title }));

/**
 * Two layers share one stage:
 *  - idle: a curved band of 9:16 reels drifts right → left (CSS-only, paused when off-screen)
 *  - engaged: the moment someone hovers, touches, focuses or uses an arrow, the band stops and a flat,
 *    swipeable row of the same reels takes over so a reel can actually be watched (muted by default).
 */
export function DeescribbleSection() {
  const root = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLUListElement>(null);
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});
  const stageRef = useRef<HTMLDivElement>(null);
  const [engaged, setEngaged] = useState(false);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (!e.isIntersecting) setEngaged(false);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // which card is centred: nearest to the scroller's midpoint, measured on scroll
  useEffect(() => {
    const sc = scroller.current;
    if (!sc) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const mid = sc.scrollLeft + sc.clientWidth / 2;
      let best = 0, bestD = Infinity;
      sc.querySelectorAll<HTMLElement>("li[data-i]").forEach((li, k) => {
        const d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - mid);
        if (d < bestD) { bestD = d; best = k; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    sc.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => { sc.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // only the centred reel plays, only while engaged and on screen
  useEffect(() => {
    REELS.forEach((r, k) => {
      const v = videos.current[r.id];
      if (!v) return;
      v.muted = muted;
      if (engaged && inView && k === active) v.play().catch(() => undefined);
      else v.pause();
    });
  }, [active, engaged, inView, muted]);

  const engage = useCallback(() => setEngaged(true), []);

  // click / tap anywhere outside the stage (or Esc, or scrolling the section away) hands control back to the band
  useEffect(() => {
    if (!engaged) return;
    const stage = stageRef.current;
    const away = (e: PointerEvent) => {
      if (stage && e.target instanceof Node && !stage.contains(e.target)) setEngaged(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setEngaged(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [engaged]);

  const step = (dir: -1 | 1) => {
    const sc = scroller.current;
    if (!sc) return;
    engage();
    const card = sc.querySelector("li");
    const w = (card?.getBoundingClientRect().width ?? 220) + parseFloat(getComputedStyle(sc).columnGap || "16");
    sc.scrollBy({ left: dir * w, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const reel = REELS[active];

  return (
    <section id="deescribble" ref={root} className="relative overflow-hidden bg-[#F2EBDC] py-10 sm:py-14" aria-label="Deescribble community">
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply" style={{ backgroundImage: "var(--paper-grain)" }} aria-hidden="true" />

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-[auto_1fr]">
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#2E2926]">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4z" fill="#A51C27" /></svg>
              <span>04 / Deescribble</span>
            </div>
            <h2 className="font-serif text-[clamp(34px,4.2vw,60px)] font-normal leading-[1.02] tracking-[-0.03em] text-[#141211]">
              An idea that found
              <br />
              <span className="relative inline-block italic text-[#b5552f]">
                300K+ people.
                <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 9C50 3 80 12 130 7S220 3 297 8" fill="none" stroke="#A51C27" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <span className="font-script pointer-events-none absolute -right-2 -top-3 hidden rotate-[8deg] text-[22px] leading-none text-[#A51C27] sm:block" aria-hidden="true">
              no paid reach ✦
            </span>
          </div>

          <div className="lg:justify-self-end lg:max-w-[660px]">
            <p className="font-sans text-[15px] leading-relaxed text-[#2E2926]">
              What started as a creative outlet is now a <span className="font-semibold text-[#141211]">300K+ strong community</span> on Instagram — a space for stories, ideas, observations and real conversations.
            </p>
            <dl className="mt-5 grid grid-cols-4 gap-x-2">
              {DEESCRIBBLE_STATS.map((s, k) => (
                <div key={s.label} className={k ? "border-l border-dashed border-[#141211]/25 pl-3 sm:pl-5" : ""}>
                  <dd className="font-serif text-[clamp(22px,2.6vw,36px)] font-medium italic leading-none tracking-tight text-[#141211]">{s.value}</dd>
                  <dt className="mt-1.5 font-mono text-[9.5px] uppercase leading-tight tracking-[0.12em] text-[#6B645D] sm:text-[10.5px]">{s.label.replace("Total reach & views", "of views")}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* stage */}
        <div
          ref={stageRef}
          className={`reel-stage ${engaged ? "is-engaged" : ""} ${!inView || engaged ? "is-paused" : ""}`}
          onPointerDown={engage}
          onFocus={engage}
        >
          <TiltedGridHero
            images={BAND_IMAGES}
            aspectRatio={9 / 16}
            tileHeight={narrow ? 82 : 84}
            axis={50}
            gap={narrow ? 10 : 14}
            curve={narrow ? 38 : 66}
            fade={14}
            speed={3.6}
            className="reel-band absolute inset-0"
          />

          <ul
            ref={scroller}
            tabIndex={0}
            aria-label="Deescribble reels"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
            }}
            className="reel-row"
          >
            {REELS.map((r, k) => (
              <li key={r.id} data-i={k} className={`reel-card ${k === active ? "is-active" : ""}`} aria-label={r.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.poster} alt={`${r.title}: ${r.headline}`} draggable={false} loading={k < 3 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover" />
                {r.video && (
                  <video
                    ref={(el) => { videos.current[r.id] = el; }}
                    src={r.video}
                    poster={r.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                {k === active && (
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    aria-pressed={!muted}
                    aria-label={muted ? "Unmute reel" : "Mute reel"}
                    title={muted ? "Sound off — tap to unmute" : "Sound on — tap to mute"}
                    className="reel-mute"
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    <span className="sr-only">{muted ? "Sound off" : "Sound on"}</span>
                  </button>
                )}
                <a href={r.instagramUrl ?? DEESCRIBBLE_URL} target="_blank" rel="noopener noreferrer" className="reel-ig" aria-label={`Open ${r.title} on Instagram`}>
                  Instagram <ArrowRight className="h-3 w-3" strokeWidth={2.6} />
                </a>
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute -top-7 right-[9%] z-[5] hidden items-end gap-1 sm:flex" aria-hidden="true">
            <span className="font-script -rotate-3 text-[20px] leading-none text-[#A51C27]">tap a reel!</span>
            <svg width="38" height="30" viewBox="0 0 38 30" fill="none"><path d="M2 4C14 2 26 8 30 24" stroke="#A51C27" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 4" /><path d="M24 20l6 6 4-8" stroke="#A51C27" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>

          <button type="button" onClick={() => step(-1)} aria-label="Previous reel" className="reel-arrow reel-arrow--l">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next reel" className="reel-arrow reel-arrow--r">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-center font-sans text-[13px] text-[#5A524B] sm:text-left" aria-live="polite">
            {engaged ? (
              <>
                <span className="font-semibold text-[#141211]">{reel.title}</span> — {reel.tagline}
              </>
            ) : (
              "Tap a reel to take control · tap outside to let it drift again."
            )}
          </p>
          <a
            href={DEESCRIBBLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#141211]/35 bg-white/50 px-5 py-2.5 font-sans text-sm font-bold text-[#141211] transition hover:border-[#141211] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]"
          >
            Explore Deescribble <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </section>
  );
}
