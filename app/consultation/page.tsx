import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConsultationBooking } from "@/components/consultation/ConsultationBooking";

export const metadata: Metadata = {
  title: "Book a consultation",
  description: "Book a consultation with Dedeepya Abbagani to talk about your brand, story or strategy.",
  alternates: { canonical: "/consultation" },
};

export default function ConsultationPage() {
  return (
    <>
      <header className="consult">
        <div className="consult__bar">
          <Link href="/" className="consult__back"><ArrowLeft size={16} aria-hidden="true" /> Back to site</Link>
          <span className="consult__mark">Dedeepya Abbagani</span>
        </div>
        <div className="consult__hero">
          <p className="consult__eyebrow">Book a consultation</p>
          <h1 className="consult__title">
            Let&apos;s talk about
            <em> what comes next.</em>
          </h1>
          <p className="consult__copy">Choose a time, tell me a little about what you&apos;re building, and we&apos;ll take it from there.</p>
        </div>
      </header>
      <main id="main">
        <ConsultationBooking />
      </main>
    </>
  );
}
