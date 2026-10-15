export interface NavItem {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: "Dedeepya Abbagani",
  title: "Brand storyteller & community builder",
  tagline: "Trust first. Then everything else.",
  supportingText:
    "Brand voice, storytelling and community for consumer brands, B2B companies and founders. Trust first. Then distribution. Then scale.",
  bioSummary:
    "I left three years of UPSC prep to write. That led to speechwriting, a winning election campaign, events for the Prime Minister, brand work for HUL and ITC, a US fintech rebrand, and Deescribble, at 300K+ followers in about 15 months. Each step taught me one piece of building a brand. I say yes first, then learn fast.",
  email: "dedeepyajprwork@gmail.com",
  /** Where enquiries and the contact links go. */
  enquiryEmail: "dedeepyajprwork@gmail.com",
  location: "Hyderabad, India",
  socials: {
    instagram: "https://www.instagram.com/deescribble_/",
    linkedin: "https://www.linkedin.com/in/dedeepya-abbagani/",
    youtube: "https://www.youtube.com/@deescribble",
  },
  communitySize: "300K+",
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "Journey", href: "#journey" },
    { label: "Expertise", href: "#expertise" },
    { label: "Work", href: "#work" },
    { label: "Deescribble", href: "#deescribble" },
    { label: "Ideas", href: "#ideas" },
    { label: "Let's Talk", href: "#cta" },
  ] as NavItem[],
  heroNav: [
    { label: "ABOUT", href: "#journey" },
    { label: "WORK", href: "#work" },
    { label: "SERVICES", href: "#expertise" },
    { label: "SPEAKING", href: "#ideas" },
    { label: "COMMUNITY", href: "#deescribble" },
  ] as NavItem[],
  quickNavLinks: [
    { label: "WORKS", href: "#work" },
  ] as NavItem[],
  bookingCta: { label: "Get in touch", href: "/consultation" },
};
