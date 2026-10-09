export interface Project {
  id: string;
  title: string;
  clientOrBrand: string;
  category: "FMCG" | "Technology" | "Personal Branding" | "Corporate Strategy";
  period: string;
  role: string;
  agencyContext?: string;
  summary: string;
  challenge: string;
  approach: string;
  execution: string;
  outcome: string;
  coverImage: string;
  imageAlt: string;
  /** CSS object-position for crops. */
  focus: string;
  /** Short line printed on the card. */
  kicker: string;
  credit?: { title: string; author: string; license: string; url: string };
  /** Transparent portrait shown over a tinted backdrop instead of a full-bleed photo. */
  cutout?: { bg: string };
  tags: string[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "surf-excel",
    title: "Surf Excel — Regional Narrative & Emotional Affinity",
    clientOrBrand: "Surf Excel (Hindustan Unilever)",
    category: "FMCG",
    period: "2023–2024",
    role: "Regional Content Strategist",
    agencyContext: "Through MullenLowe Lintas Group",
    summary:
      "Crafted localized narrative extensions of Surf Excel's iconic 'Daag Acche Hain' ethos, adapting storylines to resonant South Indian family nuances and festive contexts.",
    challenge:
      "Balancing national brand equity with deeply authentic regional cultural truths without losing emotional punch.",
    approach:
      "Conducted vernacular linguistic research and identified regional parenting rituals where 'dirt' and play embody childhood growth and unconditional care.",
    execution:
      "Collaborated on regional TVC scripts, digital campaign vignettes, and social storytelling touchpoints that connected with tier-1 and tier-2 households.",
    outcome:
      "High cultural resonance and exceptional brand love scores across target regional territories, reinforcing market leadership.",
    coverImage: "/assets/work/surf-excel.webp",
    imageAlt: "Children playing football on a muddy village ground",
    focus: "50% 55%",
    kicker: "Daag Acche Hain \u2014 play, mud and childhood",
    credit: {"title": "TRADITIONAL GAMES", "author": "Rajeev PA", "license": "CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:TRADITIONAL_GAMES.jpg"},
    tags: ["FMCG", "Regional Marketing", "Consumer Insights", "HUL"],
    featured: true,
  },
  {
    id: "glow-and-lovely",
    title: "Glow & Lovely — Modernizing Aspirational Identity",
    clientOrBrand: "Glow & Lovely (Hindustan Unilever)",
    category: "FMCG",
    period: "2023–2024",
    role: "Campaign Content Strategist",
    agencyContext: "Through MullenLowe Lintas Group",
    summary:
      "Developed contemporary narrative angles focused on self-reliance, modern career aspirations, and inner confidence for young women across India.",
    challenge:
      "Evolving the brand narrative towards genuine female empowerment and self-belief while speaking to aspirational tier-2 and tier-3 audiences.",
    approach:
      "Framed skincare not as superficial validation, but as personal grooming and quiet confidence before life-defining career milestones.",
    execution:
      "Authored regional digital campaign content, social narratives, and influencer storytelling guidelines aligning with young career aspirants.",
    outcome:
      "Helped solidify the repositioned modern identity, achieving strong positive sentiment and engagement among young female consumers.",
    coverImage: "/assets/work/glow-and-lovely.webp",
    imageAlt: "Hands holding an open jar of skincare cream",
    focus: "50% 50%",
    kicker: "Quiet confidence, one ritual at a time",
    credit: {"title": "Person holding an open jar of natural skincare product in a cozy setting during daylight", "author": "Shixart1985", "license": "CC BY 2.0", "url": "https://commons.wikimedia.org/wiki/File:Person_holding_an_open_jar_of_natural_skincare_product_in_a_cozy_setting_during_daylight.jpg"},
    tags: ["FMCG", "Women Aspirations", "Brand Strategy", "HUL"],
    featured: true,
  },
  {
    id: "tresemme",
    title: "TRESemmé — Salon-Grade Confidence at Home",
    clientOrBrand: "TRESemmé (Hindustan Unilever)",
    category: "FMCG",
    period: "2023–2024",
    role: "Brand Communication Strategist",
    agencyContext: "Through MullenLowe Lintas Group",
    summary:
      "Created sharp, aspirational digital communication positioning premium salon styling as an accessible daily ritual for urban professionals.",
    challenge:
      "Demystifying specialized hair regimens and salon terms for busy everyday consumers seeking effortless elegance.",
    approach:
      "Translated technical product formulations into relatable hair challenges (humidity frizz, office-to-dinner transitions) with crisp editorial framing.",
    execution:
      "Architected social campaign series, how-to format concepts, and seasonal styling stories for digital channels.",
    outcome:
      "Elevated social engagement, higher conversion on e-commerce product links, and clearer consumer comprehension of regimen steps.",
    coverImage: "/assets/work/tresemme.webp",
    imageAlt: "Salon-quality shampoo bottle wrapped in golden hair",
    focus: "50% 50%",
    kicker: "Salon styling as a daily ritual",
    credit: {"title": "Tony & Guy - Salon Quality Shampoo - 50888163047", "author": "geehairimages", "license": "CC BY 2.0", "url": "https://commons.wikimedia.org/wiki/File:Tony_&_Guy_-_Salon_Quality_Shampoo_-_50888163047.jpg"},
    tags: ["Haircare", "Premium Consumer", "Digital Strategy", "HUL"],
    featured: true,
  },
  {
    id: "itc-aashirvaad",
    title: "ITC Aashirvaad — Masala Segment Regional Campaign",
    clientOrBrand: "ITC Aashirvaad",
    category: "FMCG",
    period: "2023–2024",
    role: "Content & Vernacular Strategist",
    agencyContext: "Agency collaboration",
    summary:
      "Strategized regional culinary campaigns highlighting the authentic aroma, purity, and traditional heritage of Aashirvaad spices across Andhra and Telangana.",
    challenge:
      "Overcoming entrenched consumer loyalty to local loose spices by proving superior freshness and authentic regional palate matching.",
    approach:
      "Tapped into generational culinary memories and family kitchen secrets, positioning the spice range as the guardian of authentic taste.",
    execution:
      "Created regional video concepts, digital recipes narratives, and supermarket activation copy centered on authentic spice blending traditions.",
    outcome:
      "Marked surge in regional household trial and improved brand perception as a culturally attuned culinary partner.",
    coverImage: "/assets/work/itc-aashirvaad.webp",
    imageAlt: "Colourful bins of Indian spices at a market",
    focus: "50% 50%",
    kicker: "Authentic taste, generation to generation",
    credit: {"title": "Foods and Flavors of India (8341561561)", "author": "The U.S. Food and Drug Administration", "license": "Public domain", "url": "https://commons.wikimedia.org/wiki/File:Foods_and_Flavors_of_India_(8341561561).jpg"},
    tags: ["FMCG", "Regional Flavors", "ITC", "Vernacular Content"],
    featured: true,
  },
  {
    id: "microsoft",
    title: "Microsoft — Global E-Commerce Content Strategy",
    clientOrBrand: "Microsoft",
    category: "Technology",
    period: "2023",
    role: "Freelance Content Strategist",
    summary:
      "Delivered structured product messaging and e-commerce buyer journey content across 11 international markets for Microsoft hardware and enterprise software.",
    challenge:
      "Standardizing messaging hierarchy across diverse geographic markets with varying tech maturity and commercial nuances.",
    approach:
      "Built standardized content templates focusing on business ROI, remote collaboration, and seamless hybrid work integration.",
    execution:
      "Developed landing page copy, product spec breakdowns, feature-benefit matrices, and digital retail guides across global localized storefronts.",
    outcome:
      "Streamlined multi-market asset delivery, improved user comprehension, and supported global retail sales conversion.",
    coverImage: "/assets/work/microsoft.webp",
    imageAlt: "A Microsoft Surface laptop showing Windows on a white desk",
    focus: "50% 40%",
    kicker: "One message across 11 markets",
    credit: {"title": "Surface Laptop Studio - 2", "author": "KKPCW", "license": "CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Surface_Laptop_Studio_-_2.jpg"},
    tags: ["Technology", "Global Strategy", "E-Commerce", "SaaS & Hardware"],
    featured: true,
  },
  {
    id: "mulpuri",
    title: "Mulpuri Foods & Feeds — Brand Identity & Narrative",
    clientOrBrand: "Mulpuri Group",
    category: "Corporate Strategy",
    period: "2023",
    role: "Brand Strategy Consultant",
    summary:
      "Re-engineered corporate brand positioning and consumer food messaging for one of South India's premier agro-industrial groups.",
    challenge:
      "Connecting traditional agricultural credibility with forward-looking, high-quality packaged consumer food products.",
    approach:
      "Framed the legacy of farm-to-fork purity, generational farmer partnerships, and world-class processing standards as an unassailable trust moat.",
    execution:
      "Redesigned corporate brand guidelines, brand story architecture, product packaging copy, and investor facing decks.",
    outcome:
      "Unified group corporate perception and paved the way for successful modern retail shelf expansion.",
    coverImage: "/assets/work/mulpuri.webp",
    imageAlt: "Paddy fields at golden hour near Eluru, Andhra Pradesh",
    focus: "50% 55%",
    kicker: "Farm-to-fork trust",
    credit: {"title": "Paddy Fields near Eluru", "author": "iMahesh", "license": "CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Paddy_Fields_near_Eluru.jpg"},
    tags: ["Corporate Brand", "Agri & Consumer Foods", "Brand Identity"],
    featured: true,
  },

  {
    id: "deescribble-brand",
    title: "Deescribble — Building a Personal Brand into a Community",
    clientOrBrand: "Dedeepya Abbagani · Deescribble",
    category: "Personal Branding",
    period: "2024–2025",
    role: "Founder & Creator",
    summary:
      "Grew a personal storytelling project into a 300K+ organic Instagram community — a distribution built on trust and aspiration, and a live consumer-research channel.",
    challenge:
      "Standing out in a crowded creator space without sounding like a fan page, and without paid acquisition.",
    approach:
      "Designed repeatable episodic series with a clear promise, led with observation rather than self-promotion, and used comments and replies as research for the next episode.",
    execution:
      "20+ structured series — brand breakdowns, ad stories, life observations and Varanasi diaries — plus long-form LinkedIn case studies reaching 4.5K+ followers.",
    outcome:
      "300K+ Instagram followers, millions of views, and an audience of young professionals and business aspirants that now opens doors to TEDx and documentary work.",
    coverImage: "/assets/hero/portrait.webp",
    imageAlt: "Dedeepya Abbagani, founder of Deescribble",
    focus: "50% 100%",
    kicker: "300K+ people, built on trust",
    cutout: { bg: "linear-gradient(160deg,#f3d9b8 0%,#e9a97a 55%,#c47b63 100%)" },
    tags: ["Personal Branding", "Community", "Content Series", "Instagram"],
    featured: true,
  },
  {
    id: "founder-positioning",
    title: "Founder & Executive Positioning",
    clientOrBrand: "Lifespan · Qentelli · technology founders",
    category: "Personal Branding",
    period: "2024–2025",
    role: "Brand & Content Strategist",
    summary:
      "Distilled the conviction of founders and C-suite leaders into a clear point of view, then built the LinkedIn and speaking content to carry it.",
    challenge:
      "Leaders who knew their product deeply but had no consistent public voice, and a category full of interchangeable thought-leadership.",
    approach:
      "Found the belief the category doesn't share, turned it into a core thesis, and backed it with proof points and a repeatable content rhythm.",
    execution:
      "Narrative architecture, executive LinkedIn programmes, keynote talking points and podcast positioning.",
    outcome:
      "Clearer, more consistent executive presence across channels. Specific numbers are shared in conversation.",
    coverImage: "/assets/expertise/03-founder.webp",
    imageAlt: "A gooseneck microphone on a podium against blurred stage lights",
    focus: "50% 50%",
    kicker: "Be known for a point of view",
    credit: { title: "Gooseneck microphone on podium with stage bokeh lights", author: "A S M Jobaer", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Gooseneck_microphone_on_podium_with_stage_bokeh_lights.jpg" },
    tags: ["Founder Branding", "Thought Leadership", "LinkedIn"],
    featured: true,
  },
];
