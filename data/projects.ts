export interface Project {
  id: string;
  /** Brand name shown on the card. */
  title: string;
  clientOrBrand: string;
  category: "FMCG" | "Tech" | "Community Building" | "Personal Branding" | "Community Events" | "Political";
  role: string;
  /** Where the work was done through an agency, if it was. */
  context?: string;
  /** The one-line case shown on the card and in the dialog. */
  case: string;
  /** Optional editorial layout for the dialog: small label, large headline, then Role and the description. */
  eyebrow?: string;
  headline?: string;
  coverImage: string;
  imageAlt: string;
  /** CSS object-position for crops. */
  focus: string;
  credit?: { title: string; author: string; license: string; url: string };
  /** Transparent portrait shown over a tinted backdrop instead of a full-bleed photo. */
  cutout?: { bg: string };
}

export const PROJECTS: Project[] = [
  {
    id: "surf-excel",
    title: "Surf Excel",
    clientOrBrand: "Surf Excel (HUL)",
    category: "FMCG",
    role: "Brand storyteller, Lowe Lintas",
    context: "Through Lowe Lintas",
    case: "Joined the HUL/Lowe Lintas team in Mumbai to support South Indian consumer research, articulation and the campaign mood board. When a late-stage voiceover issue threatened the timeline, I practised the voice modulation and recorded the vocals to help protect the outcome.",
    coverImage: "/assets/work/surf-excel.webp",
    imageAlt: "Surf Excel campaign visual",
    focus: "50% 55%",
    credit: {"title": "TRADITIONAL GAMES", "author": "Rajeev PA", "license": "CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:TRADITIONAL_GAMES.jpg"},
  },
  {
    id: "glow-and-lovely",
    title: "Glow & Lovely",
    clientOrBrand: "Glow & Lovely (HUL)",
    category: "FMCG",
    role: "Brand voice, Lowe Lintas",
    context: "Through Lowe Lintas",
    case: "Brand voice and the look and feel of the ads for a major HUL beauty brand.",
    coverImage: "/assets/work/glow-and-lovely.webp",
    imageAlt: "Glow & Lovely campaign visual",
    focus: "50% 50%",
    credit: {"title": "Person holding an open jar of natural skincare product in a cozy setting during daylight", "author": "Shixart1985", "license": "CC BY 2.0", "url": "https://commons.wikimedia.org/wiki/File:Person_holding_an_open_jar_of_natural_skincare_product_in_a_cozy_setting_during_daylight.jpg"},
  },
  {
    id: "tresemme",
    title: "TRESemmé",
    clientOrBrand: "TRESemmé (HUL)",
    category: "FMCG",
    role: "Brand voice, Lowe Lintas",
    context: "Through Lowe Lintas",
    case: "Brand voice and the look and feel of the ads for a leading HUL haircare brand.",
    coverImage: "/assets/work/tresemme-logo-v2.webp",
    imageAlt: "TRESemmé logo",
    focus: "50% 50%",
  },
  {
    id: "itc-aashirvaad",
    title: "ITC Aashirvaad",
    clientOrBrand: "ITC Aashirvaad",
    category: "FMCG",
    role: "Go-to-market, Curativity",
    context: "Through Curativity",
    case: "Launched the new masala range with stereotype-breaking stories, alongside a team of women.",
    coverImage: "/assets/work/itc-aashirvaad.webp",
    imageAlt: "Aashirvaad masala range",
    focus: "50% 50%",
    credit: {"title": "Foods and Flavors of India (8341561561)", "author": "The U.S. Food and Drug Administration", "license": "Public domain", "url": "https://commons.wikimedia.org/wiki/File:Foods_and_Flavors_of_India_(8341561561).jpg"},
  },
  {
    id: "microsoft",
    title: "Microsoft",
    clientOrBrand: "Microsoft",
    category: "Tech",
    role: "Freelance content strategist",
    case: "Structured product messaging and e-commerce buyer-journey content across 11 international markets.",
    coverImage: "/assets/work/microsoft.webp",
    imageAlt: "Microsoft project visual",
    focus: "50% 40%",
    credit: {"title": "Surface Laptop Studio - 2", "author": "KKPCW", "license": "CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Surface_Laptop_Studio_-_2.jpg"},
  },
  {
    id: "deescribble-brand",
    title: "Deescribble",
    clientOrBrand: "Deescribble",
    category: "Community Building",
    role: "Founder",
    case: "300K+ followers, 140M+ views and 35M+ interactions from roughly 100 videos and 40 posts in about 15 months.",
    coverImage: "/assets/hero/dedeepya-hero.webp",
    imageAlt: "Dedeepya, founder of Deescribble",
    focus: "50% 18%",
  },
  {
    id: "founder-positioning",
    title: "Founder & Executive Positioning",
    clientOrBrand: "Founder & Executive Positioning",
    category: "Personal Branding",
    role: "Brand & Communications Strategist",
    case: "Executive positioning, personal brand strategy and public communication for founders, business leaders and public-facing personalities.",
    eyebrow: "Personal Branding & Strategy",
    headline: "Building how leaders are seen, heard and understood.",
    coverImage: "/assets/expertise/branding-celebrity-v2.webp",
    imageAlt: "Dedeepya with a film star at an event",
    focus: "50% 18%",
  },
  {
    id: "community-events",
    title: "Deescribble Community Events",
    clientOrBrand: "Deescribble",
    category: "Community Events",
    role: "Founder and host",
    case: "Offline meetups for women and artists, bringing the Deescribble community together in person to share stories, celebrate and meet the people behind the screens.",
    coverImage: "/assets/work/community-events.webp",
    imageAlt: "Dedeepya smiling among women at a community gathering",
    focus: "42% 40%",
  },
  {
    id: "election-campaign",
    title: "Election Campaign",
    clientOrBrand: "Political campaign",
    category: "Political",
    role: "Campaign strategist",
    case: "Took over campaign design mid-election, when the strategy team stepped back, and the campaign won. Later ran events for the Prime Minister, Home Minister and Defence Minister, handling labour, permissions, communications and media.",
    coverImage: "/assets/work/political-event.webp",
    imageAlt: "Dedeepya at a national government event with an official in the backdrop",
    focus: "50% 22%",
  },
];
