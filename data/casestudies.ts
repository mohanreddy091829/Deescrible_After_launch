export interface CaseWork {
  name: string;
  /** Client, agency or format, in one short line. */
  meta: string;
  /** Italic line naming the kind of work. */
  subtitle?: string;
  /** One short paragraph, or several in `body`. */
  text?: string;
  body?: string[];
  contribution?: string[];
  /** The "What this project demonstrates" line. */
  shows?: string;
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
  /** Width divided by height. Screenshots and documents carry their own shape so nothing is cropped; photos default to 4/3. */
  ratio?: number;
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
    headline: "Understanding the consumer, getting the story right.",
    skills: "Consumer research · Brand positioning · Campaign storytelling · Regional go-to-market",
    intro: [
      "I work at the intersection of consumer understanding and brand communication. My role is to understand the audience, identify what matters to them and translate that understanding into messaging, stories and creative direction.",
      "Across FMCG projects, I've worked on consumer research, regional-market articulation, advertising scripts, brand voice and campaign development. The work has involved collaborating with agency and client teams to carry the thinking from research into creative execution.",
    ],
    stats: [
      { value: "4", label: "Advertising projects through Lowe Lintas" },
    ],
    work: [
      {
        name: "Surf Excel",
        meta: "Hindustan Unilever × Lowe Lintas",
        subtitle: "Consumer research, creative articulation and campaign development",
        body: [
          "The assignment involved understanding South Indian consumers and translating those insights into creative inputs for a Surf Excel campaign.",
          "I worked on consumer research, regional articulation and the campaign mood board, travelling across Tirupati, Vijayawada, Guntur and Hyderabad as part of the research. I also worked with the wider team through creative development, including animatics, narramatics and pre-production.",
          "The work meant connecting what we learnt about consumers with the way the campaign was developed and communicated. Research had to become something the creative team could actually use.",
          "During a late-stage execution challenge, I also recorded vocals when the project needed an immediate solution. It was a practical reminder that the work doesn't always stop at the boundaries of a job description.",
        ],
        contribution: [
          "South Indian consumer research and regional articulation.",
          "Inputs for campaign storytelling and mood-board development.",
          "Collaboration on creative iterations and pre-production.",
          "Vocal recording to support an urgent execution requirement.",
        ],
        shows: "Connecting consumer insight to creative decisions, and staying accountable to the work through execution.",
      },
      {
        name: "Glow & Lovely and TRESemmé",
        meta: "Hindustan Unilever × Lowe Lintas",
        subtitle: "Brand voice, regional communication and advertising scripts",
        body: [
          "Through Lowe Lintas, I worked on four advertising projects involving consumer research, regional-market articulation and campaign storytelling for HUL brands, including Glow & Lovely and TRESemmé.",
          "The work involved developing and refining scripts, working with the agency team on animatics and pre-production, and contributing to how the campaign narrative was articulated for South Indian audiences.",
          "I also presented campaign concepts at HUL's head office and worked through feedback and iterations with the wider team.",
          "The focus was to make the communication work for the intended audience while staying true to the brand's requirements and creative direction.",
        ],
        contribution: [
          "Consumer research and regional-market understanding.",
          "Script development and creative articulation.",
          "Inputs on campaign look and feel and brand voice.",
          "Collaboration through creative development and stakeholder feedback.",
        ],
      },
      {
        name: "ITC Aashirvaad MasterChef Masalas",
        meta: "Curativity",
        subtitle: "Brand positioning, consumer research and regional go-to-market",
        body: [
          "The assignment focused on repositioning Aashirvaad Masalas for the non-vegetarian masala segment and developing a campaign narrative for the Telugu market.",
          "My role involved understanding the regional consumer context, developing the storyline and translating that thinking into advertising communication.",
          "The work included a Telugu-market script informed by consumer behaviour, and regional input during post-production.",
        ],
      },
    ],
    photos: [
      { src: "/assets/casestudies/surf-script.webp", alt: "Surf Excel script with Telugu lines and their English back-translation", caption: "Surf Excel script, with the Telugu lines and English back-translation", ratio: 900 / 600 },
      { src: "/assets/casestudies/surf-script-vo.webp", alt: "Surf Excel voiceover lines in Hindi, Telugu and English", caption: "Voiceover lines in Hindi, Telugu and English", ratio: 1200 / 582 },
      { src: "/assets/casestudies/surf-storyboard.webp", alt: "Surf Excel storyboard frames with Telugu and Hindi super text", caption: "Storyboard frames with Telugu super text", ratio: 1050 / 1110 },
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
    skills: "Product messaging · Website and design rebuilds · Video podcast · Thought leadership · AI-assisted content",
    intro: [
      "B2B buyers are people too. I work with technology and finance brands to turn complicated products into clear messaging, and to give serious companies a voice that people actually want to listen to.",
    ],
    stats: [
      { value: "11", label: "International markets for Microsoft" },
      { value: "6 months", label: "To rebuild Zenwork’s site and communication" },
    ],
    work: [
      {
        name: "Qentelli",
        meta: "Lead Content Strategist and Brand Voice Architect, February to December 2025",
        text: "Led the revamp of the website, blog and case-study content for the global SaaS firm. Developed new brand guidelines, rewrote corporate narratives and tuned tone and messaging across channels, after an audit, using AI to handle much of the heavy lifting.",
      },
      {
        name: "Zenwork",
        meta: "SaaS and fintech, July to December 2024",
        text: "Built multi-channel content strategy across LinkedIn, blogs, YouTube and social, ran ad campaigns for B2B SaaS products, and wrote thought-leadership articles and whitepapers. Rebuilt the website, design and communication, and launched the CPA Transformation Podcast with US finance leaders: guest research, scripts, episode structure, trailers and teasers.",
      },
      {
        name: "Microsoft WebXT Shopping",
        meta: "Content Curator (Contract)",
        body: [
          "Worked on the e-commerce discovery ecosystem for Microsoft's WebXT division across 11 global markets. Curated, categorised and audited high-volume retail data feeds to train AI-driven shopping modules for Bing and Microsoft Edge, keeping product taxonomy localised and data quality strict across borders, so that users stayed engaged and merchant information stayed accurate.",
          "Partnered with engineering workflows to refine content extraction pipelines, turning raw product data into visually rich, intuitive regional shopping pages built to convert.",
        ],
      },
      {
        name: "RunSurf.co",
        meta: "Brand Strategy & GTM Consultant, 1-month consulting engagement",
        body: [
          "Defined the brand language and tone of voice to establish a consistent brand identity, and structured the social media approach, including content direction and platform communication.",
          "Contributed to the brand’s go-to-market foundation through strategic messaging and communication planning.",
        ],
      },
      {
        name: "Spectraforce",
        meta: "UX copywriter and campaign strategist, March to April 2024",
        text: "Wrote interactive, conversational web content for the launch of a new community initiative and designed the flow and structure of its campaigns.",
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
        name: "The content approach",
        meta: "Founder and Content Strategist",
        body: [
          "Content built around careers, professional life and emotional wellbeing, combining workplace understanding with an empathetic, relatable voice. Audience understanding shapes the topics, formats, narratives and distribution.",
          "AI-assisted translation extends regional-language storytelling to audiences beyond the original language market.",
        ],
      },
    ],
    photos: [
      { src: "/assets/casestudies/dee-insights.webp", alt: "Instagram Insights content ranking by views, led by Dee-coding Varanasi episodes", caption: "Top content by views", ratio: 1000 / 1407 },
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
        name: "Allu Nayanika Reddy",
        meta: "Personal Branding Consultant, 1-month consulting engagement",
        body: [
          "Consulted on personal branding and public-facing communication ahead of a major launch into the Allu family’s public spotlight.",
          "Shaped the tone, narrative and communication direction of the personal brand, to support a clear, consistent public identity.",
        ],
      },
      {
        name: "Lifespan health & wellness",
        meta: "Brand revamp, September to November 2024",
        text: "Built the marketing strategy for the retail business, handled influencer marketing and PR, and led the personal branding of the founder.",
      },
      {
        name: "Qentelli leadership",
        meta: "Chief Digital Officer",
        text: "Positioning and public communication for the Chief Digital Officer, alongside the company’s brand and content revamp.",
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
    skills: "Campaign design · Speechwriting · Event content · Government communications",
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
        name: "Events with the Prime Minister",
        meta: "Access Events, 2022 to 2024",
        text: "Secured and managed central government projects, with content strategy for three mega events with the Prime Minister, covering brochures, social media and video.",
      },
      {
        name: "Home and Defence Ministry events",
        meta: "Access Events",
        text: "Media content for events with the Home Minister and the Defence Minister, handling labour, permissions, communications and media, and coordinating with the Special Protection Group and central forces for secure delivery.",
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
