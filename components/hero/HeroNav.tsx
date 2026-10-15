"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

/** Five section links, the consultation pill and a round menu button that opens the full-screen menu. */
export function HeroNav() {
  const [open, setOpen] = useState(false);
  // the menu is portalled to <body> so no section's overflow or stacking can clip it
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    const trigger = openRef.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <nav className="rh__nav" aria-label="Primary">
        <div className="rh__links">
          {SITE_CONFIG.heroNav.map((item) => (
            <Link key={item.label} href={item.href} className="rh__link">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="rh__navend">
          <Link href={SITE_CONFIG.bookingCta.href} className="rh__cta">
            Get in touch <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>
          <button ref={openRef} className="rh__menu" aria-label="Open menu" aria-expanded={open} aria-controls="rh-menu" onClick={() => setOpen(true)}>
            <Menu size={22} strokeWidth={1.6} />
          </button>
        </div>
      </nav>

      {mounted && createPortal(
      <div id="rh-menu" className="rh-sheet" data-open={open} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open} inert={!open}>
        <div className="rh-sheet__top">
          <span>Dedeepya Abbagani</span>
          <button ref={closeRef} className="rh__menu rh__menu--light" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X size={22} strokeWidth={1.6} />
          </button>
        </div>
        <div className="rh-sheet__links">
          {[...SITE_CONFIG.heroNav, { label: "HOME", href: "#hero" }].map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
        <Link href={SITE_CONFIG.bookingCta.href} className="rh__cta rh__cta--light" onClick={() => setOpen(false)}>
          Get in touch <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
        </Link>
        {/* quiet entrance to the website admin */}
        <Link href="/admin" className="rh-sheet__admin" onClick={() => setOpen(false)}>Admin login</Link>
      </div>,
        document.body,
      )}
    </>
  );
}
