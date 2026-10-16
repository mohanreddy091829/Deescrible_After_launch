"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, ImagePlus, Loader2, LogOut, Plus, Trash2 } from "lucide-react";
import type { Enquiry, EventItem, ReelEntry } from "@/lib/cms/types";

type Session = { configured: boolean; authed: boolean; storage: string; mode: "supabase" | "password" } | null;
type Tab = "events" | "reels" | "enquiries";

const box = "w-full rounded-xl border border-[#141211]/15 bg-white px-3.5 py-2.5 font-sans text-[14px] text-[#141211] placeholder:text-[#8a8179] focus:border-[#A51C27] focus:outline-none focus:ring-2 focus:ring-[#A51C27]/25";
const lab = "mb-1 block font-sans text-[12px] font-semibold text-[#2E2926]";
const btn = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A51C27] disabled:opacity-60";
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

async function api<T>(url: string, init?: RequestInit): Promise<{ ok: boolean; data: T & { error?: string } }> {
  const r = await fetch(url, init);
  return { ok: r.ok, data: (await r.json().catch(() => ({}))) as T & { error?: string } };
}

function ImagePicker({ value, onChange, aspect = "16/10" }: { value: string; onChange: (u: string) => void; aspect?: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  async function pick(file?: File) {
    if (!file) return;
    setBusy(true);
    setErr("");
    const fd = new FormData();
    fd.append("file", file);
    const { ok, data } = await api<{ url: string }>("/api/admin/upload", { method: "POST", body: fd });
    setBusy(false);
    if (ok && data.url) onChange(data.url);
    else setErr(data.error || "Upload failed.");
  }
  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-xl border border-dashed border-[#141211]/25 bg-[#F1DFD2]/50" style={{ aspectRatio: aspect }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value ? <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" /> : <span className="absolute inset-0 grid place-items-center font-sans text-[13px] text-[#6B645D]">No image yet</span>}
        {busy && <span className="absolute inset-0 grid place-items-center bg-white/70"><Loader2 className="h-5 w-5 animate-spin" /></span>}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <button type="button" onClick={() => ref.current?.click()} className={`${btn} border border-[#141211]/25 bg-white py-2 text-[#141211] hover:border-[#141211]`}>
          <ImagePlus className="h-4 w-4" /> {value ? "Replace image" : "Upload image"}
        </button>
        {value && <button type="button" onClick={() => onChange("")} className="font-sans text-[13px] text-[#6B645D] underline">Remove</button>}
        <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ""; }} />
      </div>
      {err && <p className="mt-1 font-sans text-[12px] text-[#b0262f]" role="alert">{err}</p>}
    </div>
  );
}

