"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, Project } from "@/data/projects";
import { Modal } from "@/components/ui/Modal";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "FMCG", "Technology", "Personal Branding"] as const;

export function SelectedWorkSection() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const root = useRef<HTMLElement>(null);
  const dock = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const available = new Set<string>(PROJECTS.map((p) => p.category));

  const syncBar = useCallback(() => {
    const d = dock.current, b = bar.current;
    if (!d || !b) return;
    const max = d.scrollWidth - d.clientWidth;
    const visible = d.clientWidth / d.scrollWidth;
    b.style.width = `${Math.min(1, visible) * 100}%`;
    b.style.transform = `translateX(${max > 0 ? (d.scrollLeft / max) * (1 / visible - 1) * 100 : 0}%)`;
  }, []);

  const nudge = (dir: -1 | 1) => {
    const d = dock.current;
    if (!d) return;
    const card = d.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? 320) + 20;
    d.scrollBy({ left: dir * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(el.querySelectorAll("[data-w=rise]"), { autoAlpha: 0, y: 26 });
      gsap.set(el.querySelectorAll("[data-w=draw]"), { strokeDashoffset: 1 });
      ScrollTrigger.batch(el.querySelectorAll("[data-w=rise]"), {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out", overwrite: true }),
      });
      ScrollTrigger.create({
        trigger: el.querySelector("[data-w=draw]"),
        start: "top 90%",
        once: true,
        onEnter: () => gsap.to(el.querySelectorAll("[data-w=draw]"), { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.2 }),
      });
    });
    syncBar();
    window.addEventListener("resize", syncBar);
    return () => {
      window.removeEventListener("resize", syncBar);
      mm.revert();
    };
  }, [syncBar]);

  // new filter → back to the start and re-measure
  const choose = (c: (typeof CATEGORIES)[number]) => {
    setFilter(c);
    requestAnimationFrame(() => {
      dock.current?.scrollTo({ left: 0 });
      syncBar();
    });
  };

  return (
    <section id="work" ref={root} className="relative overflow-hidden bg-[#F8ECE2] pb-16 pt-12 sm:pb-24 sm:pt-16" aria-label="Selected work and case studies">
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="mb-8 grid items-end gap-x-10 gap-y-6 sm:mb-10 lg:grid-cols-[1fr_auto]">
          <div>
            <div data-w="rise" className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B645D]">
              <span>03 / Selected work</span>
            </div>
            <h2 data-w="rise" className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1.02] tracking-[-0.03em] text-[#141211]">
              Selected work
            </h2>
          </div>

          <div data-w="rise" className="flex flex-col gap-4 lg:items-end">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 lg:justify-end" role="tablist" aria-label="Filter by category">
              {CATEGORIES.filter((c) => c === "All" || available.has(c)).map((c) => {
                const on = filter === c;
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={on}
                    onClick={() => choose(c)}
                    className={`shrink-0 rounded-full border px-4 py-1.5 font-sans text-[13px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27] ${
                      on ? "border-[#141211] bg-[#141211] text-[#F8ECE2]" : "border-[#141211]/15 bg-white/60 text-[#2E2926] hover:border-[#141211]/40 hover:bg-white"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <button onClick={() => nudge(-1)} aria-label="Previous projects" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141211]/20 bg-white/70 text-[#141211] transition hover:bg-white hover:border-[#141211] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => nudge(1)} aria-label="Next projects" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141211]/20 bg-white/70 text-[#141211] transition hover:bg-white hover:border-[#141211] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* dock */}
      <ul
        ref={dock}
        onScroll={syncBar}
        tabIndex={0}
        aria-label="Projects"
        className="work-dock flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-2 sm:gap-5 sm:px-8 min-[1424px]:pl-[calc((100vw-1296px)/2)] [scroll-padding-inline:20px] sm:[scroll-padding-inline:32px] min-[1424px]:[scroll-padding-inline:calc((100vw-1296px)/2)] focus:outline-none"
      >
        {list.map((p, i) => (
          <li key={p.id} data-w="rise" className="w-[64vw] max-w-[280px] shrink-0 snap-start sm:w-[272px]">
            <button
              type="button"
              onClick={() => setSelected(p)}
              aria-haspopup="dialog"
              aria-label={`${p.title} — read the case`}
              className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[22px] bg-[#141211] text-left shadow-[0_1px_2px_rgba(36,35,33,0.1)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_44px_-22px_rgba(36,35,33,0.55)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#A51C27]"
            >
              <div className="relative aspect-[5/6] w-full">
                <Image
                  src={p.coverImage}
                  alt={p.imageAlt}
                  fill
                  quality={85}
                  sizes="(max-width: 639px) 64vw, 280px"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: p.focus }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/35 to-transparent" />

                <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                  <span className="rounded-full bg-[#F8ECE2]/92 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#141211] backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="font-mono text-[11px] tracking-[0.2em] text-[#C78B87]">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-1 font-serif text-[23px] leading-[1.08] tracking-[-0.02em] text-white">{p.title}</h3>
                  <p className="mt-1.5 font-sans text-[13px] leading-snug text-white/75">{p.role}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3.5">
                    <span className="font-sans text-[12.5px] font-semibold text-white/90">Read the case</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#141211] transition duration-300 group-hover:bg-[#C78B87]">
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
        <li aria-hidden="true" className="w-1 shrink-0 sm:w-4" />
      </ul>

      {/* progress */}
      <div className="mx-auto mt-1 max-w-[1360px] px-5 sm:px-8">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-[#141211]/10" aria-hidden="true">
          <span ref={bar} className="block h-full rounded-full bg-[#141211] transition-[width] duration-300" style={{ width: "30%" }} />
        </div>
      </div>

      {selected && (
        <Modal isOpen onClose={() => setSelected(null)} title={selected.title} maxWidth="3xl" bare>
          <article>
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-2xl bg-[#141211]">
              <Image src={selected.coverImage} alt={selected.imageAlt} fill priority quality={90} sizes="(max-width: 896px) 100vw, 896px" className="object-cover" style={{ objectPosition: selected.focus }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/85 via-[#141211]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <span className="font-mono text-xs tracking-[0.2em] text-[#C78B87]">{selected.category.toUpperCase()}</span>
                <h3 className="mt-1 font-serif text-2xl leading-tight tracking-tight text-white sm:text-[34px]">{selected.title}</h3>
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-8">
              <dl className="grid grid-cols-2 gap-4 border-b border-[#141211]/10 pb-5 font-mono text-xs">
                {[
                  ["Brand", selected.clientOrBrand],
                  ["Role", selected.role],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[#6B645D]">{k}</dt>
                    <dd className="mt-0.5 font-semibold text-[#141211]">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="font-serif text-xl leading-snug text-[#141211] sm:text-2xl">{selected.case}</p>

              <a href="/consultation" onClick={() => setSelected(null)} className="inline-flex items-center gap-2 rounded-full bg-[#141211] px-5 py-2.5 font-sans text-sm font-bold text-white transition hover:bg-[#2E2926] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]">
                Discuss a similar brief <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </a>

              {selected.credit && (
                <p className="font-sans text-[11px] leading-relaxed text-[#6B645D]">
                  Illustrative photo: {selected.credit.title} by{" "}
                  <a href={selected.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#141211]">{selected.credit.author}</a>
                  , {selected.credit.license}, via Wikimedia Commons. Not campaign artwork.
                </p>
              )}
            </div>
          </article>
        </Modal>
      )}
    </section>
  );
}
