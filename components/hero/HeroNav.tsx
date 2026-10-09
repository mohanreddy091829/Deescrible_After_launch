"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NoiseBackground } from "@/components/ui/noise-background";
import { SITE_CONFIG } from "@/data/site-config";

/** Plain bold sans links + one highlighted "Book a Consultation" noise-gradient button. */
export function HeroNav() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  // The gradient runs a frame loop; stop it whenever the hero is scrolled out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <nav ref={ref} className="hero__nav" aria-label="Hero quick navigation">
      {SITE_CONFIG.quickNavLinks.map((item) => (
        <Link key={item.label} href={item.href} className="hero__link">
          {item.label}
        </Link>
      ))}

      <NoiseBackground
        containerClassName="hero__cta w-fit rounded-full p-[3px] !bg-neutral-900"
        gradientColors={["rgb(255, 100, 150)", "rgb(100, 150, 255)", "rgb(255, 200, 100)"]}
        animating={visible}
      >
        <Link
          href={SITE_CONFIG.bookingCta.href}
          className="flex h-full w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-black px-[1.15em] py-[0.8em] font-sans text-[length:inherit] font-bold tracking-[0.01em] text-white transition-transform duration-100 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0713a]"
        >
          {SITE_CONFIG.bookingCta.label}
          <ArrowRight className="size-[1.1em]" strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </NoiseBackground>
    </nav>
  );
}
