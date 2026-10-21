export interface CaseWork {
  name: string;
  /** Client, agency or format, in one short line. */
  meta: string;
  text: string;
}

export interface CaseLink {
  label: string;
  url: string;
  kind: "LinkedIn" | "YouTube" | "Instagram" | "TEDx";
}

export interface CasePhoto {
  src: string;
  alt: string;
  caption?: string;
  /** CSS object-position for the crop. */
  focus?: string;
  /** Phone screenshots keep their tall shape instead of being cropped. */
  tall?: boolean;
}

export interface CaseStudy {
  id: string;
  number: string;
  /** Short chapter name shown on the card. */
  title: string;
  /** The line that opens the expanded case. */
  headline: string;
  /** Small label above the headline, for chapters that carry one. */
  eyebrow?: string;
  /** Role line shown under the headline, for chapters that carry one. */
  role?: string;
  skills: string;
  intro: string[];
  stats?: { value: string; label: string }[];
  work: CaseWork[];
  photos: CasePhoto[];
  links: CaseLink[];
  cover: string;
  coverAlt: string;
  focus: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "fmcg",
    number: "01",
    title: "FMCG & Consumer Strategy",
    headline: "Understanding the consumer. Getting the story right.",
    skills: "Consumer research · Brand positioning · Campaign storytelling · Regional go-to-market",
    intro: [
      "I work at the intersection of consumer understanding and brand communication. My role is to understand the audience, identify what matters to them and translate that understanding into messaging, stories and creative direction.",
      "Across FMCG projects, I've worked on consumer research, regional-market articulation, advertising scripts, brand voice and campaign development, collaborating with agency and client teams to carry the thinking from research into creative execution.",
    ],
    stats: [
      { value: "4", label: "National FMCG brands" },
      { value: "2", label: "Agencies: Lowe Lintas, Curativity" },
    ],
    work: [
      {
        name: "Surf Excel",
        meta: "Hindustan Unilever × Lowe Lintas, Mumbai",
        text: "Joined the team to support South Indian consumer research, articulation and the campaign mood board. When a late-stage voiceover issue threatened the timeline, I practised the voice modulation and recorded the vocals myself to protect the outcome.",
      },
      {
        name: "Glow & Lovely",
        meta: "Hindustan Unilever × Lowe Lintas",
        text: "Shaped the brand voice and the look and feel of the ads for a major HUL beauty brand, helping the agency team decide how to tell the story and what is appropriate.",
      },
      {
        name: "TRESemmé",
        meta: "Hindustan Unilever × Lowe Lintas",
        text: "Brand voice and the look and feel of the ads for a leading HUL haircare brand.",
      },
      {
        name: "Aashirvaad masalas",
        meta: "ITC × Curativity",
        text: "Go-to-market stories for the new masala range, built around stories that break stereotypes and developed alongside a team of women.",
      },
    ],
    photos: [
      { src: "/assets/expertise/fmcg-studio.webp", alt: "Dedeepya recording a voiceover in a studio", caption: "Recording the Surf Excel voiceover", focus: "68% 36%" },
    ],
    links: [
      { kind: "LinkedIn", label: "India didn’t need another dessert: how Belgian Waffle Co. built a ₹100 Cr brand", url: "https://www.linkedin.com/pulse/india-didnt-need-another-dessert-built-100-cr-brand-anyway-abbagani-8roqc" },
      { kind: "LinkedIn", label: "California Burrito: an ode to “ideas need not be perfect but functional”", url: "https://www.linkedin.com/pulse/california-burrito-ode-ideas-need-perfect-functional-abbagani-dsnec" },
    ],
    cover: "/assets/expertise/fmcg-studio.webp",
    coverAlt: "Dedeepya recording a voiceover in a studio",
    focus: "68% 36%",
  },
  {
    id: "tech-b2b",
    number: "02",
    title: "Technology & B2B",
    headline: "Premium doesn’t have to be boring.",
    skills: "Product messaging · Website and design rebuilds · Video podcast · AI-assisted content",
    intro: [
      "B2B buyers are people too. I work with technology and finance brands to turn complicated products into clear messaging, and to give serious companies a voice that people actually want to listen to.",
    ],
    stats: [
      { value: "11", label: "International markets for Microsoft" },
      { value: "6 months", label: "To rebuild Zenwork’s site and communication" },
    ],
    work: [
      {
        name: "Microsoft",
        meta: "Freelance content strategist",
        text: "Structured product messaging and e-commerce buyer-journey content across 11 international markets.",
      },
      {
        name: "Zenwork",
        meta: "US fintech · Tax1099",
        text: "Rebuilt the website, design and communication in six months, and launched the CPA Transformation Podcast, a video series with US finance leaders.",
      },
      {
        name: "Qentelli",
        meta: "Technology services",
        text: "Rebuilt the company website after an audit, using AI to handle much of the heavy lifting.",
      },
    ],
    photos: [
      { src: "/assets/stories/cpa-podcast.webp", alt: "CPA Transformation Podcast, Season 1, episode 1 poster with two guests", caption: "CPA Transformation Podcast, Season 1", focus: "50% 50%" },
      { src: "/assets/expertise/b2b-corporate.webp", alt: "Dedeepya walking through a corporate campus", focus: "50% 16%" },
    ],
    links: [
      { kind: "YouTube", label: "CPA Transformation Podcast, full playlist", url: "https://www.youtube.com/playlist?list=PLECTqeR-CSIRRsThS5QvOZ3sbrsw5HXht" },
    ],
    cover: "/assets/expertise/b2b-corporate.webp",
    coverAlt: "Dedeepya walking through a corporate campus",
    focus: "50% 16%",
  },
  {
    id: "deescribble",
    number: "03",
    title: "Deescribble",
    headline: "300K+ followers, built in about 15 months.",
    skills: "Content strategy · Series and formats · Distribution · Community",
    intro: [
      "Deescribble is the community I founded and still run. It grew from about 100 videos and 40 posts into an audience of 300K+ people, by treating every format as a series and every viewer as part of a conversation.",
      "The Dee-coding Varanasi series is the clearest proof: a five-part Telugu documentary on Kashi, with episodes reaching roughly 2M to 4M views each. AI translation carried the series to viewers beyond Telugu-speaking audiences.",
    ],
    stats: [
      { value: "300K+", label: "Followers" },
      { value: "140M+", label: "Views" },
      { value: "35M+", label: "Interactions" },
      { value: "30.4M", label: "Views, 11 Jul to 8 Oct" },
    ],
    work: [
      {
        name: "Dee-coding Varanasi",
        meta: "Five-part Telugu documentary series",
        text: "Episodes of roughly 2M to 4M views each. Episode 4 reached 4.7M views and episode 2 reached 3.5M, with the series filling the top of the content ranking.",
      },
      {
        name: "Learnings series",
        meta: "Short-form video and LinkedIn",
        text: "Learnings from work and life, including a short LinkedIn series. Several episodes sit among the most saved and most shared content on the account.",
      },
      {
        name: "Audience",
        meta: "Instagram Insights, 11 Jul to 8 Oct",
        text: "1.85M viewers in the period, with about 79.5% of views coming from followers and the rest from people who had not followed yet.",
      },
    ],
    photos: [
      { src: "/assets/casestudies/dee-insights-views.webp", alt: "Instagram Insights content ranking by views, led by Dee-coding Varanasi episodes", caption: "Top content by views", tall: true },
      { src: "/assets/casestudies/dee-insights-reposts.webp", alt: "Instagram Insights content ranking by reposts", caption: "Top content by reposts", tall: true },
      { src: "/assets/casestudies/dee-varanasi-1.webp", alt: "Dedeepya in a pink saree in a Varanasi lane", caption: "Filming in Varanasi", focus: "50% 30%" },
      { src: "/assets/casestudies/dee-varanasi-2.webp", alt: "Dedeepya sitting on the ghat steps in Varanasi", caption: "Kashi ghats", focus: "50% 40%" },
    ],
    links: [
      { kind: "LinkedIn", label: "I built a community of 300K.. but why?", url: "https://www.linkedin.com/pulse/i-built-community-300k-why-dedeepya-abbagani-ximqf" },
      { kind: "Instagram", label: "@deescribble_ on Instagram", url: "https://www.instagram.com/deescribble_/" },
      { kind: "YouTube", label: "Deescribble on YouTube", url: "https://www.youtube.com/@deescribble" },
    ],
    cover: "/assets/hero/dedeepya-hero.webp",
    coverAlt: "Dedeepya, founder of Deescribble",
    focus: "50% 18%",
  },
  {
    id: "personal-branding",
    number: "04",
    title: "Personal & Celebrity Branding",
    eyebrow: "Personal Branding & Strategy",
    headline: "Building how leaders are seen, heard and understood.",
    role: "Brand & Communications Strategist",
    skills: "Positioning · Public communication · Speeches and articles · Launch narratives",
    intro: [
      "Executive positioning, personal brand strategy and public communication for founders, business leaders and public-facing personalities.",
    ],
    work: [
      {
        name: "Film family branding",
        meta: "South Indian film industry",
        text: "Positioning and public communication for one of South India’s biggest film families, including launch work.",
      },
      {
        name: "Founder and executive positioning",
        meta: "Startup founder · Chief Digital Officer",
        text: "Personal brand strategy for the founder of Lifespan and for Qentelli’s Chief Digital Officer, shaping how each is seen, heard and understood.",
      },
      {
        name: "Political leadership",
        meta: "Speeches and articles",
        text: "Speeches and articles for a politician, written to carry a clear message to a public audience.",
      },
    ],
    photos: [
      { src: "/assets/casestudies/celeb-1.webp", alt: "Dedeepya with a film star at an event", focus: "50% 25%" },
      { src: "/assets/casestudies/celeb-2.webp", alt: "Dedeepya with a film star at a celebration", focus: "50% 25%" },
      { src: "/assets/casestudies/celeb-4.webp", alt: "Dedeepya at an evening event", focus: "50% 30%" },
      { src: "/assets/casestudies/celeb-3.webp", alt: "Dedeepya at a styled event venue", focus: "50% 40%" },
    ],
    links: [
      { kind: "LinkedIn", label: "Celebrity Branding: either you tell your story, or someone else will", url: "https://www.linkedin.com/pulse/celebrity-branding-either-you-tell-your-story-someone-abbagani-z90pf" },
    ],
    cover: "/assets/casestudies/celeb-1.webp",
    coverAlt: "Dedeepya with a film star at an event",
    focus: "50% 22%",
  },
  {
    id: "community-speaking",
    number: "05",
    title: "Community & Public Speaking",
    headline: "From the screen to the room.",
    skills: "Keynotes · Panels · Offline meetups · Community hosting",
    intro: [
      "The Deescribble community does not stay online. I host offline meetups for women and artists, where people share stories, celebrate and meet the people behind the screens, and I take the same voice to stages, panels and talks.",
    ],
    work: [
      {
        name: "TEDxVVITU",
        meta: "Guntur, February 2026",
        text: "Spoke on stage at TEDxVVITU.",
      },
      {
        name: "CultureX talks and panels",
        meta: "Talks, panel discussions and interviews",
        text: "Talks and panel conversations in front of live audiences.",
      },
      {
        name: "Deescribble meetups for women",
        meta: "Offline community events",
        text: "Hosted gatherings for women and artists, where the community meets in person to share stories and celebrate.",
      },
    ],
    photos: [
      { src: "/assets/stories/tedx-stage.webp", alt: "Dedeepya speaking on stage at TEDxVVITU", caption: "TEDxVVITU, Guntur", focus: "50% 70%" },
      { src: "/assets/stories/panel-discussion.webp", alt: "Dedeepya in a panel discussion with four other speakers", caption: "Panel discussion", focus: "22% 55%" },
      { src: "/assets/casestudies/women-2.webp", alt: "Dedeepya speaking at a Deescribble meetup for women", focus: "50% 45%" },
      { src: "/assets/casestudies/women-3.webp", alt: "Dedeepya with a microphone among attendees at a meetup", focus: "50% 40%" },
      { src: "/assets/casestudies/women-1.webp", alt: "Dedeepya listening at a community gathering", focus: "50% 40%" },
      { src: "/assets/casestudies/women-4.webp", alt: "Dedeepya celebrating with women at a community event", focus: "50% 40%" },
    ],
    links: [
      { kind: "TEDx", label: "TEDxVVITU event page", url: "https://www.ted.com/tedx/events/65648" },
      { kind: "YouTube", label: "Panel conversation on YouTube", url: "https://www.youtube.com/watch?v=IpZEyUmZXg0" },
    ],
    cover: "/assets/stories/tedx-stage.webp",
    coverAlt: "Dedeepya speaking on stage at TEDxVVITU",
    focus: "50% 60%",
  },
  {
    id: "political",
    number: "06",
    title: "Political Strategy & Events",
    headline: "Campaigns and events at national scale.",
    skills: "Campaign design · Speechwriting · Event production · Government communications",
    intro: [
      "I moved into politics early in my career, shaping messages, speeches and the narrative behind public leaders. Campaigns and events leave no room for rehearsal, so the work is as much logistics and judgement as it is communication.",
    ],
    work: [
      {
        name: "Election campaign",
        meta: "Campaign strategist",
        text: "Took over campaign design mid-election, when the strategy team stepped back, and the campaign won.",
      },
      {
        name: "National-level events",
        meta: "Prime Minister, Home Minister and Defence Minister",
        text: "Ran events for the Prime Minister, Home Minister and Defence Minister, handling labour, permissions, communications and media.",
      },
      {
        name: "Public programmes",
        meta: "Government and community events",
        text: "Event-day work on public programmes, including an International Women’s Day celebration with local performers and children.",
      },
    ],
    photos: [
      { src: "/assets/expertise/political-womens-day.webp", alt: "Dedeepya with children on stage at an International Women's Day government event", caption: "International Women’s Day programme", focus: "50% 40%" },
      { src: "/assets/casestudies/political-drummers.webp", alt: "Dedeepya standing with a group of drummers at an event ground", caption: "With the performers on event day", focus: "50% 35%" },
      { src: "/assets/casestudies/political-stage.webp", alt: "Officials on a flower-decorated stage at a government event", focus: "50% 40%" },
      { src: "/assets/casestudies/political-crowd.webp", alt: "Leaders and supporters at a public programme", focus: "50% 40%" },
      { src: "/assets/work/political-event.webp", alt: "Dedeepya at a national government event with an official in the backdrop", focus: "50% 22%" },
    ],
    links: [],
    cover: "/assets/work/political-event.webp",
    coverAlt: "Dedeepya at a national government event with an official in the backdrop",
    focus: "50% 22%",
  },
];
