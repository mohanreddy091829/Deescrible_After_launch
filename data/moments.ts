/**
 * Cards for the "Moments" section. Each card cycles through its own `images`; the card layout (position,
 * tilt, stacking) is purely visual and lives here so it can be tuned without touching the component.
 *
 * !! The pictures are PLACEHOLDERS already in the project (illustrative stock photos). Replace the `images`
 * !! paths with Dedeepya's own photographs (events, travel, shoots, speaking) as they arrive. Add or remove
 * !! images per card freely; the cycle adapts to the list length.
 */
export interface MomentCard {
  label: string;
  /** Line printed under the label. */
  caption: string;
  /** public paths; at least one. */
  images: { src: string; alt: string }[];
  /** desktop fan: left/top as % of the fan box, z-index, tilt in degrees; width optional (CSS length). */
  x: string;
  y: string;
  z: number;
  r: number;
  w?: string;
  /** mobile tilt (degrees) */
  rm: number;
}

const E = "/assets/expertise";
const W = "/assets/work";
const S = "/assets/stories";

export const MOMENTS: MomentCard[] = [
  { label: "Kashi", caption: "A Telugu film on Kashi, adopted across India.", x: "0%", y: "4%", z: 2, r: -4, rm: -3, images: [{ src: `${S}/kashi-sunset.webp`, alt: "Dedeepya looking out over the Varanasi ghats at sunset" }, { src: `${E}/06-documentary.webp`, alt: "Boats on the Ganges at sunrise" }] },
  { label: "On Stage", caption: "From writing speeches to running PM events.", x: "5%", y: "55%", z: 4, r: 3, rm: 3, images: [{ src: `${E}/03-founder.webp`, alt: "A microphone against stage lights" }, { src: `${S}/tedx-onstage.webp`, alt: "Dedeepya speaking on stage at TEDxVVITU" }, { src: `${S}/panel-discussion.webp`, alt: "Dedeepya in a panel discussion" }] },
  { label: "The Brief", caption: "Every story starts with the brief.", x: "34%", y: "0%", z: 3, r: 3, rm: 2, images: [{ src: `${E}/02-community.webp`, alt: "Hands holding a phone and notebook" }, { src: `${S}/brand-conversations.webp`, alt: "Hands writing in a notebook" }, { src: `${E}/04-tech.webp`, alt: "A laptop with an analytics dashboard" }] },
  { label: "On Shelf", caption: "From the script to the supermarket shelf.", x: "38%", y: "54%", z: 5, r: -3, rm: -3, images: [{ src: `${E}/01-fmcg.webp`, alt: "A supermarket aisle of household brands" }, { src: `${W}/tresemme.webp`, alt: "A shampoo bottle wrapped in golden hair" }, { src: `${W}/itc-aashirvaad.webp`, alt: "Colourful bins of spices at a market" }] },
  { label: "Every Day", caption: "Writing, every day.", x: "68%", y: "5%", z: 2, r: -3, rm: 3, images: [{ src: `${W}/surf-excel.webp`, alt: "Children playing football on a muddy ground" }, { src: `${W}/glow-and-lovely.webp`, alt: "Hands holding an open jar of cream" }, { src: `${S}/belgian-waffle-analysis.webp`, alt: "A display of waffles with fruit and cream" }] },
  { label: "The System", caption: "Audit first. Then question the default.", x: "72%", y: "57%", z: 4, r: 4, rm: -2, images: [{ src: `${W}/microsoft.webp`, alt: "A laptop on a white desk" }, { src: `${E}/05-political.webp`, alt: "Sansad Bhavan at dusk" }] },
];
