"use client";

import dynamic from "next/dynamic";
import { CardTransition } from "./CardTransition";

// Below-the-fold sections are split into their own chunks (still server-rendered for SEO) so the hero hydrates first.
const ExpertiseSection = dynamic(() => import("@/components/expertise/ExpertiseSection").then((m) => m.ExpertiseSection));
const DeescribbleSection = dynamic(() => import("@/components/deescribble/DeescribbleSection").then((m) => m.DeescribbleSection));
const TypewriterSection = dynamic(() => import("@/components/typewriter/TypewriterSection").then((m) => m.TypewriterSection));
const SelectedWorkSection = dynamic(() => import("@/components/selected-work/SelectedWorkSection").then((m) => m.SelectedWorkSection));
const JourneySection = dynamic(() => import("@/components/journey/JourneySection").then((m) => m.JourneySection));
const WritingSection = dynamic(() => import("@/components/writing/WritingSection").then((m) => m.WritingSection));
const StoriesSection = dynamic(() => import("@/components/stories-beyond-brands/StoriesSection").then((m) => m.StoriesSection));
const EventsSection = dynamic(() => import("@/components/events/EventsSection").then((m) => m.EventsSection));
const ConsultationCta = dynamic(() => import("@/components/cta/ConsultationCta").then((m) => m.ConsultationCta));
const Footer = dynamic(() => import("@/components/footer/Footer").then((m) => m.Footer));

/** Page order after the hero and the brand strip. */
export function LazySections() {
  return (
    <>
      <CardTransition><ExpertiseSection /></CardTransition>
      <CardTransition><DeescribbleSection /></CardTransition>
      <CardTransition><TypewriterSection /></CardTransition>
      <CardTransition><SelectedWorkSection /></CardTransition>
      <CardTransition><JourneySection /></CardTransition>
      <CardTransition><WritingSection /></CardTransition>
      <CardTransition><StoriesSection /></CardTransition>
      <CardTransition><EventsSection /></CardTransition>
      <CardTransition><ConsultationCta /></CardTransition>
      <CardTransition><Footer /></CardTransition>
    </>
  );
}
