import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { CtaHeadline } from "./CtaHeadline";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WHATSAPP_URL } from "@/lib/whatsapp";

/** Closing call to action. The booking form itself lives on /consultation. */
export function ConsultationCta() {
  return (
    <section id="cta" className="cta" aria-labelledby="cta-title">
      <div className="cta__glow" aria-hidden="true" />
      <div className="cta__wrap">
        <p className="cta__eyebrow">Work together</p>
        <div id="cta-title"><CtaHeadline /></div>
        <div className="cta__actions">
          <Link href={SITE_CONFIG.bookingCta.href} className="cta__btn">
            <span>{SITE_CONFIG.bookingCta.label}</span>
            <span className="cta__arrow" aria-hidden="true"><ArrowUpRight size={22} strokeWidth={2} /></span>
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cta__wa" aria-label="Start a WhatsApp chat with Dedeepya (opens in a new tab)">
            <WhatsAppIcon className="h-6 w-6" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
        <div className="cta__badge" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs><path id="cta-circle" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0" /></defs>
            <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.8" />
            <text><textPath href="#cta-circle" textLength="294.5" lengthAdjust="spacing">Story • Strategy • Community • </textPath></text>
          </svg>
          <b>D</b>
        </div>
      </div>
    </section>
  );
}
