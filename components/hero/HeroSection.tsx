import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { HeroNav } from "./HeroNav";
import { HeroName } from "./HeroName";
import { SITE_CONFIG } from "@/data/site-config";

/**
 * Editorial hero. Everything except the photograph is live code: tracked eyebrow, Didone title, the halftone
 * name (canvas), the curved red panel, vertical keywords and scroll cue. Entrance is CSS-only.
 */
export function HeroSection() {
  const [first, last] = SITE_CONFIG.name.toUpperCase().split(" ");

  return (
    <section id="hero" className="rh" aria-label={`Hero — ${SITE_CONFIG.name}`}>
      <div className="rh__stage">
        <div className="rh__light" aria-hidden="true" />

        <div className="rh__panel">
          <Image
            src="/assets/hero/dedeepya-red.webp"
            alt="Dedeepya Abbagani in dark sunglasses and a black top against a deep red studio backdrop"
            width={4043}
            height={4096}
            priority
            quality={75}
            sizes="(max-width: 899px) 120vw, 66vw"
            className="rh__photo"
          />
          <div className="rh__shade" aria-hidden="true" />
        </div>
        {/* thin arc: drawn over the red backdrop but masked by her silhouette, so it passes behind her */}
        <svg className="rh__arc" viewBox="0 0 155.4 155.4" aria-hidden="true">
          <circle cx="77.7" cy="77.7" r="68" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>

        <HeroNav />

        <div className="rh__copy">
          <p className="rh__eyebrow">Brands <i>/</i> Strategy <i>/</i> Storytelling</p>
          <p className="rh__title">
            Branding Expert &amp;
            <em>Strategy Consultant</em>
          </p>
          <span className="rh__rule" aria-hidden="true" />
          <p className="rh__lede">Turning complex ideas into stories that connect, convert and create real impact.</p>
          <a href={SITE_CONFIG.bookingCta.href} className="rh__cta rh__mcta">
            Book a Consultation <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <HeroName first={first} last={last} />

        <ul className="rh__keys" aria-label="Themes">
          <li>Ideas</li>
          <li>People</li>
          <li>Culture</li>
          <li>Impact</li>
        </ul>

        <a href="#brands" className="rh__scroll" aria-label="Scroll to the next section">
          <span className="rh__scrollring" aria-hidden="true"><b /></span>
          <span className="rh__scrolltext">Scroll</span>
        </a>
      </div>
    </section>
  );
}
