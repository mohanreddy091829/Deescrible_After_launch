"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative bg-[#FCF3EC] py-10 sm:py-12 paper-grain"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-7 pb-8 border-b border-[#141211]/10">
          {/* Left: name, positioning, contact */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="font-serif text-xl text-[#141211] sm:text-2xl">Dedeepya Abbagani</p>
            <p className="mt-1 font-sans text-[13px] text-[#5A524B]">Branding Expert | Strategy Consultant | Storyteller</p>
            <div className="mt-4 flex flex-col gap-1.5 font-sans text-[13.5px] text-[#141211]">
              <a href={`mailto:${SITE_CONFIG.enquiryEmail}`} className="inline-flex items-center justify-center gap-2 hover:text-[#A51C27] md:justify-start"><Mail className="h-4 w-4" />{SITE_CONFIG.enquiryEmail}</a>
              <a href={SITE_CONFIG.phoneHref} className="inline-flex items-center justify-center gap-2 hover:text-[#A51C27] md:justify-start"><Phone className="h-4 w-4" />{SITE_CONFIG.phone}</a>
            </div>
          </div>

          {/* Middle: Professional Descriptor & Social Links */}
          <div className="flex flex-col items-center text-center">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#6B645D]">Follow along</span>
            <div className="mt-3 flex items-center gap-3">
              {/* Instagram SVG */}
              <Link
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#141211]/20 hover:border-[#141211] hover:bg-[#141211] hover:text-[#F8ECE2] text-[#141211] flex items-center justify-center transition-all duration-200"
                aria-label="Visit Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>

              {/* LinkedIn SVG */}
              <Link
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#141211]/20 hover:border-[#141211] hover:bg-[#141211] hover:text-[#F8ECE2] text-[#141211] flex items-center justify-center transition-all duration-200"
                aria-label="Visit LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>

              {/* YouTube SVG */}
              <Link
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#141211]/20 hover:border-[#141211] hover:bg-[#141211] hover:text-[#F8ECE2] text-[#141211] flex items-center justify-center transition-all duration-200"
                aria-label="Visit YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>

              {/* Email */}
              <a
                href={`mailto:${SITE_CONFIG.enquiryEmail}`}
                className="w-8 h-8 rounded-full border border-[#141211]/20 hover:border-[#141211] hover:bg-[#141211] hover:text-[#F8ECE2] text-[#141211] flex items-center justify-center transition-all duration-200"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Location & Back to Top */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6B645D]">
              Based in Hyderabad
            </span>
            <span className="text-xs text-[#141211] font-medium mt-0.5">
              Open to global opportunities
            </span>

            <button
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#141211] hover:text-[#A51C27] transition-colors group focus:outline-hidden focus:ring-2 focus:ring-[#A51C27] rounded-full p-1"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <div className="w-7 h-7 rounded-full border border-[#141211]/20 group-hover:border-[#A51C27] group-hover:bg-[#A51C27] group-hover:text-white flex items-center justify-center transition-all">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Signature & Copyright Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B645D]">
          <p>
            © 2026 Dedeepya Abbagani. All rights reserved.
          </p>

          <div className="flex items-center gap-2 font-script text-lg text-[#141211]">
            <span>Still curious. Always creating. — Dedeepya</span>
            <span className="text-red-500">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
