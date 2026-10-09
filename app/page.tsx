import React from "react";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { HeroSection } from "@/components/hero/HeroSection";
import { BrandMarquee } from "@/components/brand-marquee/BrandMarquee";
import { LazySections } from "@/components/utils/LazySections";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#242321] overflow-x-hidden selection:bg-[#D5AA67]/30 selection:text-[#242321]">
      <ScrollToTop />
      <HeroSection />
      <BrandMarquee />
      <LazySections />
    </main>
  );
}
