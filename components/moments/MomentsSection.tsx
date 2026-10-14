"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MOMENTS, type MomentCard } from "@/data/moments";
import { SITE_CONFIG } from "@/data/site-config";

const CYCLE_MS = 3200;

/** One tilted photo card. Its pictures are stacked and cross-fade on their own timer, offset per card. */
function Card({ card, index, live }: { card: MomentCard; index: number; live: boolean }) {
  const [on, setOn] = useState(0);
  const n = card.images.length;

  useEffect(() => {
    if (!live || n < 2) return;
    let iv: ReturnType<typeof setInterval>;
    // stagger starts so the cards never change in unison
    const t = setTimeout(() => {
      iv = setInterval(() => setOn((v) => (v + 1) % n), CYCLE_MS);
    }, 500 + index * 650);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [live, n, index]);

  const style = { "--x": card.x, "--y": card.y, "--z": card.z, "--r": `${card.r}deg`, "--rm": `${card.rm}deg`, ...(card.w ? { "--w": card.w } : {}) } as React.CSSProperties;

  return (
    <figure className="mo-card" style={style} tabIndex={0} aria-label={card.label}>
      <div className="mo-card__pic">
        {card.images.map((im, k) => (
          <Image
            key={im.src}
            src={im.src}
            alt={k === on ? im.alt : ""}
            aria-hidden={k !== on}
            fill
            quality={78}
            sizes="(max-width: 899px) 46vw, 300px"
            loading={index < 3 && k === 0 ? "eager" : "lazy"}
            className={k === on ? "is-on" : ""}
            draggable={false}
          />
        ))}
      </div>
      <figcaption>{card.label}</figcaption>
    </figure>
  );
}

export function MomentsSection() {
  const root = useRef<HTMLElement>(null);
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
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="moments" ref={root} className="mo" aria-labelledby="mo-title">
      <div className="mo__head">
        <h2 id="mo-title" className="mo__title">About Me</h2>
        <p className="mo__sub">{SITE_CONFIG.bioSummary}</p>
        <p className="mo__tag">Stories, stages and places that shaped the work</p>
      </div>
      <div className="mo__fan">
        {MOMENTS.map((c, i) => (
          <Card key={c.label} card={c} index={i} live={live && !reduced} />
        ))}
      </div>
    </section>
  );
}
