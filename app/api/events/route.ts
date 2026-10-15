import { readCollection } from "@/lib/cms/store";
import type { EventItem } from "@/lib/cms/types";

/** Public: only published events, nearest upcoming first, then the most recent past ones. */
export async function GET() {
  const all = await readCollection<EventItem[]>("events", []);
  const today = new Date().toISOString().slice(0, 10);
  const live = all.filter((e) => e.published);
  const upcoming = live.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = live.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));
  return Response.json({ upcoming, past: past.slice(0, 6) }, { headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=120" } });
}
