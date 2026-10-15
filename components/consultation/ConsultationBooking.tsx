"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { COUNTRY_CODES, SERVICES } from "@/lib/enquiry";

const input =
  "w-full rounded-xl border border-[#141211]/14 bg-white px-4 py-3 font-sans text-[15px] text-[#141211] placeholder:text-[#8a8179] transition focus:border-[#A51C27] focus:outline-none focus:ring-2 focus:ring-[#A51C27]/25 aria-[invalid=true]:border-[#c4313c]";
const label = "mb-1.5 block font-sans text-[13px] font-semibold text-[#2E2926]";

type Status = "idle" | "sending" | "done" | "error";

export function ConsultationBooking() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [bad, setBad] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [wa, setWa] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = Object.fromEntries(new FormData(f).entries()) as Record<string, string>;
    const invalid = ["name", "email", "company", "phone", "service", "message"].filter((k) => !d[k]?.trim());
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) invalid.push("email");
    if (d.phone && !/^[\d\s-]{6,18}$/.test(d.phone.trim())) invalid.push("phone");
    setBad(invalid);
    if (invalid.length) {
      f.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setMsg("");
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      const j = (await r.json().catch(() => ({}))) as { success?: boolean; error?: string; whatsapp?: string };
      if (!r.ok || !j.success) throw new Error(j.error || "failed");
      setWa(j.whatsapp || "");
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setMsg(err instanceof Error && err.message !== "failed" ? err.message : "Your message could not be sent. Please try again.");
      setStatus("error");
    }
  }

  const aria = (k: string) => ({ "aria-invalid": bad.includes(k) || undefined });

  return (
    <section id="booking" className="relative bg-[#F8ECE2] pb-20 pt-6 sm:pb-28" aria-label="Enquiry form">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <div className="rounded-[24px] border border-[#141211]/[0.08] bg-white/80 p-6 shadow-[0_30px_60px_-40px_rgba(90,11,18,.45)] sm:p-9">
          {status === "done" ? (
            <div className="space-y-4 py-8 text-center" role="status">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#A51C27]" />
              <h2 className="font-serif text-3xl text-[#141211]">Message sent</h2>
              <p className="mx-auto max-w-sm font-sans text-[15px] leading-relaxed text-[#2E2926]">Thank you. Your details have reached Dedeepya&apos;s inbox and she will reply soon.</p>
              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1f8f4e] px-5 py-2.5 font-sans text-sm font-bold text-white hover:bg-[#177a41]">
                    <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
                  </a>
                )}
                <button
                  onClick={() => {
                    setStatus("idle");
                    form.current?.reset();
                  }}
                  className="font-sans text-sm text-[#6B645D] underline hover:text-[#141211]"
                >
                  Send another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form ref={form} onSubmit={submit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="f-name">Full name</label>
                  <input id="f-name" name="name" type="text" required autoComplete="name" maxLength={100} placeholder="Your full name" className={input} {...aria("name")} />
                </div>
                <div>
                  <label className={label} htmlFor="f-email">Email address</label>
                  <input id="f-email" name="email" type="email" required autoComplete="email" maxLength={160} placeholder="you@company.com" className={input} {...aria("email")} />
                </div>
              </div>

              <div>
                <label className={label} htmlFor="f-company">Company / brand name</label>
                <input id="f-company" name="company" type="text" required autoComplete="organization" maxLength={120} placeholder="Your company or brand" className={input} {...aria("company")} />
              </div>

              <div>
                <label className={label} htmlFor="f-phone">Mobile number</label>
                <div className="flex gap-2">
                  <select name="countryCode" aria-label="Country code" defaultValue="+91" className={`${input.replace("w-full", "w-[8.75rem]")} shrink-0 px-3`}>
                    {COUNTRY_CODES.map(([c, n]) => (
                      <option key={c} value={c}>{c} {n}</option>
                    ))}
                  </select>
                  <input id="f-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel-national" maxLength={18} placeholder="Mobile number" className={`${input} min-w-0 flex-1`} {...aria("phone")} />
                </div>
              </div>

              <div>
                <label className={label} htmlFor="f-service">What do you need?</label>
                <select id="f-service" name="service" required defaultValue="" className={input} {...aria("service")}>
                  <option value="" disabled>Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={label} htmlFor="f-web">
                  Current web presence <span className="ml-1 rounded-full bg-[#F1DFD2] px-2 py-0.5 text-[11px] font-medium text-[#6B645D]">Optional</span>
                </label>
                <input id="f-web" name="web" type="text" inputMode="url" autoComplete="url" maxLength={300} placeholder="yourwebsite.com or Instagram link" className={input} />
              </div>

              <div>
                <label className={label} htmlFor="f-message">Brief</label>
                <textarea id="f-message" name="message" rows={5} required maxLength={3000} placeholder="Tell me what you are building, what you need help with and your timeline." className={`${input} resize-none`} {...aria("message")} />
              </div>

              {/* honeypot: hidden from people, tempting to bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>Leave this empty<input type="text" name="website2" tabIndex={-1} autoComplete="off" /></label>
              </div>

              {bad.length > 0 && <p className="font-sans text-[13px] font-medium text-[#b0262f]" role="alert">Please complete the highlighted fields.</p>}
              {status === "error" && (
                <p className="font-sans text-[13px] font-medium text-[#b0262f]" role="alert">
                  {msg} You can also email{" "}
                  <a className="underline" href={`mailto:${SITE_CONFIG.enquiryEmail}`}>{SITE_CONFIG.enquiryEmail}</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#141211] px-6 py-3.5 font-sans text-[15px] font-bold text-white transition hover:bg-[#7a1018] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27] disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending</>) : (<>Send enquiry <ArrowRight className="h-4 w-4" strokeWidth={2.4} /></>)}
              </button>
              <p className="text-center font-sans text-xs text-[#6B645D]">Your details go straight to Dedeepya&apos;s inbox. They are never shared.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
