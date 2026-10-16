import type { NextRequest } from "next/server";
import { adminConfigured, authMode, isAdmin } from "@/lib/cms/auth";
import { storageMode } from "@/lib/cms/store";

export async function GET(req: NextRequest) {
  return Response.json({ configured: adminConfigured(), authed: isAdmin(req), storage: storageMode, mode: authMode() }, { headers: { "Cache-Control": "no-store" } });
}
