export interface Project {
  id: string;
  /** Brand name shown on the card. */
  title: string;
  clientOrBrand: string;
  category: "FMCG" | "Technology" | "Personal Branding";
  role: string;
  /** Where the work was done through an agency, if it was. */
  context?: string;
  /** The one-line case shown on the card and in the dialog. */
  case: string;
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
    case: "Joined the HUL/Lowe Lintas team in Mumbai to support South Indian consumer research, articulation and the campaign mood board. When a late-stage voiceover issue threatened the timeline, I practised the modulation and recorded the vocals to help protect the outcome.",
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
    case: "Brand voice and ad look and feel for a major HUL beauty brand.",
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
    case: "Brand voice and ad look and feel.",
    coverImage: "/assets/work/tresemme.webp",
    imageAlt: "TRESemmé campaign visual",
    focus: "50% 50%",
    credit: {"title": "Tony & Guy - Salon Quality Shampoo - 50888163047", "author": "geehairimages", "license": "CC BY 2.0", "url": "https://commons.wikimedia.org/wiki/File:Tony_&_Guy_-_Salon_Quality_Shampoo_-_50888163047.jpg"},
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
    category: "Technology",
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
    category: "Personal Branding",
    role: "Founder",
    case: "300K+ followers, 30M+ views and 11M+ interactions from roughly 100 videos and 40 posts in about 15 months.",
    coverImage: "/assets/hero/dedeepya-hero.webp",
    imageAlt: "Dedeepya, founder of Deescribble",
    focus: "50% 18%",
  },
  {
    id: "founder-positioning",
    title: "Founder & Executive Positioning",
    clientOrBrand: "Founder & Executive Positioning",
    category: "Personal Branding",
    role: "Strategist",
    case: "Positioning and PR for a South Indian film family, Lifespan's founder and Qentelli's Chief Digital Officer.",
    coverImage: "/assets/expertise/03-founder.webp",
    imageAlt: "Executive portrait setup",
    focus: "50% 50%",
    credit: { title: "Gooseneck microphone on podium with stage bokeh lights", author: "A S M Jobaer", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Gooseneck_microphone_on_podium_with_stage_bokeh_lights.jpg" },
  },
];
