export interface Brand {
  id: string;
  name: string;
  logo: string;
  url: string;
  category: string;
  alt: string;
  /** Brand colour used for the circular badge ring and hover glow. */
  accent: string;
  /** "contain" for logos on transparent/white, "cover" for logos that ship with their own tile. */
  fit?: "contain" | "cover";
  /** Circle background when the logo needs one other than white. */
  background?: string;
}

/** Marquee behaviour lives here so the component never hardcodes it. */
export const BRAND_STRIP = {
  /** "ltr" moves logos left → right (approved design), "rtl" the opposite. */
  direction: "ltr" as "ltr" | "rtl",
  /** Constant velocity in CSS px per second. */
  speed: 38,
  /** Pixels the previous / next controls nudge the strip. */
  step: 260,
};

export const BRANDS: Brand[] = [
  {
    id: "hul",
    name: "Hindustan Unilever Limited",
    logo: "/assets/brands/hul.webp",
    url: "https://www.hul.co.in/",
    category: "FMCG Conglomerate",
    alt: "Hindustan Unilever logo",
    accent: "#1F36C7",
  },
  {
    id: "surf-excel",
    name: "Surf Excel",
    logo: "/assets/brands/surf-excel.svg",
    url: "https://www.surfexcel.in/",
    category: "FMCG / Consumer Care",
    alt: "Surf Excel logo",
    accent: "#E6338A",
  },
  {
    id: "glow-and-lovely",
    name: "Glow & Lovely",
    logo: "/assets/brands/glow-and-lovely.svg",
    url: "https://www.hul.co.in/brands/",
    category: "Personal Care",
    alt: "Glow & Lovely logo",
    accent: "#B5105F",
  },
  {
    id: "tresemme",
    name: "TRESemmé",
    logo: "/assets/brands/tresemme.webp",
    url: "https://www.tresemme.in/",
    category: "Haircare & Styling",
    alt: "TRESemmé logo",
    accent: "#C9A25B",
    fit: "cover",
    background: "#000",
  },
  {
    id: "aashirvaad",
    name: "ITC Aashirvaad",
    logo: "/assets/brands/aashirvaad.svg",
    url: "https://aashirvaad.com/",
    category: "Foods & Spices",
    alt: "ITC Aashirvaad logo",
    accent: "#F48100",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "/assets/brands/microsoft.svg",
    url: "https://www.microsoft.com/",
    category: "Technology",
    alt: "Microsoft logo",
    accent: "#05A6F0",
  },
  {
    id: "zenwork",
    name: "Zenwork",
    logo: "/assets/brands/zenwork.webp",
    url: "https://www.zenwork.com/",
    category: "Tax & Compliance Tech",
    alt: "Zenwork logo",
    accent: "#00A850",
  },
  {
    id: "qentelli",
    name: "Qentelli",
    logo: "/assets/brands/qentelli.webp",
    url: "https://www.qentelli.com/",
    category: "Digital Transformation & AI",
    alt: "Qentelli logo",
    accent: "#1B1F4B",
    fit: "cover",
  },
  {
    id: "mullenlowe-lintas",
    name: "MullenLowe Lintas Group",
    logo: "/assets/brands/mullenlowe-lintas.webp",
    // The group's own domain now redirects to a different agency brand.
    url: "https://en.wikipedia.org/wiki/MullenLowe_Lintas_Group",
    category: "Advertising & Communications",
    alt: "MullenLowe Lintas Group logo",
    accent: "#2B334A",
  },
];
