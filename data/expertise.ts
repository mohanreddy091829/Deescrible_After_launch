export interface ExpertiseProof {
  label: string;
  period?: string;
  text: string;
}

export interface ExpertisePillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  /** The three short lines shown on the card. */
  tags: string[];
  image: string;
  /** CSS object-position for the card crop. */
  focus?: string;
  imageAlt: string;
  credit: { title: string; author: string; license: string; url: string };
  description: string;
  /** One-line positioning shown at the top of the expanded view. */
  lead: string;
  /** How the work actually happens, in order. */
  how: { step: string; text: string }[];
  deliverables: string[];
  /** Real engagements and results this pillar draws on. */
  proof: ExpertiseProof[];
  bestFor: string;
  cta: string;
}

const MLL = "via MullenLowe Lintas Group";

export const EXPERTISE_PILLARS: ExpertisePillar[] = [
  {
    id: "fmcg-strategy",
    number: "01",
    title: "FMCG & Consumer Brand Strategy",
    subtitle: "Consumer insight, regional campaigns, and brand storytelling.",
    tags: ["Consumer insights", "Regional campaigns", "Brand storytelling"],
    image: "/assets/expertise/01-fmcg.webp",
    focus: "50% 55%",
    imageAlt: "A supermarket aisle lined with household cleaning brands",
    credit: { title: "Supermarket aisle, Białystok", author: "Rakoon", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:20221012_124131_October_2022_in_Białystok.jpg" },
    description:
      "Crafting narratives for mass consumer brands across India's regional cultures — turning consumer hesitation and everyday rituals into stories that drive trial, affinity and shelf recall.",
    lead: "Regional insight, turned into campaigns that feel local rather than translated.",
    how: [
      { step: "Listen first", text: "Vernacular and linguistic research to find the ritual behind the purchase — childhood play for Surf Excel, the family kitchen for Aashirvaad." },
      { step: "Frame the truth", text: "Place the product inside a moment the consumer already owns: quiet confidence before a career milestone, or the office-to-dinner hair day." },
      { step: "Carry it everywhere", text: "From the TVC script to the digital vignette, the social series and the supermarket activation line — one idea, every touchpoint." },
    ],
    deliverables: [
      "Regional & vernacular campaign messaging",
      "Consumer psyche & cultural insight mapping",
      "TVC and digital narrative concepts",
      "Packaging copy & point-of-sale storytelling",
    ],
    proof: [
      { label: "Surf Excel", period: "2023–24", text: "Regional TVC scripts, digital vignettes and social stories for South Indian family and festive contexts." },
      { label: "Glow & Lovely", period: "2023–24", text: "Self-reliance and quiet-confidence narratives for young women, with influencer storytelling guidelines." },
      { label: "TRESemmé", period: "2023–24", text: "Social series and how-to formats that made a salon-grade regimen feel like a daily ritual." },
      { label: "ITC Aashirvaad", period: "2023–24", text: "Regional culinary campaigns for Andhra and Telangana built on generational kitchen memories." },
    ],
    bestFor: `Brand and agency teams localising national brands for South India. Work delivered ${MLL}.`,
    cta: "Discuss a consumer brief",
  },
  {
    id: "community-building",
    number: "02",
    title: "Community Building & Storytelling",
    subtitle: "Content strategy, audience growth, and creative direction.",
    tags: ["Content strategy", "Audience growth", "Creative direction"],
    image: "/assets/expertise/02-community.webp",
    focus: "50% 38%",
    imageAlt: "Hands holding a smartphone and a notebook",
    credit: { title: "Woman sits on a chair holding a smartphone and a notebook", author: "Shixart1985", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Woman_sits_on_a_chair_holding_a_smartphone_and_a_notebook.jpg" },
    description:
      "Turning content from a broadcast into a conversation — repeatable episodic formats that build organic engagement, loyalty and distribution you don't have to buy.",
    lead: "From one-way content to a community that talks back.",
    how: [
      { step: "Design a format, not a post", text: "Episodic series with a clear promise, so people know what they are coming back for." },
      { step: "Earn trust before reach", text: "Growth stays organic: 300K+ followers on Instagram built without paid acquisition." },
      { step: "Close the loop", text: "Comments, replies and polls double as a live consumer-research channel that feeds the next episode." },
    ],
    deliverables: [
      "Episodic content series design",
      "Community & engagement playbooks",
      "Audience research feedback loops",
      "Cross-platform distribution strategy",
    ],
    proof: [
      { label: "Deescribble", period: "2024–25", text: "A personal storytelling project grown into a 300K+ Instagram community with millions of views." },
      { label: "Content series", text: "20+ structured series — from brand breakdowns and ad stories to Varanasi diaries." },
      { label: "LinkedIn", text: "4.5K+ followers for long-form case studies on how brands are built." },
    ],
    bestFor: "Brands, founders and creators who want a distribution built on trust and aspiration, not ad spend.",
    cta: "Plan a community",
  },
  {
    id: "founder-branding",
    number: "03",
    title: "Founder, Executive & Celebrity Branding",
    subtitle: "Personal positioning, thought leadership, and strategic content.",
    tags: ["Personal positioning", "Thought leadership", "Strategic content"],
    image: "/assets/expertise/03-founder.webp",
    focus: "50% 50%",
    imageAlt: "A gooseneck microphone on a podium against blurred stage lights",
    credit: { title: "Gooseneck microphone on podium with stage bokeh lights", author: "A S M Jobaer", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Gooseneck_microphone_on_podium_with_stage_bokeh_lights.jpg" },
    description:
      "Distilling a leader's conviction into a personal brand people recognise — so founders become the authority that attracts talent, partners and loyal customers.",
    lead: "Make the person behind the company the clearest part of the story.",
    how: [
      { step: "Find the conviction", text: "What does this leader believe that the category doesn't? That belief is the spine of the brand." },
      { step: "Build the narrative", text: "A core thesis, a point of view and the proof points that back it up." },
      { step: "Put it to work", text: "LinkedIn thought-leadership, keynote talking points and podcast positioning that stay consistent." },
    ],
    deliverables: [
      "Founder narrative & core thesis",
      "Executive LinkedIn programmes",
      "Keynote and podcast positioning",
      "Reputation and crisis messaging",
    ],
    proof: [
      { label: "Leadership positioning", text: "Positioned founders and C-suite leaders at Lifespan, Qentelli and technology ventures." },
      { label: "Own platform", text: "Built a personal brand into a 300K+ community and a TEDx stage." },
    ],
    bestFor: "Founders and executives who want to be known for a point of view rather than a job title.",
    cta: "Shape a founder story",
  },
  {
    id: "tech-marketing",
    number: "04",
    title: "Corporate, Technology & Digital Marketing",
    subtitle: "Content strategy, product messaging, and digital communication.",
    tags: ["Content strategy", "Product messaging", "SEO & growth"],
    image: "/assets/expertise/04-tech.webp",
    focus: "35% 50%",
    imageAlt: "A laptop showing an e-commerce analytics dashboard",
    credit: { title: "Interpreting Ecommerce Website Analytics", author: "Zuko.io Images", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Interpreting_Ecommerce_Website_Analytics.jpg" },
    description:
      "Turning complex software and technology into value propositions a business buyer can grasp in one read and champion internally.",
    lead: "Complex products, explained so buyers can champion them.",
    how: [
      { step: "Map the buyer", text: "Who evaluates, who signs, and what each of them needs to hear first." },
      { step: "Standardise the message", text: "Templates for business ROI, collaboration and hybrid work that localise cleanly across markets." },
      { step: "Make it findable", text: "SEO-aware product messaging, landing-page copy and feature-benefit matrices." },
    ],
    deliverables: [
      "B2B product narrative & buyer journeys",
      "Multi-market go-to-market content",
      "Case studies, whitepapers and solution briefs",
      "SEO-aligned messaging frameworks",
    ],
    proof: [
      { label: "Microsoft", period: "2023", text: "E-commerce content across 11 international markets: landing pages, spec breakdowns, feature-benefit matrices, retail guides." },
      { label: "Zenwork", text: "Enterprise content for a tax and compliance platform." },
      { label: "Qentelli", period: "2025", text: "Content for a digital-transformation and AI engineering company." },
    ],
    bestFor: "B2B and SaaS teams that need clear, consistent product messaging across markets and channels.",
    cta: "Talk product messaging",
  },
  {
    id: "political-strategy",
    number: "05",
    title: "Political Strategy & Public Communication",
    subtitle: "Campaign communication, speechwriting, and media coordination.",
    tags: ["Campaign content", "Speechwriting", "Media coordination"],
    image: "/assets/expertise/05-political.webp",
    focus: "50% 50%",
    imageAlt: "Sansad Bhavan, the Parliament House of India, at dusk",
    credit: { title: "Sansad Bhavan", author: "Daderot", license: "Public domain", url: "https://commons.wikimedia.org/wiki/File:Sansad_Bhavan_IMG_2152.JPG" },
    description:
      "Public communication for leaders working through complex socio-political ground — turning policy and grassroots manifestos into stories people can repeat.",
    lead: "Policy, translated into a language people can repeat.",
    how: [
      { step: "Know the ground", text: "Constituency and demographic message targeting before a word is written." },
      { step: "Write for the room", text: "Speeches, talking points and debate preparation tuned to the audience in front of the leader." },
      { step: "Keep every channel aligned", text: "Press, social and field messaging coordinated, with rapid-response lines ready." },
    ],
    deliverables: [
      "Constituency & demographic message targeting",
      "Speechwriting and debate preparation",
      "Press and social coordination",
      "Rapid-response counter-messaging",
    ],
    proof: [
      { label: "Campaign communication", text: "Advisory and content for high-visibility regional political campaigns and civic initiatives." },
      { label: "Confidential", text: "Engagements are not named here; details are shared in conversation." },
    ],
    bestFor: "Campaign teams and civic initiatives that need disciplined, consistent public communication.",
    cta: "Start a conversation",
  },
  {
    id: "documentary-speaking",
    number: "06",
    title: "Documentaries, Speaking & Thought Leadership",
    subtitle: "Cultural storytelling, public speaking, and published ideas.",
    tags: ["Cultural storytelling", "Public speaking", "Published ideas"],
    image: "/assets/expertise/06-documentary.webp",
    focus: "50% 55%",
    imageAlt: "Wooden boats on the Ganges at sunrise, Varanasi",
    credit: { title: "Boats at sunrise, Ganges River, Varanasi", author: "Schwiki", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Boats_at_sunrise_Ganges_River_Varanasi_Uttar_Pradesh_Schwiki.jpg" },
    description:
      "Long-form stories about culture, ritual and people — on camera, on stage and in print.",
    lead: "Stories about people and place, told at a length that lets them breathe.",
    how: [
      { step: "Go to the source", text: "Time with the people and places behind the story before any scripting begins." },
      { step: "Find the through-line", text: "One human question that holds the documentary, the talk or the essay together." },
      { step: "Take it public", text: "A film, a stage, a published piece — each cut to suit where the audience is." },
    ],
    deliverables: [
      "Documentary research, scripting and direction",
      "TEDx talks and panel moderation",
      "Brand essays and teardowns",
      "Storytelling workshops",
    ],
    proof: [
      { label: "Decoding Varanasi", text: "An independent cultural documentary about the city's people, culture and stories." },
      { label: "TEDx", text: "A talk on the craft and impact of authentic storytelling." },
      { label: "Brand teardowns", text: "Published case studies, including how Belgian Waffle Co. built a 100 Cr brand." },
    ],
    bestFor: "Organisers, publishers and brands that want cultural storytelling with substance.",
    cta: "Invite me to speak",
  },
];
