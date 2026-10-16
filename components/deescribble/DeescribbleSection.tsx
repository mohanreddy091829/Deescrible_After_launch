"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { REELS as DEFAULT_REELS, DEESCRIBBLE_STATS, DEESCRIBBLE_URL, type ReelItem } from "@/data/reels";
import type { ReelEntry } from "@/lib/cms/types";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";


/**
 * Two layers share one stage:
 *  - idle: a curved band of 9:16 reels drifts right → left (CSS-only, paused when off-screen)
 *  - engaged: the moment someone hovers, touches, focuses or uses an arrow, the band stops and a flat,
 *    swipeable row of the same reels takes over so a reel can actually be watched.
 */
export function DeescribbleSection() {
  const root = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLUListElement>(null);
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});
  const stageRef = useRef<HTMLDivElement>(null);
  const [engaged, setEngaged] = useState(false);
  const [inView, setInView] = useState(false);
  const [bandOn, setBandOn] = useState(false);
  const [active, setActive] = useState(0);
  const [narrow, setNarrow] = useState(false);
  // Reels added in the admin replace the built-in quote cards once they exist
  const [reels, setReels] = useState<ReelItem[]>(DEFAULT_REELS);
  const BAND_IMAGES = useMemo(() => reels.map((r) => ({ src: r.poster ?? "", alt: r.title })), [reels]);

  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/reels", { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { items: ReelEntry[] }) => {
        if (!d.items?.length) return;
        setReels(d.items.map((r, i) => ({ id: r.id, title: r.title || `Reel ${i + 1}`, tagline: r.stat, description: "", theme: "Instagram", headline: r.title, poster: r.image, instagramUrl: r.url, bg: "#4a0b11", custom: true })));
        setActive(0);
      })
      .catch(() => undefined);
    return () => ac.abort();
  }, []);

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
    // the drifting band is heavy to build, so mount it shortly before it scrolls into view
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setBandOn(true); near.disconnect(); } }, { rootMargin: "600px" });
    near.observe(el);
    return () => { io.disconnect(); near.disconnect(); };
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
    reels.forEach((r, k) => {
      const v = videos.current[r.id];
      if (!v) return;
      v.muted = true;
      if (engaged && inView && k === active) v.play().catch(() => undefined);
      else v.pause();
    });
  }, [active, engaged, inView, reels]);

  const engage = useCallback(() => setEngaged(true), []);

  // when the band hands over to the row, open on a middle reel so there are reels on both sides
  useEffect(() => {
    const sc = scroller.current;
    if (!engaged || !sc) return;
    const cards = sc.querySelectorAll<HTMLElement>("li");
    const mid = cards[Math.floor(cards.length / 2)];
    if (!mid) return;
    const prev = sc.style.scrollBehavior;
    sc.style.scrollBehavior = "auto";
    sc.scrollLeft = mid.offsetLeft + mid.offsetWidth / 2 - sc.clientWidth / 2;
    sc.style.scrollBehavior = prev;
  }, [engaged]);

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

  const reel = reels[active] ?? reels[0];

  return (
    <section id="deescribble" ref={root} className="relative overflow-hidden bg-white py-12 sm:py-16" aria-label="Deescribble community">

      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8">
        {/* welcome card */}
        <div className="mx-auto mb-10 max-w-[620px] sm:mb-14 lg:mx-0 lg:ml-[8%]">
          <div className="relative pb-5">
            <span aria-hidden="true" className="absolute inset-x-8 top-[-14px] h-10 rounded-[22px] border border-[#141211]/[0.06] bg-white shadow-[0_10px_30px_-18px_rgba(20,18,17,0.35)]" />
            <span aria-hidden="true" className="absolute inset-x-4 top-[-7px] h-10 rounded-[22px] border border-[#141211]/[0.07] bg-white shadow-[0_10px_30px_-16px_rgba(20,18,17,0.35)]" />
            <div className="relative rounded-[22px] border border-[#141211]/[0.08] bg-white px-6 py-6 shadow-[0_24px_50px_-26px_rgba(20,18,17,0.45)] sm:px-8 sm:py-7">
              <p className="font-sans text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#141211] sm:text-[19px]">
                Welcome to the beautiful journey of Deescribble.
              </p>
              <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#4a423d]">
                It began with one story, written to make sense of life, and it has not stopped growing since.
              </p>
            </div>
          </div>
        </div>

        {/* intro */}
        <p className="mb-12 max-w-[980px] font-sans text-[clamp(22px,3vw,40px)] font-bold leading-[1.18] tracking-[-0.03em] text-[#141211] sm:mb-16">
          Deescribble is a community built on trust, where true human emotions, success, failures and the real self of life are shared openly. Today,{" "}
          <span className="text-[#A51C27]">300K+ people</span> have joined the journey, and there is a long way still to go.
        </p>

        {/* moments: two overlapping photo cards */}
        <ul className="mb-14 grid grid-cols-1 gap-6 sm:mb-20 md:relative md:block md:h-[440px] lg:h-[500px]" aria-label="Deescribble moments">
          {[
            { src: "/assets/stories/deescribble-talk.webp", alt: "Dedeepya speaking to a room of women at a Deescribble gathering", pos: "md:absolute md:left-[3%] md:top-0 md:w-[58%] md:-rotate-[2.5deg]" },
            { src: "/assets/stories/deescribble-celebration.webp", alt: "Dedeepya celebrating with women at a Deescribble meetup", pos: "md:absolute md:right-[3%] md:top-[18%] md:z-10 md:w-[50%] md:rotate-[2.5deg]" },
          ].map((c) => (
            <li key={c.src} className={`group ${c.pos}`}>
              <figure className="m-0 rounded-[24px] bg-white p-2.5 shadow-[0_30px_60px_-26px_rgba(20,18,17,0.55)] ring-1 ring-[#141211]/[0.06] transition duration-500 group-hover:-translate-y-2 group-hover:rotate-0">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[17px] bg-[#F1DFD2]">
                  <Image src={c.src} alt={c.alt} fill sizes="(max-width: 767px) 92vw, 58vw" quality={82} className="object-cover" />
                </div>
              </figure>
            </li>
          ))}
        </ul>

        <div className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-[auto_1fr]">
          <div className="relative">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#2E2926]">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4z" fill="#A51C27" /></svg>
              <span>02 / Deescribble</span>
            </div>
            <h2 className="sr-only">Deescribble</h2>
          </div>

          <div className="lg:justify-self-end lg:max-w-[660px]">
            <p className="font-sans text-[15px] leading-relaxed text-[#2E2926]">
              A community for professional and emotional wellbeing. Series on LinkedIn, Lessons of Life and Communication Skills, plus offline meetups for women and artists. Each piece is shaped by audience understanding, with the aim of creating meaningful interaction and trust.
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-x-2 gap-y-5 sm:grid-cols-4">
              {DEESCRIBBLE_STATS.map((s, k) => (
                <div key={s.label} className={k ? "sm:border-l sm:border-dashed sm:border-[#141211]/25 sm:pl-5" : ""}>
                  <dd className="font-serif text-[clamp(22px,2.6vw,36px)] font-medium italic leading-none tracking-tight text-[#141211]">{s.value}</dd>
                  <dt className="mt-1.5 font-mono text-[9.5px] uppercase leading-tight tracking-[0.12em] text-[#6B645D] sm:text-[10.5px]">{s.label}</dt>
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
          {bandOn && <TiltedGridHero
            images={BAND_IMAGES}
            aspectRatio={9 / 16}
            tileHeight={narrow ? 82 : 84}
            axis={50}
            gap={narrow ? 10 : 14}
            curve={narrow ? 38 : 66}
            fade={14}
            speed={3.6}
            className="reel-band absolute inset-0"
          />}

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
            {reels.map((r, k) => (
              <li key={r.id} data-i={k} className={`reel-card ${k === active ? "is-active" : ""}`} aria-label={r.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.poster} alt={r.custom ? `${r.title} (Deescribble reel)` : `Deescribble quote card: "${r.headline}"`} draggable={false} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
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
                <a href={r.instagramUrl ?? DEESCRIBBLE_URL} target="_blank" rel="noopener noreferrer" className="reel-ig" aria-label={`Open ${r.title} on Instagram`}>
                  Instagram <ArrowRight className="h-3 w-3" strokeWidth={2.6} />
                </a>
              </li>
            ))}
          </ul>

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
                <span className="font-semibold text-[#141211]">{reel.title}</span>{reel.tagline ? ` — ${reel.tagline}` : ""}
              </>
            ) : (
              `${reels.some((r) => !r.custom) ? "Quote cards are illustrative. " : ""}Tap one to take control · tap outside to let it drift again.`
            )}
          </p>
          <a
            href={DEESCRIBBLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#141211]/35 bg-white/50 px-5 py-2.5 font-sans text-sm font-bold text-[#141211] transition hover:border-[#141211] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]"
          >
            Follow Deescribble <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </section>
  );
}
