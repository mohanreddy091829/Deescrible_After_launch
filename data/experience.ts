export interface JourneyMilestone {
  id: string;
  /** Display period, exactly as in the approved design. */
  period: string;
  title: string;
  description: string;
  /** Pin colour on the ridge line. */
  pin: string;
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "beginner",
    period: "2016 – 2020",
    title: "The Curious Beginner",
    description: "Fell in love with words, ideas and the power of stories.",
    pin: "#7A1018",
  },
  {
    id: "exploring",
    period: "2020 – 2022",
    title: "Exploring Possibilities",
    description: "From content to strategy, from niches to industries.",
    pin: "#C78B87",
  },
  {
    id: "building-brands",
    period: "2023 – 2024",
    title: "Building Brands",
    description: "Worked with global and Indian brands across FMCG, tech, lifestyle and more.",
    pin: "#A51C27",
  },
  {
    id: "deescribble",
    period: "2024 – 2025",
    title: "Deescribble",
    description: "Turned my passion into a 300K+ strong community.",
    pin: "#A51C27",
  },
  {
    id: "larger-conversations",
    period: "2025 – 2026",
    title: "Larger Conversations",
    description: "From documentaries to TEDx, exploring stories beyond brands.",
    pin: "#C78B87",
  },
];

export const JOURNEY_COPY = {
  eyebrow: "01 / THE JOURNEY",
  headingTop: "A curious mind",
  headingBottom: "with a growing canvas.",
  intro:
    "From a curious beginner to a strategy consultant working with leading brands, building a 300K+ community and exploring stories beyond brands — here's how it all connects.",
};
