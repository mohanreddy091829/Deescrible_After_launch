import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

/**
 * Storage layer for the CMS. Three backends, chosen by environment (first match wins):
 *  - Supabase (SUPABASE_URL + SUPABASE_SECRET_KEY): documents in the `cms_documents` table, images in the
 *    public `cms-media` bucket. Use this in production.
 *  - Vercel Blob when BLOB_READ_WRITE_TOKEN is set
 *  - the local `.data/` folder otherwise (development, or a server with a persistent disk)
 */
import { SB, sbFetch, sbPublicUrl } from "./supabase";

const BLOB = !SB && !!process.env.BLOB_READ_WRITE_TOKEN;
const ROOT = path.join(process.cwd(), ".data");
const MEDIA = path.join(ROOT, "media");

export const storageMode = SB ? "supabase" : BLOB ? "vercel-blob" : "local-disk";

const safeKey = (k: string) => {
  if (!/^[a-z0-9-]{1,40}$/.test(k)) throw new Error("bad key");
  return k;
};

export async function readCollection<T>(key: string, fallback: T): Promise<T> {
  safeKey(key);
  try {
    if (SB) {
      const r = await sbFetch(`/rest/v1/cms_documents?key=eq.${key}&select=data`);
      if (!r.ok) return fallback;
      const rows = (await r.json()) as { data: T }[];
      return rows[0] ? rows[0].data : fallback;
    }
    if (BLOB) {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: `cms/${key}.json`, limit: 1 });
      if (!blobs[0]) return fallback;
      const res = await fetch(`${blobs[0].url}?t=${Date.now()}`, { cache: "no-store" });
      return res.ok ? ((await res.json()) as T) : fallback;
    }
    return JSON.parse(await fs.readFile(path.join(ROOT, `${key}.json`), "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeCollection<T>(key: string, data: T): Promise<void> {
  safeKey(key);
  const body = JSON.stringify(data);
  if (SB) {
    const r = await sbFetch("/rest/v1/cms_documents?on_conflict=key", {
      method: "POST",
      headers: { "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ key, data, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) throw new Error(`supabase write failed (${r.status})`);
    return;
  }
  if (BLOB) {
    const { put } = await import("@vercel/blob");
    await put(`cms/${key}.json`, body, { access: "public", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 0 });
    return;
  }
  await fs.mkdir(ROOT, { recursive: true });
  const tmp = path.join(ROOT, `${key}.${crypto.randomBytes(4).toString("hex")}.tmp`);
  await fs.writeFile(tmp, body);
  await fs.rename(tmp, path.join(ROOT, `${key}.json`));
}

/** Saves an already-processed image and returns the URL the site should use for it. */
export async function saveImage(buf: Buffer, ext: "webp"): Promise<string> {
  const name = `${Date.now().toString(36)}-${crypto.randomBytes(5).toString("hex")}.${ext}`;
  if (SB) {
    const r = await sbFetch(`/storage/v1/object/cms-media/${name}`, { method: "POST", headers: { "Content-Type": "image/webp", "x-upsert": "false", "cache-control": "max-age=31536000" }, body: new Uint8Array(buf) });
    if (!r.ok) throw new Error(`supabase upload failed (${r.status})`);
    return sbPublicUrl(name);
  }
  if (BLOB) {
    const { put } = await import("@vercel/blob");
    const r = await put(`cms/media/${name}`, buf, { access: "public", contentType: "image/webp", addRandomSuffix: false });
    return r.url;
  }
  await fs.mkdir(MEDIA, { recursive: true });
  await fs.writeFile(path.join(MEDIA, name), buf);
  return `/api/media/${name}`;
}

export async function readLocalImage(file: string): Promise<Buffer | null> {
  if (!/^[a-z0-9-]{4,60}\.webp$/.test(file)) return null;
  try {
    return await fs.readFile(path.join(MEDIA, file));
  } catch {
    return null;
  }
}

/** Only images this store produced are accepted as `image` values. */
export function isOwnImageUrl(u: string): boolean {
  if (u === "") return true;
  if (/^\/api\/media\/[a-z0-9-]{4,60}\.webp$/.test(u)) return true;
  if (SB && u.startsWith(`${SB.url}/storage/v1/object/public/cms-media/`) && /\/[a-z0-9-]{4,60}\.webp$/.test(u)) return true;
  try {
    const url = new URL(u);
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}
