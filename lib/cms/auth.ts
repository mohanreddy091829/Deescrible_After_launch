import "server-only";
import crypto from "node:crypto";
import type { NextRequest } from "next/server";

export const COOKIE = "dd_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

const secret = () => process.env.SESSION_SECRET || "";
const password = () => process.env.ADMIN_PASSWORD || "";

/** The CMS stays locked until both secrets are configured. */
export const adminConfigured = () => secret().length >= 16 && password().length >= 10;

const b64 = (b: Buffer) => b.toString("base64url");
const mac = (data: string) => b64(crypto.createHmac("sha256", secret()).update(data).digest());

export function checkPassword(input: string): boolean {
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(password()).digest();
  return crypto.timingSafeEqual(a, b);
}

export function makeToken(): string {
  const payload = b64(Buffer.from(JSON.stringify({ exp: Date.now() + MAX_AGE * 1000, n: crypto.randomBytes(8).toString("hex") })));
  return `${payload}.${mac(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expect = mac(payload);
  if (sig.length !== expect.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return false;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString()).exp > Date.now();
  } catch {
    return false;
  }
}

export const isAdmin = (req: NextRequest) => verifyToken(req.cookies.get(COOKIE)?.value);

export function cookieHeader(value: string, maxAge = MAX_AGE): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

/** Mutations must come from this site (blocks cross-site form posts even if a cookie were sent). */
export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin fetches from older browsers omit it; SameSite=Strict still protects the cookie
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

/** Small in-memory limiter: fine for a single admin; on serverless it limits per warm instance. */
const hits = new Map<string, { n: number; reset: number }>();
export function limited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || h.reset < now) {
    hits.set(key, { n: 1, reset: now + windowMs });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
    return false;
  }
  h.n += 1;
  return h.n > max;
}
export const clientIp = (req: NextRequest) => (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
