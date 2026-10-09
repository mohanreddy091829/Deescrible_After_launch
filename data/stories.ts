export interface StoryItem {
  id: string;
  category: "Articles" | "TEDx" | "Documentary" | "Speaking" | "In the Media";
  title: string;
  /** One line under the title. */
  subtitle: string;
  /** Short meta label, e.g. "LinkedIn · Case study". */
  meta: string;
  summary: string;
  externalUrl: string;
  actionText: string;
  coverImage: string;
  imageAlt: string;
  focus: string;
  credit: { title: string; author: string; license: string; url: string };
}

/**
 * Titles come from the approved design and the discovery form (TEDx, LinkedIn case studies, Kashi
 * documentary, panels). Links marked TODO point at her profile until the specific item URL is supplied.
 */
export const STORIES: StoryItem[] = [
  {
    id: "brand-conversations",
    category: "Articles",
    title: "Why good brand stories feel like conversations",
    subtitle: "From megaphone marketing to mutual dialogue",
    meta: "LinkedIn · Article",
    summary: "On why brands that listen to the everyday cadence of their audience earn agreement, not just attention.",
    externalUrl: "https://www.linkedin.com/in/dedeepya-abbagani/", // TODO: article URL
    actionText: "Read article",
    coverImage: "/assets/stories/brand-conversations.webp",
    imageAlt: "Hands writing in a notebook beside a laptop",
    focus: "50% 55%",
    credit: {"title": "Person writing in a notebook while sitting at a desk", "author": "Shixart1985", "license": "CC BY 2.0", "url": "https://commons.wikimedia.org/wiki/File:Person_writing_in_a_notebook_while_sitting_at_a_desk.jpg"},
  },
  {
    id: "tedx-talk",
    category: "TEDx",
    title: "Ideas worth spreading. Conversations that matter.",
    subtitle: "A TEDx talk on authentic storytelling",
    meta: "TEDx · Talk",
    summary: "A talk on why genuine human stories outlast algorithm-made noise: authenticity, voice and empathy.",
    externalUrl: "https://www.linkedin.com/in/dedeepya-abbagani/", // TODO: talk URL
    actionText: "Watch talk",
    coverImage: "/assets/stories/tedx-talk.webp",
    imageAlt: "A theatre stage with red seating and a projection screen",
    focus: "50% 70%",
    credit: {"title": "HK YTM Kln West \u897f\u4e5d\u9f8d\u6587\u5316\u5340 WKCD HKPM \u9999\u6e2f\u6545\u5bae\u6587\u5316\u535a\u7269\u9928 Hong Kong Palace Museum \u8cfd\u99ac\u6703\u6f14\u8b1b\u5ef3 HKJC Auditorium red seats n interior design July 2022 Px3 19", "author": "LAMBGRABUSAM 73820T ONFAT", "license": "CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:HK_YTM_Kln_West_\u897f\u4e5d\u9f8d\u6587\u5316\u5340_WKCD_HKPM_\u9999\u6e2f\u6545\u5bae\u6587\u5316\u535a\u7269\u9928_Hong_Kong_Palace_Museum_\u8cfd\u99ac\u6703\u6f14\u8b1b\u5ef3_HKJC_Auditorium_red_seats_n_interior_design_July_2022_Px3_19.jpg"},
  },
  {
    id: "decoding-varanasi",
    category: "Documentary",
    title: "Decoding Varanasi",
    subtitle: "Its people, its culture, its stories.",
    meta: "Documentary · Kashi",
    summary: "An independent cultural documentary through the ghats and lanes of Varanasi, written and directed by Dedeepya.",
    externalUrl: "https://www.youtube.com/@deescribble",
    actionText: "Watch now",
    coverImage: "/assets/stories/decoding-varanasi.webp",
    imageAlt: "Pilgrims and boats on the ghats of Varanasi",
    focus: "50% 60%",
    credit: {"title": "Varanasi, India (33483934528)", "author": "Ninara", "license": "CC BY 2.0", "url": "https://commons.wikimedia.org/wiki/File:Varanasi,_India_(33483934528).jpg"},
  },
  {
    id: "belgian-waffle-analysis",
    category: "Articles",
    title: "India didn't need another dessert: how Belgian Waffle Co. built a 100 Cr brand",
    subtitle: "Single-product focus, aroma and smart retail real estate",
    meta: "LinkedIn · Case study",
    summary: "A teardown of how a single-product dessert brand built scale through packaging, aroma cues and kiosk economics.",
    externalUrl: "https://www.linkedin.com/pulse/india-didnt-need-another-dessert-built-100-cr-brand-anyway-abbagani-8roqc",
    actionText: "Read case study",
    coverImage: "/assets/stories/belgian-waffle-analysis.webp",
    imageAlt: "A display of Belgian waffles with fruit and cream",
    focus: "50% 50%",
    credit: {"title": "Waffles (Belgium)", "author": "Tamorlan", "license": "CC BY 3.0", "url": "https://commons.wikimedia.org/wiki/File:Waffles_(Belgium).jpg"},
  },
  {
    id: "regional-stories",
    category: "Articles",
    title: "The power of regional stories in modern branding",
    subtitle: "Why Bharat is not just Hindi with subtitles",
    meta: "LinkedIn · Article",
    summary: "Why translation alone fails in regional markets, and what understanding ritual, dialect and local nuance adds.",
    externalUrl: "https://www.linkedin.com/in/dedeepya-abbagani/", // TODO: article URL
    actionText: "Read article",
    coverImage: "/assets/stories/regional-stories.webp",
    imageAlt: "A busy bazaar street leading to the Charminar in Hyderabad",
    focus: "50% 55%",
    credit: {"title": "View of Charminar from Laad Bazzar, Hyderabad (27160)", "author": "PJeganathan", "license": "CC BY-SA 3.0", "url": "https://commons.wikimedia.org/wiki/File:View_of_Charminar_from_Laad_Bazzar,_Hyderabad_(27160).jpg"},
  },
  {
    id: "panels-and-speaking",
    category: "Speaking",
    title: "Panels, interviews and conversations",
    subtitle: "Perspectives on branding and modern media",
    meta: "Speaking · Appearances",
    summary: "Guest sessions, panels and podcasts on brand strategy, community building and the creator ecosystem.",
    externalUrl: "https://www.linkedin.com/in/dedeepya-abbagani/", // TODO: appearance URLs
    actionText: "View details",
    coverImage: "/assets/stories/panels-and-speaking.webp",
    imageAlt: "An auditorium stage framed by gold curtains",
    focus: "50% 55%",
    credit: {"title": "Auditorium Stage, Schurz High School, Milwaukee Avenue and Addison Street, Irving Park, Chicago, IL", "author": "w_lemay", "license": "CC BY-SA 2.0", "url": "https://commons.wikimedia.org/wiki/File:Auditorium_Stage,_Schurz_High_School,_Milwaukee_Avenue_and_Addison_Street,_Irving_Park,_Chicago,_IL.jpg"},
  },
];
