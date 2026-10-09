import React from "react";
import Image from "next/image";
import { BrushCanvas } from "./BrushCanvas";
import { HeroNav } from "./HeroNav";
import { SITE_CONFIG } from "@/data/site-config";

/**
 * Minimal editorial hero. Everything except the portrait is live type / code:
 * canvas brush strokes, CSS-animated headline, liquid-glass navigation.
 * Entrance choreography is pure CSS so nothing is hidden waiting on JavaScript.
 */
export function HeroSection() {
  const [first, last] = SITE_CONFIG.name.toUpperCase().split(" ");

  return (
    <section id="hero" className="hero" aria-label={`Hero — ${SITE_CONFIG.name}`}>
      <div className="hero__stage">
        <BrushCanvas className="hero__canvas" />

        <div className="hero__box">
          <div className="hero__portrait">
            <Image
              src="/assets/hero/portrait.webp"
              alt="Dedeepya Abbagani looking upward with a confident smile"
              width={1367}
              height={1150}
              priority
              quality={92}
              sizes="(max-width: 899px) 84vw, 40vw"
            />
          </div>

          <h1 className="hero__name" aria-label={SITE_CONFIG.name}>
            <span className="hero__line" aria-hidden="true"><span>{first}</span></span>
            <span className="hero__line" aria-hidden="true"><span>{last}</span></span>
          </h1>

          <div className="hero__intro">
            <p className="hero__role">
              Branding Expert &amp;
              <br />
              Strategy Consultant
            </p>
            <span className="hero__rule" aria-hidden="true" />
            <p className="hero__lede">
              Turning complex ideas into stories that connect, convert and create real impact.
            </p>
          </div>

          <HeroNav />
        </div>
      </div>
    </section>
  );
}
