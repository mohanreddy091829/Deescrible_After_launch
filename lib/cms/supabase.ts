import "server-only";

/** Server-only Supabase access. The secret key never leaves the server and is never sent to the browser. */
const url = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
const secret = process.env.SUPABASE_SECRET_KEY || "";
const publishable = process.env.SUPABASE_PUBLISHABLE_KEY || "";

export const SB = /^https:\/\/[a-z0-9]{20}\.supabase\.co$/.test(url) && secret.length > 20 ? { url, secret, publishable } : null;

/** Call the Supabase REST / Storage API with the secret (service) key. */
export function sbFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (!SB) throw new Error("Supabase is not configured");
  const headers = new Headers(init.headers);
  headers.set("apikey", SB.secret);
  headers.set("Authorization", `Bearer ${SB.secret}`);
  return fetch(`${SB.url}${path}`, { ...init, headers, cache: "no-store", signal: AbortSignal.timeout(10000) });
}

export const sbPublicUrl = (file: string) => `${SB!.url}/storage/v1/object/public/cms-media/${file}`;

/** Check an email + password against Supabase Auth. Returns the verified user, or null. Tokens are discarded. */
export async function sbPasswordLogin(email: string, password: string): Promise<{ email: string } | null> {
  if (!SB || !SB.publishable) return null;
  try {
    const r = await fetch(`${SB.url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: SB.publishable, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return null;
    const j = (await r.json()) as { access_token?: string; user?: { email?: string; email_confirmed_at?: string | null } };
    if (!j.user?.email || !j.user.email_confirmed_at) return null;
    // revoke the Supabase session straight away; we issue our own short-lived cookie instead
    if (j.access_token) fetch(`${SB.url}/auth/v1/logout`, { method: "POST", headers: { apikey: SB.publishable, Authorization: `Bearer ${j.access_token}` } }).catch(() => {});
    return { email: j.user.email.toLowerCase() };
  } catch {
    return null;
  }
}
