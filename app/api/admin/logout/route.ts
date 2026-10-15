import type { NextRequest } from "next/server";
import { cookieHeader, sameOrigin } from "@/lib/cms/auth";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return Response.json({ error: "Forbidden" }, { status: 403 });
  return Response.json({ ok: true }, { headers: { "Set-Cookie": cookieHeader("", 0), "Cache-Control": "no-store" } });
}
