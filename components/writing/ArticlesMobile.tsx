"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { Article, WRITING_LINKS } from "@/data/writing";
import { SITE_CONFIG } from "@/data/site-config";

const fmt = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

const FOLLOW = [
  { badge: "L", label: "LinkedIn", url: WRITING_LINKS.linkedin },
  { badge: "S", label: "Substack", url: WRITING_LINKS.substack },
  { badge: "I", label: "Instagram", url: SITE_CONFIG.socials.instagram },
];

/** Phones only: one tile that opens to reveal every article, so the section stays short. */
export function ArticlesMobile({ articles }: { articles: Article[] }) {
  const [open, setOpen] = useState(false);
  const panel = useId();
  const odd = articles.length % 2 === 1;

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panel}
        className="group relative flex w-full items-center gap-4 overflow-hidden rounded-[22px] bg-[#141211] p-4 text-left shadow-[0_1px_2px_rgba(36,35,33,0.1)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#A51C27]"
      >
        <span className="flex shrink-0 -space-x-5" aria-hidden="true">
          {articles.slice(0, 3).map((a, i) => (
            <span key={a.id} className="relative h-16 w-14 overflow-hidden rounded-xl border-2 border-[#141211] bg-[#F1DFD2]" style={{ transform: `rotate(${(i - 1) * 5}deg)`, zIndex: 3 - i }}>
              <Image src={a.image} alt="" fill sizes="56px" quality={75} className="object-cover" />
            </span>
          ))}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#C78B87]">{articles.length} pieces</span>
          <span className="mt-0.5 block font-serif text-[24px] leading-[1.05] tracking-[-0.02em] text-white">Articles</span>
          <span className="mt-1 block font-sans text-[12.5px] leading-snug text-white/70">{open ? "Tap to close" : "Tap to open all the articles"}</span>
        </span>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition duration-300 ${open ? "bg-[#C78B87] text-[#141211]" : "bg-white/95 text-[#141211]"}`} aria-hidden="true">
          {open ? <Minus className="h-4 w-4" strokeWidth={2.4} /> : <Plus className="h-4 w-4" strokeWidth={2.4} />}
        </span>
      </button>

      <div id={panel} className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className={`min-h-0 overflow-hidden ${open ? "" : "invisible"}`}>
          <ul className="grid grid-cols-2 gap-3 pt-3">
            {articles.map((a, i) => (
              <li key={a.id} className={`min-w-0 ${odd && i === articles.length - 1 ? "col-span-2" : ""}`}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[#141211]/[0.07] bg-white/80 shadow-[0_1px_2px_rgba(36,35,33,0.04)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]"
                >
                  <div className={`relative w-full overflow-hidden bg-[#F1DFD2] ${odd && i === articles.length - 1 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                    <Image src={a.image} alt={a.imageAlt} fill quality={80} sizes="(max-width: 639px) 46vw, 300px" className="object-cover" style={{ objectPosition: a.platform === "Substack" ? "50% 30%" : "50% 40%" }} />
                    <span className="absolute left-2 top-2 rounded-full bg-[#F8ECE2]/92 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#141211]">{a.platform}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-[#A51C27]">{fmt(a.date).toUpperCase()}</p>
                    <h3 className="mt-1 line-clamp-3 font-serif text-[15.5px] leading-[1.18] tracking-[-0.015em] text-[#141211]">{a.title}</h3>
                    <span className="mt-auto inline-flex items-center gap-1 pt-2.5 font-sans text-[12.5px] font-bold text-[#141211]">
                      Read <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <div className="pb-1 pt-5">
            <p className="font-sans text-[14px] font-semibold text-[#141211]">Follow on</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {FOLLOW.map((f) => (
                <a
                  key={f.label}
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${f.label}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#141211]/20 bg-white/70 py-1.5 pl-1.5 pr-3.5 font-sans text-[13px] font-bold text-[#141211] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#141211] font-mono text-[11px] text-[#F8ECE2]" aria-hidden="true">{f.badge}</span>
                  {f.label}
                </a>
              ))}
            </div>
            <p className="mt-3 font-sans text-[13px] text-[#5A524B]">To read more…</p>
          </div>
        </div>
      </div>
    </div>
  );
}
