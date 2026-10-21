"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { CASE_STUDIES, CaseStudy } from "@/data/casestudies";
import { Modal } from "@/components/ui/Modal";

export function SelectedWorkSection() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(el.querySelectorAll("[data-w=rise]"), { autoAlpha: 0, y: 26 });
      ScrollTrigger.batch(el.querySelectorAll("[data-w=rise]"), {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out", overwrite: true }),
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={root} className="relative overflow-hidden bg-[#F8ECE2] pb-16 pt-12 sm:pb-24 sm:pt-16" aria-labelledby="work-title">
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-8 sm:mb-10">
          <p data-w="rise" className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B645D]">03 / Case studies</p>
          <h2 id="work-title" data-w="rise" className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1.02] tracking-[-0.03em] text-[#141211]">
            Case studies
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <li key={c.id} data-w="rise" className="min-w-0">
              <button
                type="button"
                onClick={() => setSelected(c)}
                aria-haspopup="dialog"
                aria-label={c.title}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-[22px] bg-[#141211] text-left shadow-[0_1px_2px_rgba(36,35,33,0.1)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_44px_-22px_rgba(36,35,33,0.55)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#A51C27]"
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-[5/6]">
                  <Image
                    src={c.cover}
                    alt={c.coverAlt}
                    fill
                    quality={85}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 400px"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: c.focus }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] tracking-[0.2em] text-[#C78B87]">{c.number}</div>
                      <h3 className="mt-1 font-serif text-[25px] leading-[1.08] tracking-[-0.02em] text-white">{c.title}</h3>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/95 text-[#141211] transition duration-300 group-hover:bg-[#C78B87]" aria-hidden="true">
                      <Plus className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected && (
        <Modal isOpen onClose={() => setSelected(null)} title={selected.title} maxWidth="3xl" bare>
          <article>
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-2xl bg-[#141211]">
              <Image src={selected.cover} alt={selected.coverAlt} fill priority quality={90} sizes="(max-width: 896px) 100vw, 896px" className="object-cover" style={{ objectPosition: selected.focus }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/85 via-[#141211]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <span className="font-mono text-xs tracking-[0.2em] text-[#C78B87]">{selected.number} · {selected.title.toUpperCase()}</span>
              </div>
            </div>

            <div className="space-y-8 p-5 sm:p-8">
              <header>
                {selected.eyebrow && <p className="mb-3 font-sans text-[13px] font-bold uppercase tracking-[0.04em] text-[#A51C27]/80">{selected.eyebrow}</p>}
                <h3 className="font-sans text-[clamp(26px,4vw,38px)] font-bold leading-[1.1] tracking-[-0.035em] text-[#141211]">{selected.headline}</h3>
                <p className="mt-3 font-mono text-[11.5px] uppercase leading-relaxed tracking-[0.12em] text-[#A51C27]">{selected.skills}</p>
                {selected.role && (
                  <div className="mt-5 border-t border-[#141211]/10 pt-5">
                    <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6B645D]">Role</p>
                    <p className="mt-2 font-sans text-[17px] font-bold text-[#141211]">{selected.role}</p>
                  </div>
                )}
              </header>

              <div className="space-y-4">
                {selected.intro.map((t) => (
                  <p key={t} className="font-sans text-[16px] leading-relaxed text-[#2E2926]">{t}</p>
                ))}
              </div>

              {selected.stats && (
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {selected.stats.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-[#141211]/10 bg-white/70 p-4">
                      <dd className="font-sans text-[26px] font-bold leading-none tracking-[-0.04em] text-[#141211]">{s.value}</dd>
                      <dt className="mt-2 font-sans text-[12px] leading-snug text-[#5A524B]">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              )}

              <div>
                <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6B645D]">Selected work</p>
                <ul className="divide-y divide-[#141211]/10 border-y border-[#141211]/10">
                  {selected.work.map((w) => (
                    <li key={w.name} className="py-4">
                      <h4 className="font-serif text-[22px] leading-tight tracking-[-0.02em] text-[#141211]">{w.name}</h4>
                      <p className="mt-0.5 font-mono text-[11.5px] tracking-[0.04em] text-[#6B645D]">{w.meta}</p>
                      {w.subtitle && <p className="mt-2 font-sans text-[15px] italic leading-snug text-[#4a423d]">{w.subtitle}</p>}
                      {[...(w.text ? [w.text] : []), ...(w.body ?? [])].map((t) => (
                        <p key={t} className="mt-3 font-sans text-[15px] leading-relaxed text-[#2E2926] first:mt-2">{t}</p>
                      ))}
                      {w.contribution && (
                        <div className="mt-4">
                          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6B645D]">My contribution</p>
                          <ul className="mt-2 space-y-1.5">
                            {w.contribution.map((c) => (
                              <li key={c} className="flex gap-2.5 font-sans text-[15px] leading-relaxed text-[#2E2926]">
                                <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-[#A51C27]" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {w.shows && (
                        <p className="mt-4 font-sans text-[15px] leading-relaxed text-[#2E2926]">
                          <span className="font-bold text-[#141211]">What this project demonstrates: </span>
                          {w.shows}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {selected.photos.length > 0 && (
                <div>
                  <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6B645D]">Proof of work</p>
                  <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {selected.photos.map((p) => (
                      <li key={p.src} className={p.tall ? "row-span-2" : ""}>
                        <figure className="relative">
                          <div className={`relative w-full overflow-hidden rounded-xl bg-[#F1DFD2] ${p.tall ? "aspect-[9/18]" : "aspect-[4/3]"}`}>
                            <Image
                              src={p.src}
                              alt={p.alt}
                              fill
                              quality={85}
                              sizes="(max-width: 639px) 45vw, 270px"
                              className={p.tall ? "object-cover object-top" : "object-cover"}
                              style={p.focus && !p.tall ? { objectPosition: p.focus } : undefined}
                            />
                          </div>
                          {p.caption && <figcaption className="mt-1.5 font-sans text-[12px] leading-snug text-[#5A524B]">{p.caption}</figcaption>}
                        </figure>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.links.length > 0 && (
                <div>
                  <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6B645D]">Read and watch</p>
                  <ul className="space-y-2">
                    {selected.links.map((l) => (
                      <li key={l.url}>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 rounded-xl border border-[#141211]/10 bg-white/70 px-4 py-3 transition hover:border-[#141211]/30 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]"
                        >
                          <span className="min-w-0">
                            <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#A51C27]">{l.kind}</span>
                            <span className="mt-0.5 block font-sans text-[14.5px] font-semibold leading-snug text-[#141211]">{l.label}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.4} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a href="/consultation" onClick={() => setSelected(null)} className="inline-flex items-center gap-2 rounded-full bg-[#141211] px-5 py-2.5 font-sans text-sm font-bold text-white transition hover:bg-[#2E2926] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]">
                Discuss a similar brief <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </a>
            </div>
          </article>
        </Modal>
      )}
    </section>
  );
}
