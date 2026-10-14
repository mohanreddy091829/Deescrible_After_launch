export interface NavItem {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: "Dedeepya Abbagani",
  title: "Branding Expert & Strategy Consultant",
  tagline: "Ideas, Strategies, Stories that create real impact.",
  supportingText:
    "Helping brands, people and ideas find the right voice — from FMCG campaigns to 300K+ stories, I turn complex ideas into narratives that connect, convert and last.",
  bioSummary:
    "A growth map of a curious strategist who turns complex ideas into stories that connect, convert and create real impact.",
  email: "dedeepya.abbagani@gmail.com",
  /** Placeholder enquiry details: replace with the real ones before launch. */
  enquiryEmail: "hello@dedeepyaabbagani.com",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
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
    { label: "Let's Talk", href: "#booking" },
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
  bookingCta: { label: "Book a Consultation", href: "#booking" },
};
