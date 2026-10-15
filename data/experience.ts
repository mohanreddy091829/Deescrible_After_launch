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
    id: "upsc",
    period: "",
    title: "UPSC prep, then writing",
    description: "Three years of prep taught me how India works. A free portfolio landed my first job.",
    pin: "#7A1018",
  },
  {
    id: "speechwriter",
    period: "",
    title: "Speechwriter to campaign lead",
    description: "The strategy team backed out mid-campaign. I took over. We won.",
    pin: "#C78B87",
  },
  {
    id: "events",
    period: "",
    title: "Events at national scale",
    description: "Led events for the PM, Home Minister and Defence Minister, as the only woman in the office.",
    pin: "#A51C27",
  },
  {
    id: "brands",
    period: "",
    title: "A saree brand, then HUL and ITC",
    description: "Zero sales in two months: trust beats product. Then brand voice for HUL brands and go-to-market for Aashirvaad's masala range.",
    pin: "#A51C27",
  },
  {
    id: "zenwork-deescribble",
    period: "",
    title: "Zenwork, Qentelli, Deescribble",
    description: "Rebuilt a US fintech's brand in six months, Best Place to Work 2024. Then 300K+ followers in about 15 months.",
    pin: "#C78B87",
  },
];

export const JOURNEY_COPY = {
  eyebrow: "01 / THE JOURNEY",
  headingTop: "The",
  headingBottom: "journey.",
  intro: "About ten years, uphill, one lesson at a time.",
};
