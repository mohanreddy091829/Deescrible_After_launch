import React from "react";
import Image from "next/image";
import { EXPERTISE_PILLARS } from "@/data/expertise";

/** Display-only cards: they show everything on the surface and nothing opens. */
export function ExpertiseSection() {
  return (
    <section id="expertise" className="relative bg-[#F8ECE2] py-10 sm:py-14" aria-labelledby="expertise-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-6 sm:mb-8">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B645D]">01 / Expertise</p>
            <h2 id="expertise-title" className="font-serif text-[clamp(30px,3.8vw,48px)] font-normal leading-[1.02] tracking-[-0.03em] text-[#141211]">
              What I do best
            </h2>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE_PILLARS.map((p) => (
            <li key={p.id} className="min-w-0">
              <article className="flex h-full flex-col rounded-[20px] border border-[#141211]/[0.07] bg-white/80 p-2 shadow-[0_1px_2px_rgba(36,35,33,0.04),0_12px_32px_-24px_rgba(36,35,33,0.35)]">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[14px] bg-[#F1DFD2]">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 384px"
                    quality={85}
                    className="object-cover"
                    style={{ objectPosition: p.focus }}
                  />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-2 pt-3 sm:px-3.5">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-[#A51C27]">{p.number}</span>
                  <h3 className="mt-1 font-serif text-[20px] leading-[1.12] tracking-[-0.02em] text-[#141211]">{p.title}</h3>
                  <p className="mt-1.5 font-sans text-[13.5px] font-semibold leading-snug text-[#141211]">{p.oneLiner}</p>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.5] text-[#5A524B]">{p.text}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
