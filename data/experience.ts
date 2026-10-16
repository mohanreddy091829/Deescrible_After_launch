export interface Chapter {
  n: string;
  title: string;
  kicker: string;
  text: string;
}

export const JOURNEY_COPY = {
  eyebrow: "04 / The journey",
  heading: "Six chapters. One craft.",
  intro: "About ten years of learning to build a brand, one lesson at a time. Each chapter added a skill the next one needed.",
};

/** Previous work, in the order it happened. */
export const CHAPTERS: Chapter[] = [
  { n: "01", title: "Freelance content writer", kicker: "Where it began", text: "Started by writing for brands and people, learning how a clear sentence earns attention and trust." },
  { n: "02", title: "Political strategist", kicker: "Strategy", text: "Moved into politics, shaping messages, speeches and the narrative behind public leaders." },
  { n: "03", title: "Political campaigns", kicker: "Campaigns", text: "Worked on election campaigns, including taking over campaign design mid-election and winning." },
  { n: "04", title: "National-level events", kicker: "Events", text: "Ran events at the national level for the Prime Minister, Home Minister and Defence Minister, handling labour, permissions, communications and media." },
  { n: "05", title: "FMCG brands", kicker: "Consumer brands", text: "Brand voice and storytelling for HUL and ITC brands, including Surf Excel, Glow & Lovely, TRESemmé and Aashirvaad." },
  { n: "06", title: "Brand strategist and political consultant", kicker: "Today", text: "Brand strategy for consumer and corporate brands, including Zenwork and Qentelli, alongside political consulting and the Deescribble community of 300K+." },
];
