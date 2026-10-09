import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Single-page site: one canonical URL. Bump this date when content changes.
const LAST_UPDATED = "2026-10-09";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 1 }];
}
