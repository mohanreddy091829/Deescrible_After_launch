import React from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroNav } from "./HeroNav";
import { SITE_CONFIG } from "@/data/site-config";

const STATS = [
  { v: "300K+", l: "Followers" },
  { v: "30M+", l: "Views" },
  { v: "11M+", l: "Interactions" },
];

/**
 * Hero: a calm cream editorial side (headline, halftone name, proof numbers) facing a deep Deescribble-red
 * panel that carries the portrait in an offset frame, with a rotating badge and fine geometric marks.
 * Everything but the photograph is live code; entrance motion is CSS-only.
 */
export function HeroSection() {
  const [first, ...rest] = SITE_CONFIG.name.split(" ");
  const last = rest.join(" ");

  return (
    <section id="hero" className="rh" aria-label={`Hero — ${SITE_CONFIG.name}`}>
      <div className="rh__stage">
        <div className="rh__light" aria-hidden="true" />
        <div className="rh__red" aria-hidden="true" />

        <HeroNav />

        <div className="rh__copy">
          <p className="rh__eyebrow">
            <span className="rh__dot" aria-hidden="true" /> Brand storyteller <i>/</i> Community builder <span className="rh__loc"><i>/</i> Hyderabad</span>
          </p>
          <h1 className="rh__role">
            <span className="rh__role1"><span><b>Branding</b> <u>Expert</u></span></span>
            <span className="rh__role2"><span><i>&amp;</i> Strategy Consultant</span></span>
          </h1>
          <p className="rh__title">
            Stories that <em>build brands.</em>
          </p>
          <p className="rh__lede">From political war rooms to HUL brands to 300K+ followers on Deescribble.</p>
          <a href="#work" className="rh__cta rh__cta--solid">
            See my work <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>


        <dl className="rh__stats" aria-label="Deescribble in numbers">
          {STATS.map((s) => (
            <div key={s.l}>
              <dd>{s.v}</dd>
              <dt>{s.l}</dt>
            </div>
          ))}
        </dl>

        <div className="rh__art" aria-hidden="true">
          <span className="rh__dots" />
          <span className="rh__frame" />
          <svg className="rh__zig" viewBox="0 0 60 40" fill="none"><path d="M2 38V26H16V14H30V2H58" stroke="currentColor" strokeWidth="1.4" /></svg>
          <span className="rh__diamonds"><i /><i /><i /></span>
        </div>

        <figure className="rh__photo">
          <Image
            src="/assets/hero/dedeepya-hero.webp"
            alt="Dedeepya smiling, arms crossed, seated in front of a wooden desk with small painted canvases"
            width={2448}
            height={2570}
            priority
            quality={85}
            sizes="(max-width: 899px) 82vw, 38vw"
          />
          <figcaption className="rh__nm">
            <span className="rh__nm1">{first}</span>
            <span className="rh__nm2">{last}</span>
          </figcaption>
        </figure>

        <div className="rh__badge" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs><path id="rh-badge-path" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
            <text><textPath href="#rh-badge-path" textLength="284" lengthAdjust="spacing">Story • Strategy • Community • </textPath></text>
          </svg>
          <b>D</b>
        </div>

        <a href="#brands" className="rh__scroll" aria-label="Scroll to the next section">
          <span>Scroll</span>
          <ArrowDown size={14} strokeWidth={1.6} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
