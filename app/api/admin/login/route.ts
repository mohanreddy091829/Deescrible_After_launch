import type { NextRequest } from "next/server";
import { adminConfigured, clientIp, cookieHeader, limited, makeToken, sameOrigin, verifyLogin } from "@/lib/cms/auth";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return Response.json({ error: "Forbidden" }, { status: 403 });
  if (!adminConfigured()) return Response.json({ error: "The admin is not set up yet. Add the admin settings on the server." }, { status: 503 });
  if (limited(`login:${clientIp(req)}`, 6, 15 * 60 * 1000)) return Response.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });

  let email = "";
  let pw = "";
  try {
    const b = (await req.json()) as { email?: unknown; password?: unknown };
    email = String(b.email ?? "").slice(0, 200);
    pw = String(b.password ?? "").slice(0, 200);
  } catch {}
  if (email && limited(`login-email:${email.toLowerCase()}`, 10, 15 * 60 * 1000)) return Response.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  // a wrong guess costs about the same as a right one
  const [ok] = await Promise.all([pw ? verifyLogin(email, pw) : Promise.resolve(false), new Promise((r) => setTimeout(r, 350))]);
  if (!ok) return Response.json({ error: "Wrong email or password." }, { status: 401 });
  return Response.json({ ok: true }, { headers: { "Set-Cookie": cookieHeader(makeToken()), "Cache-Control": "no-store" } });
}
