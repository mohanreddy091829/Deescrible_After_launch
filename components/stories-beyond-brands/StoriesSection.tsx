"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { STORIES, StoryItem } from "@/data/stories";

function Picture({ s, priority }: { s: StoryItem; priority?: boolean }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-[#F1DFD2]">
      <Image
        src={s.coverImage}
        alt={s.imageAlt}
        fill
        quality={85}
        priority={priority}
        sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 384px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ objectPosition: s.focus }}
      />
    </div>
  );
}

export function StoriesSection() {
  const root = useRef<HTMLElement>(null);

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
    return () => mm.revert();
  }, []);

  return (
    <section id="ideas" ref={root} className="relative overflow-hidden bg-[#F8ECE2] py-16 sm:py-24" aria-labelledby="ideas-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div data-s="rise" className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B645D]">06 / Ideas &amp; beyond</p>
          <h2 id="ideas-title" className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1.02] tracking-[-0.03em] text-[#141211]">
            Ideas and beyond
          </h2>
          <p className="mt-4 font-sans text-[16px] leading-relaxed text-[#5A524B]">Documentaries, talks and stories outside the brief.</p>
        </div>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s, i) => (
            <li key={s.id} data-s="rise" className="min-w-0">
              <figure className="m-0">
                {s.externalUrl ? (
                  <a
                    href={s.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.caption} (opens in a new tab)`}
                    className="group block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A51C27]"
                  >
                    <Picture s={s} priority={i < 3} />
                    <figcaption className="mt-4 flex items-start justify-between gap-4 font-sans text-[16px] font-medium leading-snug text-[#141211]">
                      <span className="[text-wrap:balance]">{s.caption}</span>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#6B645D] transition group-hover:text-[#A51C27]" aria-hidden="true" />
                    </figcaption>
                  </a>
                ) : (
                  <>
                    <Picture s={s} />
                    <figcaption className="mt-4 font-sans text-[16px] font-medium leading-snug text-[#141211] [text-wrap:balance]">{s.caption}</figcaption>
                  </>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
