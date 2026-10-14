import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { CtaHeadline } from "./CtaHeadline";

/** Closing call to action. The booking form itself lives on /consultation. */
export function ConsultationCta() {
  return (
    <section id="cta" className="cta" aria-labelledby="cta-title">
      <div className="cta__glow" aria-hidden="true" />
      <div className="cta__wrap">
        <p className="cta__eyebrow">Work together</p>
        <div id="cta-title"><CtaHeadline /></div>
        <p className="cta__copy">If you&apos;re building a brand, shaping a story or starting a bigger conversation, let&apos;s talk.</p>
        <Link href={SITE_CONFIG.bookingCta.href} className="cta__btn">
          <span>{SITE_CONFIG.bookingCta.label}</span>
          <span className="cta__arrow" aria-hidden="true"><ArrowUpRight size={22} strokeWidth={2} /></span>
        </Link>
        <svg className="cta__badge" viewBox="0 0 120 120" aria-hidden="true">
          <defs><path id="cta-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
          <text><textPath href="#cta-circle">Book a consultation • Book a consultation • </textPath></text>
        </svg>
      </div>
    </section>
  );
}