function Editor<T extends { id: string }>({ kind, blank, render, noun }: { kind: "events" | "reels"; blank: () => T; render: (it: T, set: (p: Partial<T>) => void) => React.ReactNode; noun: string }) {
  const [items, setItems] = useState<T[] | null>(null);
  const [dirty, setDirty] = useState(false);
  const [state, setState] = useState<"" | "saving" | "saved" | "error">("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api<{ items: T[] }>(`/api/admin/data/${kind}`).then(({ data }) => setItems(data.items ?? []));
  }, [kind]);

  const patch = (id: string, p: Partial<T>) => { setItems((l) => l && l.map((x) => (x.id === id ? { ...x, ...p } : x))); setDirty(true); setState(""); };
  async function save() {
    setState("saving");
    const { ok, data } = await api<{ items: T[] }>(`/api/admin/data/${kind}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items }) });
    if (ok) { setItems(data.items); setDirty(false); setState("saved"); setMsg(data.items.length === items?.length ? "" : "Some items were skipped because a required field was empty."); }
    else { setState("error"); setMsg(data.error || "Could not save."); }
  }

  if (!items) return <p className="py-10 text-center font-sans text-sm text-[#6B645D]"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></p>;
  return (
    <div>
      <div className="sticky top-0 z-10 -mx-5 mb-5 flex flex-wrap items-center gap-3 border-b border-[#141211]/10 bg-[#F8ECE2]/95 px-5 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
        <button onClick={() => { setItems((l) => [blank(), ...(l ?? [])]); setDirty(true); setState(""); }} className={`${btn} border border-[#141211]/25 bg-white text-[#141211] hover:border-[#141211]`}><Plus className="h-4 w-4" /> Add {noun}</button>
        <button onClick={save} disabled={!dirty || state === "saving"} className={`${btn} bg-[#141211] text-white hover:bg-[#7a1018]`}>
          {state === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Publish changes
        </button>
        <span className="font-sans text-[13px] text-[#6B645D]" role="status">
          {dirty ? "Unsaved changes" : state === "saved" ? "Live on the site" : ""}{state === "error" && <span className="text-[#b0262f]">{msg}</span>}{state === "saved" && msg && ` · ${msg}`}
        </span>
      </div>
      {items.length === 0 && <p className="rounded-2xl border border-dashed border-[#141211]/20 p-8 text-center font-sans text-sm text-[#6B645D]">Nothing here yet. Click “Add {noun}”.</p>}
      <ul className="space-y-5">
        {items.map((it) => (
          <li key={it.id} className="rounded-2xl border border-[#141211]/10 bg-white/80 p-4 sm:p-5">
            {render(it, (p) => patch(it.id, p))}
            <div className="mt-4 flex justify-end">
              <button onClick={() => { if (confirm(`Delete this ${noun}? It disappears from the site after you publish.`)) { setItems((l) => l && l.filter((x) => x.id !== it.id)); setDirty(true); setState(""); } }} className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#b0262f] hover:underline">
                <Trash2 className="h-4 w-4" /> Delete {noun}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const today = () => new Date().toISOString().slice(0, 10);

function Events() {
  return (
    <Editor<EventItem>
      kind="events"
      noun="event"
      blank={() => ({ id: uid(), title: "", date: today(), time: "", location: "", description: "", image: "", link: "", linkLabel: "", published: true })}
      render={(e, set) => (
        <div className="grid gap-5 md:grid-cols-[280px_1fr]">
          <ImagePicker value={e.image} onChange={(image) => set({ image })} />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className={lab}>Event title *</label><input className={box} maxLength={140} value={e.title} onChange={(x) => set({ title: x.target.value })} placeholder="e.g. Deescribble Women's Meetup" /></div>
            <div><label className={lab}>Date *</label><input type="date" className={box} value={e.date} onChange={(x) => set({ date: x.target.value })} /></div>
            <div><label className={lab}>Time</label><input className={box} maxLength={40} value={e.time} onChange={(x) => set({ time: x.target.value })} placeholder="5:00 PM" /></div>
            <div className="sm:col-span-2"><label className={lab}>Location</label><input className={box} maxLength={140} value={e.location} onChange={(x) => set({ location: x.target.value })} placeholder="Venue, Hyderabad" /></div>
            <div className="sm:col-span-2"><label className={lab}>Description</label><textarea rows={3} className={`${box} resize-y`} maxLength={1200} value={e.description} onChange={(x) => set({ description: x.target.value })} /></div>
            <div><label className={lab}>Button link (RSVP, tickets…)</label><input className={box} maxLength={500} value={e.link} onChange={(x) => set({ link: x.target.value })} placeholder="https://" /></div>
            <div><label className={lab}>Button text</label><input className={box} maxLength={40} value={e.linkLabel} onChange={(x) => set({ linkLabel: x.target.value })} placeholder="Reserve a seat" /></div>
            <label className="flex items-center gap-2 font-sans text-[14px] text-[#141211] sm:col-span-2"><input type="checkbox" checked={e.published} onChange={(x) => set({ published: x.target.checked })} className="h-4 w-4 accent-[#A51C27]" /> Show on the website</label>
          </div>
        </div>
      )}
    />
  );
}

function Reels() {
  return (
    <Editor<ReelEntry>
      kind="reels"
      noun="reel"
      blank={() => ({ id: uid(), title: "", url: "", image: "", stat: "" })}
      render={(r, set) => (
        <div className="grid gap-5 md:grid-cols-[160px_1fr]">
          <ImagePicker value={r.image} onChange={(image) => set({ image })} aspect="9/16" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className={lab}>Instagram reel link *</label><input className={box} maxLength={500} value={r.url} onChange={(x) => set({ url: x.target.value })} placeholder="https://www.instagram.com/reel/…" /></div>
            <div><label className={lab}>Title</label><input className={box} maxLength={100} value={r.title} onChange={(x) => set({ title: x.target.value })} placeholder="Short title" /></div>
            <div><label className={lab}>Views / note</label><input className={box} maxLength={40} value={r.stat} onChange={(x) => set({ stat: x.target.value })} placeholder="2.4M views" /></div>
            <p className="font-sans text-[12px] leading-relaxed text-[#6B645D] sm:col-span-2">Upload a screenshot or cover of the reel (vertical works best). Once at least one reel is published here, the website shows these instead of the quote cards.</p>
          </div>
        </div>
      )}
    />
  );
}

function Enquiries() {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  useEffect(() => { api<{ items: Enquiry[] }>("/api/admin/data/enquiries").then(({ data }) => setRows(data.items ?? [])); }, []);
  if (!rows) return <p className="py-10 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></p>;
  if (!rows.length) return <p className="rounded-2xl border border-dashed border-[#141211]/20 p-8 text-center font-sans text-sm text-[#6B645D]">No enquiries yet. Every form submission is saved here as a backup.</p>;
  return (
    <ul className="space-y-4">
      {rows.map((e) => (
        <li key={e.id} className="rounded-2xl border border-[#141211]/10 bg-white/80 p-4 font-sans text-[14px] sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <b className="text-[16px]">{e.name}</b><span className="text-[12px] text-[#6B645D]">{new Date(e.at).toLocaleString("en-IN")}</span>
          </div>
          <p className="mt-1 text-[#2E2926]">{e.company} · {e.service}</p>
          <p className="mt-1"><a className="text-[#A51C27] underline" href={`mailto:${e.email}`}>{e.email}</a> · <a className="underline" href={`tel:${e.phone.replace(/\s/g, "")}`}>{e.phone}</a>{e.web && <> · <a className="underline" href={e.web} target="_blank" rel="noopener noreferrer">website</a></>}</p>
          <p className="mt-2 whitespace-pre-line text-[#2E2926]">{e.message}</p>
          <button onClick={async () => { if (confirm("Delete this enquiry?")) { await api(`/api/admin/data/enquiries?id=${e.id}`, { method: "DELETE" }); setRows((l) => l && l.filter((x) => x.id !== e.id)); } }} className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#b0262f] hover:underline"><Trash2 className="h-4 w-4" /> Delete</button>
        </li>
      ))}
    </ul>
  );
}

function Login({ onDone, configured, mode }: { onDone: () => void; configured: boolean; mode: "supabase" | "password" }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function go(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { ok, data } = await api("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password: pw }) });
    setBusy(false);
    if (ok) onDone();
    else setErr(data.error || "Could not log in.");
  }
  return (
    <form onSubmit={go} className="mx-auto mt-24 w-full max-w-sm rounded-[24px] border border-[#141211]/10 bg-white/85 p-7 shadow-[0_30px_60px_-40px_rgba(90,11,18,.45)]">
      <h1 className="font-serif text-3xl text-[#141211]">Admin login</h1>
      <p className="mt-1 font-sans text-[14px] text-[#5A524B]">Update events and reels on the website.</p>
      {!configured && <p className="mt-4 rounded-xl bg-[#F1DFD2] p-3 font-sans text-[13px] text-[#2E2926]">The admin is locked until the admin settings (<code>SESSION_SECRET</code> and the login settings) are set on the server.</p>}
      {mode === "supabase" && (
        <>
          <label className={`${lab} mt-5`} htmlFor="em">Email</label>
          <input id="em" type="email" autoFocus autoComplete="username" className={box} value={email} onChange={(e) => setEmail(e.target.value)} />
        </>
      )}
      <label className={`${lab} mt-5`} htmlFor="pw">Password</label>
      <input id="pw" type="password" autoFocus={mode !== "supabase"} autoComplete="current-password" className={box} value={pw} onChange={(e) => setPw(e.target.value)} />
      {err && <p className="mt-2 font-sans text-[13px] text-[#b0262f]" role="alert">{err}</p>}
      <button disabled={busy || !pw || (mode === "supabase" && !email)} className={`${btn} mt-5 w-full bg-[#141211] text-white hover:bg-[#7a1018]`}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log in"}</button>
    </form>
  );
}

export function AdminApp() {
  const [s, setS] = useState<Session>(null);
  const [tab, setTab] = useState<Tab>("events");
  const load = useCallback(() => { api<NonNullable<Session>>("/api/admin/session").then(({ data }) => setS(data)); }, []);
  useEffect(load, [load]);

  return (
    <main className="min-h-screen bg-[#F8ECE2] px-5 pb-24 pt-6 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 font-sans text-sm text-[#5A524B] hover:text-[#141211]"><ArrowLeft className="h-4 w-4" /> Back to site</Link>
          {s?.authed && (
            <button onClick={async () => { await api("/api/admin/logout", { method: "POST" }); load(); }} className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#141211] hover:text-[#A51C27]"><LogOut className="h-4 w-4" /> Log out</button>
          )}
        </div>
        {!s ? <p className="py-24 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></p> : !s.authed ? (
          <Login onDone={load} configured={s.configured} mode={s.mode} />
        ) : (
          <>
            <h1 className="mt-8 font-serif text-4xl text-[#141211]">Website admin</h1>
            {s.storage === "local-disk" && process.env.NODE_ENV === "production" && <p className="mt-3 rounded-xl bg-[#F1DFD2] p-3 font-sans text-[13px]">Changes are saved to this server&apos;s disk. Connect Supabase so they are backed up and survive redeploys.</p>}
            <div role="tablist" className="mt-6 flex gap-2 overflow-x-auto pb-1">
              {(["events", "reels", "enquiries"] as Tab[]).map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`shrink-0 rounded-full border px-5 py-2 font-sans text-sm font-semibold capitalize transition ${tab === t ? "border-[#141211] bg-[#141211] text-[#F8ECE2]" : "border-[#141211]/20 bg-white/70 text-[#2E2926] hover:border-[#141211]"}`}>{t}</button>
              ))}
            </div>
            <div className="mt-6">{tab === "events" ? <Events /> : tab === "reels" ? <Reels /> : <Enquiries />}</div>
          </>
        )}
      </div>
    </main>
  );
}
