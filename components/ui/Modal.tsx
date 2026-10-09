"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  /** No title bar or padding: the children own the whole panel. */
  bare?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "2xl",
  bare = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-4xl",
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Dialog Window"}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full ${maxWidthClass} max-h-[90vh] overflow-y-auto bg-[#FAF8F3] border border-[#242321]/15 rounded-2xl shadow-2xl ${bare ? "p-0" : "p-6 sm:p-8"} text-[#242321] transition-transform duration-200 scale-100 outline-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper tape accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-6 bg-[#D5AA67]/35 border border-[#242321]/10 rounded-xs rotate-[-1deg] pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full ${bare ? "bg-white/85 text-[#242321] hover:bg-white shadow-sm" : "text-[#716D66] hover:text-[#242321] hover:bg-[#EFE7D8]"} transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#D5AA67]`}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {title && !bare && (
          <div className="mb-6 pr-8 border-b border-[#242321]/10 pb-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#242321] tracking-tight">
              {title}
            </h3>
          </div>
        )}

        <div className={bare ? "" : "mt-2"}>{children}</div>
      </div>
    </div>
  );
}
