import React from "react";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { HeroSection } from "@/components/hero/HeroSection";
import { BrandMarquee } from "@/components/brand-marquee/BrandMarquee";
import { HomeButton } from "@/components/utils/HomeButton";
import { LazySections } from "@/components/utils/LazySections";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8ECE2] text-[#141211] overflow-x-hidden selection:bg-[#C78B87]/30 selection:text-[#141211]">
      <ScrollToTop />
      <HomeButton />
      <HeroSection />
      <BrandMarquee />
      <LazySections />
    </main>
  );
}
