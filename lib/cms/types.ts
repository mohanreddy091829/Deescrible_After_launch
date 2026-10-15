export interface EventItem {
  id: string;
  title: string;
  /** yyyy-mm-dd */
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  link: string;
  linkLabel: string;
  published: boolean;
}

export interface ReelEntry {
  id: string;
  title: string;
  /** link to the reel on Instagram */
  url: string;
  /** cover image */
  image: string;
  /** e.g. "2.4M views" */
  stat: string;
}

export interface Enquiry {
  id: string;
  at: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  web: string;
  message: string;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const httpUrl = (v: unknown) => {
  const s = str(v, 500);
  if (!s) return "";
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : "";
  } catch {
    return "";
  }
};
const id = (v: unknown) => (typeof v === "string" && /^[a-z0-9-]{4,40}$/.test(v) ? v : "");

export function cleanEvents(input: unknown, ownImage: (u: string) => boolean): EventItem[] {
  if (!Array.isArray(input)) return [];
  return input.slice(0, 100).flatMap((r) => {
    const o = (r ?? {}) as Record<string, unknown>;
    const date = str(o.date, 10);
    const image = str(o.image, 500);
    const rid = id(o.id);
    if (!rid || !str(o.title, 140) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !ownImage(image)) return [];
    return [{ id: rid, title: str(o.title, 140), date, time: str(o.time, 40), location: str(o.location, 140), description: str(o.description, 1200), image, link: httpUrl(o.link), linkLabel: str(o.linkLabel, 40), published: o.published !== false }];
  });
}

export function cleanReels(input: unknown, ownImage: (u: string) => boolean): ReelEntry[] {
  if (!Array.isArray(input)) return [];
  return input.slice(0, 24).flatMap((r) => {
    const o = (r ?? {}) as Record<string, unknown>;
    const rid = id(o.id);
    const image = str(o.image, 500);
    const url = httpUrl(o.url);
    if (!rid || !url || !image || !ownImage(image)) return [];
    return [{ id: rid, title: str(o.title, 100), url, image, stat: str(o.stat, 40) }];
  });
}
