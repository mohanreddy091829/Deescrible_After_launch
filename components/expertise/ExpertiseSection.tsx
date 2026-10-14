"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EXPERTISE_PILLARS, ExpertisePillar } from "@/data/expertise";
import { Modal } from "@/components/ui/Modal";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

export function ExpertiseSection() {
  const [selected, setSelected] = useState<ExpertisePillar | null>(null);

  const open = (p: ExpertisePillar) => setSelected(p);

  return (
    <section
      id="expertise"
      className="relative bg-[#F8ECE2] pt-10 pb-14 sm:pt-12 sm:pb-16"
      aria-label="Six Ways I Create Impact"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        {/* Header */}
        <div className="mb-7 grid items-end gap-x-10 gap-y-5 sm:mb-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_auto]">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#2E2926]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A51C27]" />
              <span>02 / Expertise</span>
            </div>
            <h2 className="font-serif text-[clamp(34px,4.4vw,62px)] font-normal leading-[1.02] tracking-[-0.028em] text-[#141211]">
              Six ways
              <br />
              I create impact.
            </h2>
          </div>

          <p className="max-w-[34rem] pb-1 font-sans text-[15px] leading-relaxed text-[#2E2926]">
            From consumer brands to personal stories, I work across different spaces with a common goal — to find the
            right story, for the right people, in the right way.
          </p>

          {/* Handwritten note (kept as designed) */}
          <div className="relative max-w-xs self-start rotate-1 rounded-2xl border border-[#141211]/15 bg-[#F1DFD2]/60 p-4 shadow-xs lg:self-end">
            <div className="absolute -top-3 left-6 h-3 w-8 rounded-xs bg-[#C78B87] opacity-75" />
            <div className="flex items-start gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#141211]/10 bg-white">
                <Image src="/assets/annotations/expertise-doodle.png" alt="Editorial doodle illustration" fill sizes="48px" className="object-cover" />
              </div>
              <p className="font-script text-lg leading-snug text-[#141211] sm:text-xl">
                Different challenges.
                <br />
                One approach.
                <br />
                <span className="text-[#A51C27]">People-first stories.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
          {EXPERTISE_PILLARS.map((p) => (
            <li key={p.id} className="min-w-0">
              <button
                type="button"
                onClick={() => open(p)}
                aria-haspopup="dialog"
                className="group flex h-full w-full cursor-pointer flex-col rounded-2xl border border-[#141211]/10 bg-white/75 p-2 text-left shadow-[0_1px_2px_rgba(36,35,33,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#141211]/25 hover:bg-white hover:shadow-[0_18px_34px_-16px_rgba(36,35,33,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#F1DFD2]">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 519px) 92vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, 224px"
                    quality={85}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ objectPosition: p.focus }}
                  />
                  <span className="absolute bottom-0 left-0 rounded-tr-xl bg-[#F8ECE2] px-3 pb-1 pt-1.5 font-sans text-[17px] font-semibold leading-none text-[#141211]">
                    {p.number}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-3.5">
                  <h3 className="font-sans text-[15px] font-semibold leading-[1.28] text-[#141211]">{p.title}</h3>
                  <ul className="mb-3 mt-2.5 space-y-0.5 font-sans text-[13px] leading-[1.55] text-[#6B645D]">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <span
                    aria-hidden="true"
                    className="mt-auto flex h-7 w-7 items-center justify-center self-end rounded-full border border-[#141211]/25 text-[#141211] transition duration-200 group-hover:border-[#141211] group-hover:bg-[#141211] group-hover:text-[#F8ECE2]"
                  >
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected && (
        <Modal isOpen onClose={() => setSelected(null)} title={`${selected.number} — ${selected.title}`} maxWidth="3xl" bare>
          <article>
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-t-2xl bg-[#F1DFD2] sm:aspect-[21/8]">
              <Image
                src={selected.image}
                alt={selected.imageAlt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                quality={90}
                className="object-cover"
                style={{ objectPosition: selected.focus }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816]/80 via-[#1a1816]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <span className="font-mono text-xs tracking-[0.2em] text-[#C78B87]">{selected.number}</span>
                <h3 className="mt-1 font-serif text-2xl leading-tight tracking-tight text-white sm:text-[34px]">{selected.title}</h3>
              </div>
            </div>

            <div className="space-y-7 p-5 sm:p-8">
              <div>
                <p className="font-serif text-xl leading-snug text-[#141211] sm:text-2xl">{selected.lead}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#2E2926] sm:text-[15px]">{selected.description}</p>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A51C27]">How I work</h4>
                  <ol className="space-y-3.5">
                    {selected.how.map((h, i) => (
                      <li key={h.step} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#141211] font-sans text-xs font-semibold text-[#F8ECE2]">
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-sans text-sm font-semibold text-[#141211]">{h.step}</div>
                          <p className="mt-0.5 font-sans text-[13px] leading-relaxed text-[#2E2926]">{h.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B645D]">What you get</h4>
                  <ul className="space-y-2.5">
                    {selected.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 font-sans text-sm text-[#141211]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A51C27]" strokeWidth={2.6} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B645D]">Where this showed up</h4>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {selected.proof.map((x) => (
                    <li key={x.label} className="rounded-xl border border-[#141211]/10 bg-white/70 p-3.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-sans text-sm font-semibold text-[#141211]">{x.label}</span>
                        {x.period && <span className="font-mono text-[11px] tracking-wider text-[#A51C27]">{x.period}</span>}
                      </div>
                      <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#2E2926]">{x.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 rounded-xl bg-[#F1DFD2]/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-sans text-[13px] leading-relaxed text-[#2E2926]">
                  <span className="font-semibold text-[#141211]">Best for: </span>
                  {selected.bestFor}
                </p>
                <a
                  href="#booking"
                  onClick={() => setSelected(null)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#141211] px-5 py-2.5 font-sans text-sm font-bold text-white transition hover:bg-[#2E2926] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]"
                >
                  {selected.cta}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
                </a>
              </div>

              <p className="font-sans text-[11px] leading-relaxed text-[#6B645D]">
                Photo: {selected.credit.title} by{" "}
                <a href={selected.credit.url} target="_blank" rel="noopener noreferrer" className="underline decoration-[#6B645D]/50 underline-offset-2 hover:text-[#141211]">
                  {selected.credit.author}
                </a>
                , {selected.credit.license}, via Wikimedia Commons.
              </p>
            </div>
          </article>
        </Modal>
      )}
    </section>
  );
}
