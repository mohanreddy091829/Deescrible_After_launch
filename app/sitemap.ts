import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

// Bump these dates when the pages' content changes meaningfully.
const HOME_UPDATED = "2026-10-16";
const CONTACT_UPDATED = "2026-10-16";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!ALLOW_INDEXING) return [];
  return [
    { url: SITE_URL, lastModified: HOME_UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/consultation`, lastModified: CONTACT_UPDATED, changeFrequency: "yearly", priority: 0.7 },
  ];
}
