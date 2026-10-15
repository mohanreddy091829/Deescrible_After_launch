import { readCollection } from "@/lib/cms/store";
import type { ReelEntry } from "@/lib/cms/types";

export async function GET() {
  const items = await readCollection<ReelEntry[]>("reels", []);
  return Response.json({ items }, { headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=120" } });
}
