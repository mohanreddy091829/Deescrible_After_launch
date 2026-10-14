"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

/** What the sentence "We turn complex ideas into …" can end with. All drawn from work already on the site. */
const ENDINGS = ["stories that connect.", "campaigns that convert.", "communities that last.", "brands people trust."];
const TYPE_MS = 62;
const ERASE_MS = 34;
const HOLD_MS = 1700;

export function TypewriterSection() {
  const root = useRef<HTMLElement>(null);
  const [text, setText] = useState(ENDINGS[0]); // full first phrase until JS starts the loop (no empty flash)
  const [live, setLive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: "60px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live || reduced) return;
    let i = 0;
    let n = 0;
    let dir: 1 | -1 = -1; // start by erasing the pre-rendered phrase so the loop begins smoothly
    n = ENDINGS[0].length;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = ENDINGS[i];
      n += dir;
      setText(word.slice(0, n));
      if (dir === 1 && n >= word.length) {
        dir = -1;
        t = setTimeout(tick, HOLD_MS);
        return;
      }
      if (dir === -1 && n <= 0) {
        dir = 1;
        i = (i + 1) % ENDINGS.length;
        t = setTimeout(tick, 320);
        return;
      }
      t = setTimeout(tick, dir === 1 ? TYPE_MS : ERASE_MS);
    };
    t = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(t);
  }, [live, reduced]);

  return (
    <section ref={root} id="what-we-do" className="tw" aria-labelledby="tw-title">
      <div className="tw__wrap">
        <h2 id="tw-title" className="tw__title">
          <span className="sr-only">We turn complex ideas into stories that connect, campaigns that convert, communities that last and brands people trust.</span>
          <span aria-hidden="true">
            We turn complex ideas into{" "}
            <span className="tw__typed">
              {text}
              <i className="tw__caret" />
            </span>
          </span>
        </h2>
        <p className="tw__copy">
          Dedeepya Abbagani is a branding expert and strategy consultant. From FMCG campaigns to a 300K+ community, she helps brands find the right voice, say it clearly, and turn attention into real action.
        </p>
        <div className="tw__btns">
          <Link href={SITE_CONFIG.bookingCta.href} className="tw__btn tw__btn--solid">
            Book a Consultation <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
          </Link>
          <Link href="#work" className="tw__btn tw__btn--ghost">
            <Sparkles size={16} strokeWidth={2} aria-hidden="true" /> View Work
          </Link>
        </div>
      </div>
    </section>
  );
}
