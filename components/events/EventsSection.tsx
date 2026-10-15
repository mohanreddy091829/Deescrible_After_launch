"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/cms/types";
import { SITE_CONFIG } from "@/data/site-config";

type Data = { upcoming: EventItem[]; past: EventItem[] };

const fmt = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const parts = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return { day: d.toLocaleDateString("en-IN", { day: "2-digit" }), mon: d.toLocaleDateString("en-IN", { month: "short" }).toUpperCase() };
};

function Card({ e, past }: { e: EventItem; past?: boolean }) {
  const p = parts(e.date);
  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-[22px] border border-[#141211]/[0.07] bg-white/80 shadow-[0_1px_2px_rgba(36,35,33,0.04),0_12px_32px_-24px_rgba(36,35,33,0.35)] ${past ? "opacity-90" : ""}`}>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#5A0B12] to-[#A51C27]">
        {e.image && (
          // eslint-disable-next-line @next/next/no-img-element -- CMS images are already resized and compressed on upload
          <img src={e.image} alt={e.title} loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover ${past ? "grayscale-[35%]" : ""}`} />
        )}
        <div className="absolute left-4 top-4 rounded-2xl bg-[#F8ECE2] px-3 py-2 text-center leading-none shadow-sm">
          <div className="font-serif text-[22px] text-[#141211]">{p.day}</div>
          <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-[#A51C27]">{p.mon}</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-serif text-[24px] leading-[1.12] tracking-[-0.02em] text-[#141211]">{e.title}</h3>
        <ul className="mt-3 space-y-1 font-sans text-[13px] text-[#5A524B]">
          <li className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 shrink-0 text-[#A51C27]" aria-hidden="true" />{fmt(e.date)}{e.time ? ` · ${e.time}` : ""}</li>
          {e.location && <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0 text-[#A51C27]" aria-hidden="true" />{e.location}</li>}
        </ul>
        {e.description && <p className="mt-3 whitespace-pre-line font-sans text-[14px] leading-relaxed text-[#5A524B]">{e.description}</p>}
        {e.link && !past && (
          <a href={e.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 font-sans text-[14px] font-bold text-[#141211] hover:text-[#A51C27]">
            {e.linkLabel || "Details"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

/** A swipeable row. With 3 or more cards the left / right keys appear so every card can be reached. */
function Row({ items, past, label }: { items: EventItem[]; past?: boolean; label: string }) {
  const ul = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const nav = items.length >= 3;

  const measure = useCallback(() => {
    const el = ul.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft > el.scrollWidth - el.clientWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, items.length]);

  const go = (dir: -1 | 1) => {
    const el = ul.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? 320) + 20;
    el.scrollBy({ left: dir * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={ul}
        onScroll={measure}
        tabIndex={nav ? 0 : undefined}
        aria-label={label}
        className="work-dock -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scroll-padding-inline:20px] focus:outline-none sm:-mx-8 sm:px-8 sm:[scroll-padding-inline:32px] md:mx-0 md:px-0 md:[scroll-padding-inline:0px]"
      >
        {items.map((e) => (
          <li key={e.id} className={`min-w-0 shrink-0 snap-start ${nav ? "w-[82vw] max-w-[380px] sm:w-[46%] md:w-[calc((100%-40px)/2.6)]" : "w-[82vw] max-w-[380px] sm:w-[calc((100%-20px)/2)] sm:max-w-none lg:w-[calc((100%-40px)/3)]"}`}>
            <Card e={e} past={past} />
          </li>
        ))}
      </ul>
      {nav && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous events" tabIndex={edge.start ? -1 : 0} className={`absolute left-1 top-[34%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#141211]/15 bg-white/90 text-[#141211] shadow-md backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27] sm:flex md:-left-5 ${edge.start ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next events" tabIndex={edge.end ? -1 : 0} className={`absolute right-1 top-[34%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#141211]/15 bg-white/90 text-[#141211] shadow-md backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27] sm:flex md:-right-5 ${edge.end ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}

/** Offline events, managed from /admin. Loaded after the page so a slow API never blocks the first paint. */
export function EventsSection() {
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/events", { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Data) => setData(d))
      .catch((e) => e?.name !== "AbortError" && setFailed(true));
    return () => ac.abort();
  }, []);

  const empty = data && !data.upcoming.length && !data.past.length;

  return (
    <section id="events" className="relative bg-[#F2EBDC] py-14 sm:py-20" aria-labelledby="events-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-9 max-w-2xl sm:mb-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B645D]">Offline events</p>
          <h2 id="events-title" className="font-serif text-[clamp(32px,4.4vw,56px)] font-normal leading-[1.04] tracking-[-0.03em] text-[#141211]">
            Meet in person
          </h2>
          <p className="mt-4 font-sans text-[16px] leading-relaxed text-[#5A524B]">Meetups, workshops and gatherings for women, artists and creators. New dates are added often.</p>
        </div>

        {!data && !failed && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((i) => <div key={i} className="h-[380px] animate-pulse rounded-[22px] bg-[#141211]/[0.05]" />)}
          </div>
        )}

        {(empty || failed) && (
          <div className="rounded-[22px] border border-dashed border-[#141211]/20 bg-white/50 p-8 text-center sm:p-12">
            <p className="font-serif text-2xl text-[#141211]">The next event is being planned.</p>
            <p className="mx-auto mt-2 max-w-md font-sans text-[15px] text-[#5A524B]">Follow Deescribble on Instagram to hear about it first.</p>
            <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#141211] px-5 py-2.5 font-sans text-sm font-bold text-white hover:bg-[#7a1018]">
              Follow on Instagram <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}

        {data && data.upcoming.length > 0 && (
          <>
            <h3 className="sr-only">Upcoming events</h3>
            <Row items={data.upcoming} label="Upcoming events" />
          </>
        )}

        {data && data.past.length > 0 && (
          <>
            <h3 className="mb-5 mt-14 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B645D]">Recent events</h3>
            <Row items={data.past} past label="Recent events" />
          </>
        )}
      </div>
    </section>
  );
}
