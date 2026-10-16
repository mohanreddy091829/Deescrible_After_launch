import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

/**
 * "Brands people trust": three static statements stacked in a centred stair. The longest sits in the middle at
 * full strength; the shorter ones step away above and below it at lower opacity.
 */
export function TypewriterSection() {
  return (
    <section id="what-we-do" className="tw" aria-labelledby="tw-title">
      <div className="tw__wrap">
        <p className="tw__kicker">What we do</p>
        <h2 id="tw-title" className="sr-only">Brands people trust. Communities that stay. Stories that sell.</h2>
        <ul className="tw__stack" aria-hidden="true">
          <li className="tw__line tw__line--top">Brands people <em>trust.</em></li>
          <li className="tw__line tw__line--mid">Communities that <em>stay.</em></li>
          <li className="tw__line tw__line--bot">Stories that <em>sell.</em></li>
        </ul>
        <p className="tw__copy">
          Brand voice, storytelling and community for consumer brands, B2B companies and founders. Trust first. Then distribution. Then scale.
        </p>
        <div className="tw__btns">
          <Link href={SITE_CONFIG.bookingCta.href} className="tw__btn tw__btn--solid">
            Get in touch <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
