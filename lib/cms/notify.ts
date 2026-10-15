import "server-only";
import type { Enquiry } from "./types";

/**
 * Delivery of a new enquiry. Every channel is optional and independent:
 *  - Gmail:    GMAIL_USER + GMAIL_APP_PASSWORD (a Google "app password"), mail goes to NOTIFY_EMAIL (default GMAIL_USER)
 *  - WhatsApp: CALLMEBOT_PHONE + CALLMEBOT_APIKEY (free CallMeBot link to the owner's own WhatsApp number)
 */
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function sendEmail(e: Enquiry): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return false;
  try {
    const nodemailer = await import("nodemailer");
    const t = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    const rows: [string, string][] = [["Name", e.name], ["Email", e.email], ["Company / brand", e.company], ["Mobile", e.phone], ["Service", e.service], ["Website", e.web || "-"], ["Brief", e.message]];
    await t.sendMail({
      from: `"Website enquiry" <${user}>`,
      to: process.env.NOTIFY_EMAIL || user,
      replyTo: e.email,
      subject: `New enquiry: ${e.name} (${e.service})`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`,
    });
    return true;
  } catch {
    return false;
  }
}

export async function sendWhatsApp(e: Enquiry): Promise<boolean> {
  const phone = process.env.CALLMEBOT_PHONE;
  const key = process.env.CALLMEBOT_APIKEY;
  if (!phone || !key) return false;
  try {
    const text = `New enquiry\n${e.name} (${e.company})\n${e.phone} | ${e.email}\n${e.service}\n\n${e.message}`.slice(0, 900);
    const r = await fetch(`https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(key)}`, { signal: AbortSignal.timeout(8000) });
    return r.ok;
  } catch {
    return false;
  }
}
