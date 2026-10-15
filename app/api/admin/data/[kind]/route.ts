import type { NextRequest } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/cms/auth";
import { isOwnImageUrl, readCollection, writeCollection } from "@/lib/cms/store";
import { cleanEvents, cleanReels, type Enquiry } from "@/lib/cms/types";

const KINDS = ["events", "reels", "enquiries"] as const;
type Kind = (typeof KINDS)[number];
const NO_STORE = { "Cache-Control": "no-store" };

const kindOf = async (ctx: { params: Promise<{ kind: string }> }): Promise<Kind | null> => {
  const { kind } = await ctx.params;
  return (KINDS as readonly string[]).includes(kind) ? (kind as Kind) : null;
};

export async function GET(req: NextRequest, ctx: { params: Promise<{ kind: string }> }) {
  if (!isAdmin(req)) return Response.json({ error: "Please log in." }, { status: 401 });
  const kind = await kindOf(ctx);
  if (!kind) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ items: await readCollection(kind, []) }, { headers: NO_STORE });
}

/** Events and reels are saved as a whole list (the editor owns the order). */
export async function PUT(req: NextRequest, ctx: { params: Promise<{ kind: string }> }) {
  if (!sameOrigin(req)) return Response.json({ error: "Forbidden" }, { status: 403 });
  if (!isAdmin(req)) return Response.json({ error: "Please log in." }, { status: 401 });
  const kind = await kindOf(ctx);
  if (!kind || kind === "enquiries") return Response.json({ error: "Not found" }, { status: 404 });
  const body = (await req.json().catch(() => null)) as { items?: unknown } | null;
  const items = kind === "events" ? cleanEvents(body?.items, isOwnImageUrl) : cleanReels(body?.items, isOwnImageUrl);
  try {
    await writeCollection(kind, items);
  } catch {
    return Response.json({ error: "Could not save. Check the storage settings." }, { status: 500 });
  }
  return Response.json({ items }, { headers: NO_STORE });
}

/** Enquiries can only be removed, one at a time (?id=…). */
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ kind: string }> }) {
  if (!sameOrigin(req)) return Response.json({ error: "Forbidden" }, { status: 403 });
  if (!isAdmin(req)) return Response.json({ error: "Please log in." }, { status: 401 });
  if ((await kindOf(ctx)) !== "enquiries") return Response.json({ error: "Not found" }, { status: 404 });
  const id = req.nextUrl.searchParams.get("id") ?? "";
  const list = await readCollection<Enquiry[]>("enquiries", []);
  await writeCollection("enquiries", list.filter((e) => e.id !== id));
  return Response.json({ ok: true }, { headers: NO_STORE });
}
