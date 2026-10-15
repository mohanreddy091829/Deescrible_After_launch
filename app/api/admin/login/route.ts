import type { NextRequest } from "next/server";
import { adminConfigured, checkPassword, clientIp, cookieHeader, limited, makeToken, sameOrigin } from "@/lib/cms/auth";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return Response.json({ error: "Forbidden" }, { status: 403 });
  if (!adminConfigured()) return Response.json({ error: "The admin is not set up yet. Add ADMIN_PASSWORD and SESSION_SECRET." }, { status: 503 });
  if (limited(`login:${clientIp(req)}`, 6, 15 * 60 * 1000)) return Response.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });

  let pw = "";
  try {
    pw = String(((await req.json()) as { password?: unknown }).password ?? "").slice(0, 200);
  } catch {}
  // equal-ish delay so a wrong guess costs the same as a right one
  await new Promise((r) => setTimeout(r, 350));
  if (!pw || !checkPassword(pw)) return Response.json({ error: "Wrong password." }, { status: 401 });
  return Response.json({ ok: true }, { headers: { "Set-Cookie": cookieHeader(makeToken()), "Cache-Control": "no-store" } });
}
