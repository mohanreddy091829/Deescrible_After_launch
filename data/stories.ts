export interface StoryItem {
  id: string;
  /** The line printed under the picture. */
  caption: string;
  coverImage: string;
  imageAlt: string;
  focus: string;
  /** Optional: when the idea has a public page, the card links to it. */
  externalUrl?: string;
  credit: { title: string; author: string; license: string; url: string };
}

/** Captions marked "placeholder" in the copy doc ([Q3]) are working lines until Dedeepya confirms them. */
export const STORIES: StoryItem[] = [
  {
    id: "notebook",
    caption: "Where every idea starts.",
    coverImage: "/assets/stories/brand-conversations.webp",
    imageAlt: "Open notebook with handwritten notes",
    externalUrl: "https://www.linkedin.com/in/dedeepya-abbagani/",
    focus: "50% 55%",
    credit: {"title": "Person writing in a notebook while sitting at a desk", "author": "Shixart1985", "license": "CC BY 2.0", "url": "https://commons.wikimedia.org/wiki/File:Person_writing_in_a_notebook_while_sitting_at_a_desk.jpg"},
  },
  {
    id: "theatre",
    caption: "TEDxVVITU, Guntur: on the speaker list, February 2026.",
    coverImage: "/assets/stories/tedx-stage.webp",
    imageAlt: "Dedeepya speaking on stage at TEDxVVITU",
    externalUrl: "https://www.ted.com/tedx/events/65648",
    focus: "50% 70%",
    credit: {"title": "HK YTM Kln West \u897f\u4e5d\u9f8d\u6587\u5316\u5340 WKCD HKPM \u9999\u6e2f\u6545\u5bae\u6587\u5316\u535a\u7269\u9928 Hong Kong Palace Museum \u8cfd\u99ac\u6703\u6f14\u8b1b\u5ef3 HKJC Auditorium red seats n interior design July 2022 Px3 19", "author": "LAMBGRABUSAM 73820T ONFAT", "license": "CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:HK_YTM_Kln_West_\u897f\u4e5d\u9f8d\u6587\u5316\u5340_WKCD_HKPM_\u9999\u6e2f\u6545\u5bae\u6587\u5316\u535a\u7269\u9928_Hong_Kong_Palace_Museum_\u8cfd\u99ac\u6703\u6f14\u8b1b\u5ef3_HKJC_Auditorium_red_seats_n_interior_design_July_2022_Px3_19.jpg"},
  },
  {
    id: "varanasi",
    caption: "Kashi, made in Telugu, watched across India.",
    coverImage: "/assets/stories/kashi-sunset.webp",
    imageAlt: "Dedeepya looking out over the Varanasi ghats at sunset",
    focus: "70% 60%",
    externalUrl: "https://www.youtube.com/@deescribble",
    credit: {"title": "Varanasi, India (33483934528)", "author": "Ninara", "license": "CC BY 2.0", "url": "https://commons.wikimedia.org/wiki/File:Varanasi,_India_(33483934528).jpg"},
  },
  {
    id: "waffles",
    caption: "India didn't need another dessert: how Belgian Waffle Co. built a 100 Cr brand.",
    coverImage: "/assets/stories/belgian-waffle-analysis.webp",
    imageAlt: "Plate of waffles",
    focus: "50% 50%",
    externalUrl: "https://www.linkedin.com/pulse/india-didnt-need-another-dessert-built-100-cr-brand-anyway-abbagani-8roqc",
    credit: {"title": "Waffles (Belgium)", "author": "Tamorlan", "license": "CC BY 3.0", "url": "https://commons.wikimedia.org/wiki/File:Waffles_(Belgium).jpg"},
  },
  {
    id: "charminar",
    caption: "Regional stories, told in the language people live in.",
    coverImage: "/assets/stories/regional-event.webp",
    imageAlt: "Dedeepya speaking at a women's gathering",
    focus: "30% 45%",
    credit: {"title": "View of Charminar from Laad Bazzar, Hyderabad (27160)", "author": "PJeganathan", "license": "CC BY-SA 3.0", "url": "https://commons.wikimedia.org/wiki/File:View_of_Charminar_from_Laad_Bazzar,_Hyderabad_(27160).jpg"},
  },
  {
    id: "auditorium",
    caption: "Panels, interviews and conversations.",
    coverImage: "/assets/stories/panel-discussion.webp",
    imageAlt: "Dedeepya in a panel discussion with four other speakers",
    focus: "22% 55%",
    externalUrl: "https://www.youtube.com/watch?v=IpZEyUmZXg0",
    credit: {"title": "Auditorium Stage, Schurz High School, Milwaukee Avenue and Addison Street, Irving Park, Chicago, IL", "author": "w_lemay", "license": "CC BY-SA 2.0", "url": "https://commons.wikimedia.org/wiki/File:Auditorium_Stage,_Schurz_High_School,_Milwaukee_Avenue_and_Addison_Street,_Irving_Park,_Chicago,_IL.jpg"},
  },
];
