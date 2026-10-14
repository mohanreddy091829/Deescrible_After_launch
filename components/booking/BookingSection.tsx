"use client";

import React, { useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

const SERVICES = ["Brand strategy & campaigns", "Founder & personal branding", "Content strategy & storytelling", "Speaking & collaboration"];
const TYPES = ["General consultation (30 mins)", "Brand strategy advisory (45 mins)", "Founder narrative (45 mins)", "Speaking & documentary collaboration"];
const SLOTS = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const field =
  "w-full rounded-xl border border-[#141211]/12 bg-white/70 px-3.5 py-2.5 font-sans text-[13px] text-[#141211] placeholder:text-[#6B645D] focus:outline-none focus:ring-2 focus:ring-[#A51C27]/60";
const label = "mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#6B645D]";

export function BookingSection() {
  // Server renders a fixed start (Oct 2026); the browser swaps in the real "today" without a hydration mismatch.
  const nowMs = useSyncExternalStore(() => () => {}, () => Date.now() - (Date.now() % 86400000), () => Date.UTC(2026, 9, 9));
  const today = useMemo(() => new Date(nowMs), [nowMs]);
  const [pick, setPick] = useState<{ y: number; m: number } | null>(null);
  const view = useMemo(() => pick ?? { y: today.getFullYear(), m: today.getMonth() }, [pick, today]);
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState(SLOTS[1]);
  const [type, setType] = useState(TYPES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1).getDay();
    const n = new Date(view.y, view.m + 1, 0).getDate();
    return { first, n };
  }, [view]);

  const isPast = (d: number) => new Date(view.y, view.m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isWeekend = (d: number) => [0, 6].includes(new Date(view.y, view.m, d).getDay());
  const shift = (d: number) => { const t = new Date(view.y, view.m + d, 1); setPick({ y: t.getFullYear(), m: t.getMonth() }); };
  const canGoBack = view.y > today.getFullYear() || view.m > today.getMonth();
  const dateLabel = day ? `${MONTHS[view.m]} ${day}, ${view.y}` : "";

  return (
    <section id="booking" className="relative isolate overflow-hidden bg-[#F3E3CB] py-12 sm:py-16" aria-label="Let's talk and consultation booking">
      {/* 3200px sunset ghat; warm wash on the left, paper on the right so the card stays legible */}
      <Image src="/assets/letstalk/sunset-ghat.webp" alt="" fill quality={90} sizes="100vw" className="-z-20 object-cover object-[30%_40%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(247,235,214,.78)_0%,rgba(247,235,214,.55)_38%,rgba(250,246,238,.88)_70%,rgba(250,246,238,.96)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(247,235,214,.6),rgba(250,246,238,.92)_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 mix-blend-multiply" style={{ backgroundImage: "var(--paper-grain)" }} aria-hidden="true" />

      <div className="mx-auto grid max-w-[1360px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#2E2926]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A51C27]" />
            <span>06 / Let&apos;s work together</span>
          </div>
          <h2 className="font-serif text-[clamp(38px,4.8vw,68px)] font-normal leading-[1] tracking-[-0.03em] text-[#141211]">
            Let&apos;s create
            <br />
            <span className="italic">what&apos;s next.</span>
          </h2>
          <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-[#2e2b27]">
            If you&apos;re a brand, founder or fellow dreamer with a story idea — let&apos;s have a conversation.
          </p>
          <ul className="mt-5 space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s} className="flex items-center gap-3 font-sans text-[14px] font-medium text-[#141211]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#141211]/70 bg-white/40">
                  <ArrowRight className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {s}
              </li>
            ))}
          </ul>
          <p className="font-script mt-6 hidden -rotate-6 text-[26px] leading-[1.05] text-[#fff8ec] drop-shadow-[0_2px_6px_rgba(80,40,10,.6)] lg:block">
            Bigger
            <br />
            Stories
            <br />
            Ahead…
          </p>
        </div>

        <div className="relative rounded-[26px] border border-white/70 bg-[#fbf8f2]/90 p-5 shadow-[0_30px_60px_-30px_rgba(60,35,15,.55)] backdrop-blur-md sm:p-7">
          {done ? (
            <div className="space-y-4 py-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#A51C27]" />
              <h3 className="font-serif text-3xl text-[#141211]">Request received</h3>
              <p className="mx-auto max-w-sm font-sans text-sm leading-relaxed text-[#2E2926]">
                Thank you, <strong>{name}</strong>. Your request for <strong>{dateLabel} at {time}</strong> is ready to send. Tap below to email it to Dedeepya.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${SITE_CONFIG.enquiryEmail}?subject=${encodeURIComponent("Consultation request from " + name)}&body=${encodeURIComponent(`Type: ${type}\nDate: ${dateLabel} at ${time}\nEmail: ${email}\nContext: ${note}`)}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#141211] px-5 py-2.5 font-sans text-sm font-bold text-white hover:bg-[#2E2926]"
                >
                  <Mail className="h-4 w-4" /> Send by email
                </a>
                <button onClick={() => setDone(false)} className="font-sans text-xs text-[#6B645D] underline hover:text-[#141211]">Book another slot</button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (day) setDone(true); }}
              className="space-y-4"
            >
              <div>
                <h3 className="font-sans text-[22px] font-bold tracking-tight text-[#141211]">Book a consultation</h3>
                <p className="mt-0.5 font-sans text-[13px] text-[#5A524B]">Choose a time that works for you.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.05fr_1fr]">
                <div className="rounded-2xl border border-[#141211]/10 bg-white/60 p-3.5">
                  <div className="mb-2 flex items-center justify-between">
                    <button type="button" onClick={() => shift(-1)} disabled={!canGoBack} aria-label="Previous month" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#141211]/15 disabled:opacity-30">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-sans text-[13px] font-semibold text-[#141211]">{MONTHS[view.m]} {view.y}</span>
                    <button type="button" onClick={() => shift(1)} aria-label="Next month" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#141211]/15">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 text-center font-mono text-[10px] text-[#6B645D]">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className="py-1">{d}</span>)}
                  </div>
                  <div className="grid grid-cols-7 gap-y-0.5 text-center">
                    {Array.from({ length: cells.first }, (_, i) => <span key={`e${i}`} />)}
                    {Array.from({ length: cells.n }, (_, i) => {
                      const d = i + 1;
                      const off = isPast(d) || isWeekend(d);
                      const on = day === d;
                      return (
                        <button
                          key={d}
                          type="button"
                          disabled={off}
                          onClick={() => setDay(d)}
                          aria-pressed={on}
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full font-sans text-[12.5px] transition focus-visible:outline-2 focus-visible:outline-[#A51C27] ${
                            on ? "bg-[#141211] font-bold text-white" : off ? "text-[#b9b3a8]" : "font-medium text-[#141211] hover:bg-[#F1DFD2]"
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className={label} htmlFor="bk-type">Consultation type</label>
                    <select id="bk-type" value={type} onChange={(e) => setType(e.target.value)} className={field}>
                      {TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div role="group" aria-label="Time">
                    <span className={label}>Time</span>
                    <div className="grid grid-cols-2 gap-2">
                      {SLOTS.map((t) => (
                        <button key={t} type="button" onClick={() => setTime(t)} aria-pressed={time === t}
                          className={`rounded-xl border py-2 font-sans text-[12.5px] font-semibold transition focus-visible:outline-2 focus-visible:outline-[#A51C27] ${time === t ? "border-[#141211] bg-[#141211] text-white" : "border-[#141211]/12 bg-white/70 text-[#2E2926] hover:border-[#141211]/40"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="bk-name">Your name</label>
                  <input id="bk-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Radhika Sharma" className={field} autoComplete="name" />
                </div>
                <div>
                  <label className={label} htmlFor="bk-mail">Work email</label>
                  <input id="bk-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className={field} autoComplete="email" />
                </div>
              </div>
              <div>
                <label className={label} htmlFor="bk-note">Brief context (optional)</label>
                <input id="bk-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tell Dedeepya about your brand or goal…" className={field} />
              </div>

              <button type="submit" disabled={!day} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111] py-3.5 font-sans text-sm font-bold text-white transition hover:bg-[#2b2927] disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27]">
                {day ? `Confirm booking · ${MONTHS[view.m].slice(0, 3)} ${day}, ${time}` : "Pick a date to continue"} <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </form>
          )}
        </div>
      </div>
      <p className="relative mx-auto mt-4 max-w-[1360px] px-5 font-sans text-[10.5px] text-[#5A524B] sm:px-8">
        Photo: Sunset at Dr Rajendra Prasad Ghat by Jay.Jarosz, CC BY-SA 4.0, via Wikimedia Commons.
      </p>
    </section>
  );
}
