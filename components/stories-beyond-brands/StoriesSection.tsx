"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORIES, StoryItem } from "@/data/stories";
import { Modal } from "@/components/ui/Modal";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const ALL = ["All", "Articles", "TEDx", "Documentary", "Speaking", "In the Media"] as const;

export function StoriesSection() {
  const root = useRef<HTMLElement>(null);
  const dock = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [filter, setFilter] = useState<(typeof ALL)[number]>("All");
  const [selected, setSelected] = useState<StoryItem | null>(null);

  const present = new Set<string>(STORIES.map((s) => s.category));
  const list = filter === "All" ? STORIES : STORIES.filter((s) => s.category === filter);

  const syncBar = useCallback(() => {
    const d = dock.current, b = bar.current;
    if (!d || !b) return;
    const max = d.scrollWidth - d.clientWidth;
    const vis = Math.min(1, d.clientWidth / d.scrollWidth);
    b.style.width = `${vis * 100}%`;
    b.style.transform = `translateX(${max > 0 ? (d.scrollLeft / max) * (1 / vis - 1) * 100 : 0}%)`;
  }, []);

  const nudge = (dir: -1 | 1) => {
    const d = dock.current;
    if (!d) return;
    const w = (d.querySelector("li")?.getBoundingClientRect().width ?? 300) + 20;
    d.scrollBy({ left: dir * w, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const choose = (c: (typeof ALL)[number]) => {
    setFilter(c);
    requestAnimationFrame(() => { dock.current?.scrollTo({ left: 0 }); syncBar(); });
  };

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = el.querySelectorAll("[data-s=rise]");
      gsap.set(items, { autoAlpha: 0, y: 24 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08, ease: "power3.out", overwrite: true }),
      });
    });
    syncBar();
    window.addEventListener("resize", syncBar);
    return () => { window.removeEventListener("resize", syncBar); mm.revert(); };
  }, [syncBar]);

  return (
    <section id="ideas" ref={root} className="relative overflow-hidden bg-[#F7F3EA] py-10 sm:py-14" aria-label="Ideas and beyond">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="mb-6 grid items-end gap-x-10 gap-y-5 sm:mb-8 lg:grid-cols-[auto_1fr_auto]">
          <div data-s="rise">
            <div className="mb-2.5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#4a463f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D5AA67]" />
              <span>05 / Ideas &amp; beyond</span>
            </div>
            <h2 className="font-serif text-[clamp(32px,3.9vw,56px)] font-normal leading-[1.02] tracking-[-0.03em] text-[#1d1b19]">
              More than
              <br />
              <span className="italic">brand work.</span>
            </h2>
          </div>

          <div data-s="rise" className="min-w-0 lg:pb-1">
            <p className="max-w-lg font-sans text-[15px] leading-relaxed text-[#3d3a35]">
              Exploring ideas, sharing perspectives and working on stories that go beyond campaigns.
            </p>
            <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="tablist" aria-label="Filter by type">
              {ALL.filter((c) => c === "All" || present.has(c)).map((c) => {
                const on = filter === c;
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={on}
                    onClick={() => choose(c)}
                    className={`shrink-0 rounded-full border px-4 py-1.5 font-sans text-[13px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0713a] ${
                      on ? "border-[#1d1b19] bg-[#1d1b19] text-[#F7F3EA]" : "border-[#242321]/15 bg-white/60 text-[#4a463f] hover:border-[#242321]/40 hover:bg-white"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div data-s="rise" className="hidden items-center gap-2 lg:flex">
            <button onClick={() => nudge(-1)} aria-label="Previous stories" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#242321]/25 bg-white/70 transition hover:border-[#1d1b19] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0713a]">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => nudge(1)} aria-label="Next stories" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#242321]/25 bg-white/70 transition hover:border-[#1d1b19] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0713a]">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <ul
          ref={dock}
          onScroll={syncBar}
          tabIndex={0}
          aria-label="Stories"
          className="work-dock -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 pt-1 [scroll-padding-inline:20px] focus:outline-none sm:-mx-8 sm:gap-5 sm:px-8 sm:[scroll-padding-inline:32px]"
        >
          {list.map((s) => (
            <li key={s.id} data-s="rise" className="w-[74vw] max-w-[320px] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] sm:max-w-none md:w-[calc((100%-40px)/3)] xl:w-[calc((100%-60px)/4)]">
              <button
                type="button"
                onClick={() => setSelected(s)}
                aria-haspopup="dialog"
                aria-label={`${s.title} — open`}
                className="group flex h-full w-full cursor-pointer flex-col rounded-[20px] border border-[#242321]/10 bg-white/70 p-2 text-left transition duration-300 hover:-translate-y-1 hover:border-[#242321]/25 hover:bg-white hover:shadow-[0_22px_36px_-20px_rgba(36,35,33,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0713a]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#E8DFCC]">
                  <Image
                    src={s.coverImage}
                    alt={s.imageAlt}
                    fill
                    quality={85}
                    sizes="(max-width: 639px) 74vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, 320px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ objectPosition: s.focus }}
                  />
                  <span className="absolute bottom-0 left-0 rounded-tr-xl bg-white px-3 pb-1 pt-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#1d1b19]">
                    {s.category === "Articles" ? "Article" : s.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-3.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#8a857c]">{s.meta}</span>
                  <h3 className="mt-1.5 font-sans text-[16px] font-semibold leading-[1.28] tracking-[-0.01em] text-[#1d1b19] [text-wrap:balance]">{s.title}</h3>
                  <p className="mt-1.5 line-clamp-2 font-sans text-[13px] leading-relaxed text-[#5d5a54]">{s.subtitle}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="inline-flex items-center gap-1.5 font-sans text-[13px] font-bold text-[#1d1b19]">
                      {s.actionText} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
                    </span>
                    <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#242321]/25 transition group-hover:border-[#1d1b19] group-hover:bg-[#1d1b19] group-hover:text-[#F7F3EA]">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="h-[3px] w-full overflow-hidden rounded-full bg-[#242321]/10" aria-hidden="true">
          <span ref={bar} className="block h-full rounded-full bg-[#1d1b19] transition-[width] duration-300" style={{ width: "30%" }} />
        </div>
      </div>

      {selected && (
        <Modal isOpen onClose={() => setSelected(null)} title={selected.title} maxWidth="2xl" bare>
          <article>
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-2xl bg-[#1d1b19]">
              <Image src={selected.coverImage} alt={selected.imageAlt} fill priority quality={90} sizes="(max-width: 672px) 100vw, 672px" className="object-cover" style={{ objectPosition: selected.focus }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14120f]/85 via-[#14120f]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="font-mono text-xs tracking-[0.2em] text-[#e8b95f]">{selected.meta.toUpperCase()}</span>
                <h3 className="mt-1 font-serif text-xl leading-tight tracking-tight text-white sm:text-3xl">{selected.title}</h3>
              </div>
            </div>
            <div className="space-y-5 p-5 sm:p-7">
              <p className="font-serif text-lg leading-snug text-[#1d1b19] sm:text-xl">{selected.subtitle}</p>
              <p className="font-sans text-[14px] leading-relaxed text-[#4a463f]">{selected.summary}</p>
              <a
                href={selected.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1d1b19] px-5 py-2.5 font-sans text-sm font-bold text-white transition hover:bg-[#3a3835] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0713a]"
              >
                {selected.actionText} <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </a>
              <p className="font-sans text-[11px] leading-relaxed text-[#8a857c]">
                Illustrative photo: {selected.credit.title} by{" "}
                <a href={selected.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#1d1b19]">{selected.credit.author}</a>
                , {selected.credit.license}, via Wikimedia Commons.
              </p>
            </div>
          </article>
        </Modal>
      )}
    </section>
  );
}
