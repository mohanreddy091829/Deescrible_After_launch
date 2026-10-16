import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { clientIp, limited, sameOrigin } from "@/lib/cms/auth";
import { readCollection, writeCollection } from "@/lib/cms/store";
import { sendEmail, sendWhatsApp } from "@/lib/cms/notify";
import { COUNTRY_CODES, SERVICES } from "@/lib/enquiry";
import type { Enquiry } from "@/lib/cms/types";

const s = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
  if (limited(`enquiry:${clientIp(req)}`, 5, 60 * 60 * 1000)) return Response.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });

  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return Response.json({ success: false, error: "Invalid request" }, { status: 400 });
  // honeypot: real visitors never see or fill this field; pretend success to bots
  if (s(b.website2, 100)) return Response.json({ success: true });

  const code = COUNTRY_CODES.some(([c]) => c === b.countryCode) ? String(b.countryCode) : "+91";
  const digits = s(b.phone, 20).replace(/[^\d]/g, "");
  const service = (SERVICES as readonly string[]).includes(String(b.service)) ? String(b.service) : "";
  const email = s(b.email, 160);
  let web = s(b.web, 300);
  if (web) {
    try {
      const u = new URL(/^https?:\/\//i.test(web) ? web : `https://${web}`);
      web = u.protocol === "http:" || u.protocol === "https:" ? u.toString() : "";
    } catch {
      web = "";
    }
  }
  const e: Enquiry = {
    id: crypto.randomBytes(6).toString("hex"),
    at: new Date().toISOString(),
    name: s(b.name, 100),
    email,
    company: s(b.company, 120),
    phone: `${code} ${digits}`,
    service,
    web,
    message: s(b.message, 3000),
  };
  if (!e.name || !e.company || !e.service || !e.message || digits.length < 6 || digits.length > 15 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ success: false, error: "Please fill in every required field correctly." }, { status: 400 });
  }

  // keep a copy first so no enquiry is lost even if email or WhatsApp is down
  let stored = false;
  try {
    const list = await readCollection<Enquiry[]>("enquiries", []);
    await writeCollection("enquiries", [e, ...list].slice(0, 300));
    stored = true;
  } catch {}
  const [mailed, whatsapped] = await Promise.all([sendEmail(e), sendWhatsApp(e)]);
  if (!stored && !mailed && !whatsapped) return Response.json({ success: false, error: "Could not send right now." }, { status: 502 });

  const wa = (process.env.WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");
  const whatsapp = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(`Hi Dedeepya, this is ${e.name} from ${e.company}. I just sent an enquiry about ${e.service}.`)}` : "";
  return Response.json({ success: true, whatsapp });
}
