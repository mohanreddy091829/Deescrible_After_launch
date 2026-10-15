import type { NextRequest } from "next/server";
import sharp from "sharp";
import { clientIp, isAdmin, limited, sameOrigin } from "@/lib/cms/auth";
import { saveImage } from "@/lib/cms/store";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return Response.json({ error: "Forbidden" }, { status: 403 });
  if (!isAdmin(req)) return Response.json({ error: "Please log in." }, { status: 401 });
  if (limited(`upload:${clientIp(req)}`, 60, 60 * 60 * 1000)) return Response.json({ error: "Too many uploads. Try later." }, { status: 429 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return Response.json({ error: "No file." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "Image is over 8 MB." }, { status: 413 });

  try {
    // Decoding and re-encoding proves it is a real image and strips metadata / embedded payloads.
    const out = await sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 50_000_000 })
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    return Response.json({ url: await saveImage(out, "webp") }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "That file is not a usable image (try JPG, PNG or WebP)." }, { status: 415 });
  }
}
