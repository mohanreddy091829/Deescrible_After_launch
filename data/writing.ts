export interface Article {
  id: string;
  platform: "LinkedIn" | "Substack";
  title: string;
  excerpt: string;
  /** ISO date the piece went live. */
  date: string;
  url: string;
  image: string;
  imageAlt: string;
}

export const WRITING_LINKS = {
  linkedin: "https://www.linkedin.com/in/dedeepya-abbagani/recent-activity/articles/",
  substack: "https://substack.com/@deewithapen",
};

/** Newest first. Three from LinkedIn and everything she has published on Substack so far. */
export const ARTICLES: Article[] = [
  {
    id: "bigger-than-your-circle",
    platform: "Substack",
    title: "The realisation that the world is bigger than your current circle",
    excerpt: "Why we hold on to draining friendships, what they cost us, and how to make room for better ones.",
    date: "2026-10-21",
    url: "https://deewithapen.substack.com/p/the-people-you-keep-out-of-fear",
    image: "/assets/writing/circle.webp",
    imageAlt: "Cover of the Substack post about the world being bigger than your current circle",
  },
  {
    id: "emotion-currency",
    platform: "Substack",
    title: "Your emotion is your currency!",
    excerpt: "You can build a career out of your strongest emotion. Ask me how.",
    date: "2026-10-07",
    url: "https://deewithapen.substack.com/p/your-emotion-is-your-currency",
    image: "/assets/writing/emotion.webp",
    imageAlt: "Cover of the Substack post Your emotion is your currency",
  },
  {
    id: "celebrity-branding",
    platform: "LinkedIn",
    title: "Celebrity Branding: either you tell your story, or someone else will",
    excerpt: "People think celebrity branding is photoshoots, red carpets and big announcements. A compilation of practical learnings.",
    date: "2026-09-27",
    url: "https://www.linkedin.com/pulse/celebrity-branding-either-you-tell-your-story-someone-abbagani-z90pf",
    image: "/assets/writing/celeb-branding.webp",
    imageAlt: "Dedeepya with a film star at an evening event",
  },
  {
    id: "community-300k",
    platform: "LinkedIn",
    title: "I built a community of 300K.. but why?",
    excerpt: "It changed how I think about distribution forever.",
    date: "2026-09-21",
    url: "https://www.linkedin.com/pulse/i-built-community-300k-why-dedeepya-abbagani-ximqf",
    image: "/assets/writing/community.webp",
    imageAlt: "Cover of the LinkedIn article on building a community of 300K",
  },
  {
    id: "belgian-waffle",
    platform: "LinkedIn",
    title: "India didn’t need another dessert. They built a ₹100 Cr brand anyway.",
    excerpt: "How Belgian Waffle Co. scaled a non-obvious product into a ₹100 Cr+ brand.",
    date: "2025-05-02",
    url: "https://www.linkedin.com/pulse/india-didnt-need-another-dessert-built-100-cr-brand-anyway-abbagani-8roqc",
    image: "/assets/writing/waffle.webp",
    imageAlt: "Cover of the LinkedIn article on Belgian Waffle Co.",
  },
];
