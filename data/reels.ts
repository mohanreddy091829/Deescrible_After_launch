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
}

export const DEESCRIBBLE_STATS = [
  { label: "Instagram followers", value: "300K+", note: "Organic community" },
  { label: "LinkedIn followers", value: "4.5K+", note: "Thought leadership" },
  { label: "Content series", value: "20+", note: "Episodic storytelling" },
  { label: "Total reach & views", value: "Millions", note: "Across social media" },
];

export const DEESCRIBBLE_URL = "https://www.instagram.com/deescribble_/";

export const REELS: ReelItem[] = [
  { id: "brand-breakdowns", poster: "/assets/reels/posters/brand-breakdowns.webp", title: "Brand Breakdowns", tagline: "Unpacking what makes iconic brands tick", description: "Analytical breakdowns of Indian and global brands.", theme: "Brand architecture", quote: "", headline: "Every brand is built on one overlooked truth.", bg: "linear-gradient(160deg,#2b2a3a 0%,#4b3b5c 55%,#c47b63 130%)" },
  { id: "ad-stories", poster: "/assets/reels/posters/ad-stories.webp", title: "Ad Stories", tagline: "The craft behind unforgettable commercials", description: "Why certain lines, songs and frames stayed with a generation.", theme: "Advertising craft", headline: "A great ad reflects a generation back to itself.", bg: "linear-gradient(160deg,#3a2418 0%,#8a4b2a 60%,#e8a826 140%)" },
  { id: "life-observations", poster: "/assets/reels/posters/life-observations.webp", title: "Life Observations", tagline: "Everyday human moments, distilled", description: "Micro-essays on behaviour, cities and routines.", theme: "Human insights", headline: "The best research is how people talk when nobody is surveying them.", bg: "linear-gradient(160deg,#1f3138 0%,#3d6370 60%,#9db8d4 140%)" },
  { id: "varanasi-diaries", poster: "/assets/reels/posters/varanasi-diaries.webp", title: "Varanasi Diaries", tagline: "Where eternity meets the tea stall", description: "Chronicles from the ghats of Kashi.", theme: "Cultural heritage", headline: "In Kashi, time ripples like the Ganga.", bg: "linear-gradient(160deg,#3b1f12 0%,#b5602a 55%,#f1b56a 130%)" },
  { id: "creative-process", poster: "/assets/reels/posters/creative-process.webp", title: "Creative Process", tagline: "The honest mess of bringing ideas to life", description: "Behind the scenes of writing and consulting work.", theme: "Creative discipline", headline: "Creativity is the patience to sit through the storm.", bg: "linear-gradient(160deg,#242321 0%,#4d4538 60%,#d5aa67 140%)" },
  { id: "real-conversations", poster: "/assets/reels/posters/real-conversations.webp", title: "Real Conversations", tagline: "Dialogue with 300K+ thinkers and doers", description: "Audience questions on careers, brands and finding a voice.", theme: "Community exchange", headline: "A community is a room where everyone feels heard.", bg: "linear-gradient(160deg,#27342b 0%,#546b58 60%,#c9b88a 140%)" },
];
