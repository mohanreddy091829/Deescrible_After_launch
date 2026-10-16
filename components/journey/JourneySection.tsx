import React from "react";
import { CHAPTERS, JOURNEY_COPY } from "@/data/experience";

/**
 * The journey as six large chapters: a sticky statement on the left, a stack of quiet cards on the right.
 * Pure server-rendered markup, no animation, so it never slows the page.
 */
export function JourneySection() {
  return (
    <section id="journey" className="relative bg-white py-16 sm:py-24" aria-labelledby="journey-title">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B645D]">{JOURNEY_COPY.eyebrow}</p>
          <h2 id="journey-title" className="font-sans text-[clamp(38px,5.4vw,76px)] font-bold leading-[0.98] tracking-[-0.045em] text-[#141211]">
            Six chapters.
            <br />
            <span className="text-[#A51C27]">One craft.</span>
          </h2>
          <p className="mt-6 max-w-[30em] font-sans text-[17px] font-medium leading-relaxed text-[#4a423d]">{JOURNEY_COPY.intro}</p>
          <dl className="mt-9 flex gap-8 border-t border-[#141211]/10 pt-6">
            {[["~10", "Years"], ["6", "Chapters"], ["300K+", "Community"]].map(([v, l]) => (
              <div key={l}>
                <dd className="font-sans text-[30px] font-bold leading-none tracking-[-0.04em] text-[#141211]">{v}</dd>
                <dt className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B645D]">{l}</dt>
              </div>
            ))}
          </dl>
        </div>

        <ol className="space-y-3.5">
          {CHAPTERS.map((c, i) => {
            const last = i === CHAPTERS.length - 1;
            return (
              <li
                key={c.n}
                className={`group relative overflow-hidden rounded-[26px] border p-6 transition duration-500 sm:p-8 ${
                  last
                    ? "border-transparent bg-gradient-to-br from-[#6a0e17] via-[#4a0b11] to-[#2c0509] text-white shadow-[0_30px_60px_-30px_rgba(74,11,17,0.7)]"
                    : "border-[#141211]/[0.07] bg-[#F8ECE2]/70 hover:-translate-y-0.5 hover:border-[#141211]/15 hover:bg-[#F8ECE2]"
                }`}
              >
                <span aria-hidden="true" className={`pointer-events-none absolute -right-2 -top-6 select-none font-sans text-[clamp(88px,11vw,150px)] font-extrabold leading-none tracking-[-0.06em] ${last ? "text-white/[0.07]" : "text-[#141211]/[0.05]"}`}>
                  {c.n}
                </span>
                <p className={`relative font-sans text-[11px] font-bold uppercase tracking-[0.2em] ${last ? "text-[#ff9b86]" : "text-[#A51C27]"}`}>
                  {c.n} · {c.kicker}
                </p>
                <h3 className={`relative mt-3 font-sans text-[clamp(22px,2.5vw,32px)] font-bold leading-[1.1] tracking-[-0.035em] ${last ? "text-white" : "text-[#141211]"}`}>{c.title}</h3>
                <p className={`relative mt-3 max-w-[40em] font-sans text-[15.5px] leading-relaxed ${last ? "text-white/80" : "text-[#4a423d]"}`}>{c.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
