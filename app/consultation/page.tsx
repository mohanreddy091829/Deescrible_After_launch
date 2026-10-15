import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConsultationBooking } from "@/components/consultation/ConsultationBooking";

export const metadata: Metadata = {
  title: "Get in touch",
  description: "Tell Dedeepya about your brand, story or strategy and she will get back to you.",
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
          <p className="consult__eyebrow">Get in touch</p>
          <h1 className="consult__title">
            Let&apos;s talk about
            <em> what comes next.</em>
          </h1>
          <p className="consult__copy">Share a few details about what you&apos;re building and I&apos;ll get back to you personally.</p>
        </div>
      </header>
      <main id="main">
        <ConsultationBooking />
      </main>
    </>
  );
}
