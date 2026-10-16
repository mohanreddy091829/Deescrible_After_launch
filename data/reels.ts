export interface ReelItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** Public path to a 9:16 MP4 in /public/assets/reels/videos (optional until supplied). */
  video?: string;
  /** Still frame for the video; shown while it loads and in the side tiles. */
  poster?: string;
  /** Link to the specific reel on Instagram; falls back to the profile. */
  instagramUrl?: string;
  /** Seconds a poster-only reel stays on screen before advancing. */
  seconds?: number;
  /** Backdrop used for the generated poster card. */
  bg: string;
  /** Short line printed large on the poster card. */
  headline: string;
  theme: string;
  quote?: string;
  /** true for reels managed in the admin (real covers, not generated quote cards) */
  custom?: boolean;
}

export const DEESCRIBBLE_STATS = [
  { label: "followers", value: "300K+" },
  { label: "views", value: "140M+" },
  { label: "interactions", value: "35M+" },
  { label: "videos + ~40 posts", value: "~100" },
];

export const DEESCRIBBLE_URL = "https://www.instagram.com/deescribble_/";

export const REELS: ReelItem[] = [
  { id: "workplace-kastalu", title: "Workplace Kastalu", tagline: "3.1M views", description: "Workplace Kastalu", poster: "/assets/reels/posters/workplace-kastalu-v2.webp", instagramUrl: "https://www.instagram.com/reel/DL45Z1KRcok/", theme: "Instagram", headline: "Workplace Kastalu", bg: "#4a0b11", custom: true },
  { id: "invest-in-skills", title: "Invest in skills", tagline: "1.1M views", description: "Invest in skills", poster: "/assets/reels/posters/invest-in-skills-v2.webp", instagramUrl: "https://www.instagram.com/reel/DZ9_Qp1RFFG/", theme: "Instagram", headline: "Invest in skills", bg: "#4a0b11", custom: true },
  { id: "be-kind", title: "Be kind", tagline: "3.3M views", description: "Be kind", poster: "/assets/reels/posters/be-kind-v2.webp", instagramUrl: "https://www.instagram.com/reel/DYmdg6YxKh8/", theme: "Instagram", headline: "Be kind", bg: "#4a0b11", custom: true },
  { id: "decoding-varanasi", title: "Decoding Varanasi", tagline: "2.5M views", description: "Decoding Varanasi", poster: "/assets/reels/posters/decoding-varanasi-v2.webp", instagramUrl: "https://www.instagram.com/reel/DTKyGUtEfU6/", theme: "Instagram", headline: "Decoding Varanasi", bg: "#4a0b11", custom: true },
  { id: "varanasi-hope", title: "Varanasi: hope, human and god", tagline: "4.7M views", description: "Varanasi: hope, human and god", poster: "/assets/reels/posters/varanasi-hope-v2.webp", instagramUrl: "https://www.instagram.com/reel/DTAlP5dEY7k/", theme: "Instagram", headline: "Varanasi: hope, human and god", bg: "#4a0b11", custom: true },
  { id: "books-mindset", title: "Books: your mindset", tagline: "2.8M views", description: "Books: your mindset", poster: "/assets/reels/posters/books-mindset-v2.webp", instagramUrl: "https://www.instagram.com/reel/DNstRss4tCo/", theme: "Instagram", headline: "Books: your mindset", bg: "#4a0b11", custom: true },
  { id: "relationships-nourishment", title: "Relationships need nourishment", tagline: "1.7M views", description: "Relationships need nourishment", poster: "/assets/reels/posters/relationships-nourishment-v2.webp", instagramUrl: "https://www.instagram.com/reel/DMxhpMFRkDU/", theme: "Instagram", headline: "Relationships need nourishment", bg: "#4a0b11", custom: true },
];
