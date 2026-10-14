"use client";

import dynamic from "next/dynamic";

// Below-the-fold sections are split into their own chunks (still server-rendered for SEO) so the hero hydrates first.
const JourneySection = dynamic(() => import("@/components/journey/JourneySection").then((m) => m.JourneySection));
const ExpertiseSection = dynamic(() => import("@/components/expertise/ExpertiseSection").then((m) => m.ExpertiseSection));
const SelectedWorkSection = dynamic(() => import("@/components/selected-work/SelectedWorkSection").then((m) => m.SelectedWorkSection));
const DeescribbleSection = dynamic(() => import("@/components/deescribble/DeescribbleSection").then((m) => m.DeescribbleSection));
const StoriesSection = dynamic(() => import("@/components/stories-beyond-brands/StoriesSection").then((m) => m.StoriesSection));
const MomentsSection = dynamic(() => import("@/components/moments/MomentsSection").then((m) => m.MomentsSection));
const BookingSection = dynamic(() => import("@/components/booking/BookingSection").then((m) => m.BookingSection));
const Footer = dynamic(() => import("@/components/footer/Footer").then((m) => m.Footer));

export function LazySections() {
  return (
    <>
      <JourneySection />
      <ExpertiseSection />
      <SelectedWorkSection />
      <DeescribbleSection />
      <StoriesSection />
      <MomentsSection />
      <BookingSection />
      <Footer />
    </>
  );
}
