export interface ExpertisePillar {
  id: string;
  number: string;
  title: string;
  /** Bold one-liner under the title. */
  oneLiner: string;
  /** Supporting paragraph shown on the card. The cards are display-only: nothing opens. */
  text: string;
  image: string;
  /** CSS object-position for the crop. */
  focus?: string;
  imageAlt: string;
  credit: { title: string; author: string; license: string; url: string };
}

export const EXPERTISE_PILLARS: ExpertisePillar[] = [
  {
    id: "fmcg-strategy",
    number: "01",
    title: "FMCG brand storytelling",
    oneLiner: "Brand voice for national HUL and ITC brands.",
    text: "Brand voice and the look and feel of the ads for TRESemm\u00e9 and Glow & Lovely, through Lowe Lintas. Helped agency teams decide how to tell the story and what is appropriate. Go-to-market stories for Aashirvaad's new masala range, with a team of women.",
    image: "/assets/expertise/fmcg-studio.webp",
    focus: "68% 36%",
    imageAlt: "Dedeepya recording a voiceover in a studio",
    credit: { title: "Supermarket aisle, Białystok", author: "Rakoon", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:20221012_124131_October_2022_in_Białystok.jpg" },
  },
  {
    id: "community-building",
    number: "02",
    title: "Content and community",
    oneLiner: "300K+ followers in about 15 months.",
    text: "Built Deescribble to 300K+ followers across about 100 posts. Series, formats, distribution and offline meetups for women and artists.",
    image: "/assets/expertise/community-instagram.webp",
    focus: "50% 30%",
    imageAlt: "The Deescribble Instagram profile",
    credit: { title: "Woman sits on a chair holding a smartphone and a notebook", author: "Shixart1985", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Woman_sits_on_a_chair_holding_a_smartphone_and_a_notebook.jpg" },
  },
  {
    id: "founder-branding",
    number: "03",
    title: "Personal and celebrity branding",
    oneLiner: "Helping leaders be seen, heard and understood.",
    text: "Positioning and public communication for one of South India's biggest film families, a startup founder and a Chief Digital Officer, plus speeches and articles for a politician. The lessons are written up in a LinkedIn article.",
    image: "/assets/expertise/personal-branding-celeb.webp",
    focus: "50% 12%",
    imageAlt: "Dedeepya with a film star at an evening event",
    credit: { title: "Gooseneck microphone on podium with stage bokeh lights", author: "A S M Jobaer", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Gooseneck_microphone_on_podium_with_stage_bokeh_lights.jpg" },
  },
  {
    id: "tech-marketing",
    number: "04",
    title: "B2B and digital growth",
    oneLiner: "Premium doesn't have to be boring.",
    text: "Rebuilt Zenwork's website, design and communication in six months, and launched a video podcast with US finance leaders. Rebuilt Qentelli's site after an audit, using AI to handle much of the heavy lifting.",
    image: "/assets/expertise/b2b-corporate.webp",
    focus: "50% 16%",
    imageAlt: "Dedeepya walking through a corporate campus",
    credit: { title: "Interpreting Ecommerce Website Analytics", author: "Zuko.io Images", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Interpreting_Ecommerce_Website_Analytics.jpg" },
  },
  {
    id: "political-strategy",
    number: "05",
    title: "Political campaigns and events",
    oneLiner: "Campaigns and events at national scale.",
    text: "Took over campaign design mid-election and won. Ran events for the Prime Minister, Home Minister and Defence Minister, handling labour, permissions, communications and media.",
    image: "/assets/expertise/political-womens-day.webp",
    focus: "50% 40%",
    imageAlt: "Dedeepya with children on stage at an International Women's Day government event",
    credit: { title: "Sansad Bhavan", author: "Daderot", license: "Public domain", url: "https://commons.wikimedia.org/wiki/File:Sansad_Bhavan_IMG_2152.JPG" },
  },
  {
    id: "documentary-speaking",
    number: "06",
    title: "Regional storytelling at scale",
    oneLiner: "Regional language isn't a ceiling.",
    text: "Created a five-part Telugu documentary on Kashi, with episodes reaching roughly 2M\u20134M views each. AI translation helped the series reach audiences beyond Telugu-speaking viewers. Worked with leadership on South India distribution strategy for HUL and ITC brands.",
    image: "/assets/expertise/regional-folk-festival.webp",
    focus: "50% 35%",
    imageAlt: "Dedeepya with costumed folk performers at a Telugu street festival",
    credit: { title: "Boats at sunrise, Ganges River, Varanasi", author: "Schwiki", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Boats_at_sunrise_Ganges_River_Varanasi_Uttar_Pradesh_Schwiki.jpg" },
  },
];
