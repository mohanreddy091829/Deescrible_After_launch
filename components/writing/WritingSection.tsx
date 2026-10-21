import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES, WRITING_LINKS } from "@/data/writing";

const fmt = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

/** Server-rendered grid of articles from LinkedIn and Substack, with a link out for the rest. */
export function WritingSection() {
  return (
    <section id="writing" className="relative bg-[#F8ECE2] py-14 sm:py-20" aria-labelledby="writing-title">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-8 sm:mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B645D]">05 / Writing</p>
          <h2 id="writing-title" className="font-serif text-[clamp(32px,4.4vw,56px)] font-normal leading-[1.02] tracking-[-0.03em] text-[#141211]">
            Words on the page
          </h2>
          <p className="mt-3 max-w-[36em] font-sans text-[16px] leading-relaxed text-[#4a423d]">
            Brand case studies, lessons from building a community and notes on storytelling, from LinkedIn and Substack.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <li key={a.id} className="min-w-0">
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#141211]/[0.07] bg-white/80 shadow-[0_1px_2px_rgba(36,35,33,0.04),0_12px_32px_-24px_rgba(36,35,33,0.35)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_40px_-24px_rgba(36,35,33,0.5)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#A51C27]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F1DFD2]">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    quality={85}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 400px"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: a.platform === "Substack" ? "50% 30%" : "50% 50%" }}
                  />
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-[#F8ECE2]/92 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#141211] backdrop-blur-sm">
                    {a.platform}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-[#A51C27]">{fmt(a.date).toUpperCase()}</p>
                  <h3 className="mt-2 font-serif text-[21px] leading-[1.15] tracking-[-0.02em] text-[#141211]">{a.title}</h3>
                  <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#5A524B]">{a.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-sans text-[14px] font-bold text-[#141211] group-hover:text-[#A51C27]">
                    Read on {a.platform} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="font-sans text-[14px] font-semibold text-[#141211]">More articles</span>
          {[["LinkedIn", WRITING_LINKS.linkedin], ["Substack", WRITING_LINKS.substack]].map(([l, u]) => (
            <a
              key={l}
              href={u}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#141211]/20 bg-white/70 px-4 py-2 font-sans text-[13.5px] font-bold text-[#141211] transition hover:border-[#141211] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]"
            >
              {l} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
