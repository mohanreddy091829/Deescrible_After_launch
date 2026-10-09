/**
 * Hero brush composition, authored in a 1448 × 700 design space (the approved reference).
 * Colours follow the restrained palette: terracotta, ochre, dusty blue, sage, rose, warm beige.
 */
export type Pt = [number, number];

export interface Stroke {
  /** cubic bezier P0..P3 */
  path: [Pt, Pt, Pt, Pt];
  width: number;
  /** two or three pigment stops from start → end of the stroke */
  colors: string[];
  alpha: number;
  /** 0 = clean edge, 1 = heavily frayed dry-brush tail */
  dry?: number;
  bristles?: number;
  /** reveal timing in ms */
  delay: number;
  duration: number;
}

export interface InkLine {
  path: [Pt, Pt, Pt, Pt];
  width: number;
  colors: [string, string, string];
}

export interface Specks {
  x: number;
  y: number;
  r: number;
  n: number;
  color: string;
}

/**
 * Painted back-to-front. A compact cluster hugs each side of the portrait (head centre ≈ 690,210;
 * hair spans x 520–870): every stroke is rooted behind her and only peeks a little beyond the
 * silhouette, so the paint frames her instead of running across the page.
 */
export const STROKES: Stroke[] = [
  // soft pigment halo behind head and shoulders
  { path: [[520, 170], [590, 80], [800, 80], [880, 190]], width: 200, colors: ["#F6D3B0", "#F2C7A0"], alpha: 0.22, dry: 0.15, bristles: 90, delay: 0, duration: 700 },

  // --- gap fillers: close the white space between the left and right clusters ---
  { path: [[540, 112], [640, 30], [780, 28], [880, 100]], width: 74, colors: ["#F2D3A8", "#EDC892"], alpha: 0.42, dry: 0.45, delay: 60, duration: 800 },
  { path: [[684, 132], [592, 152], [502, 216], [424, 252]], width: 50, colors: ["#E2A0AB", "#D98A93"], alpha: 0.5, dry: 0.6, delay: 240, duration: 800 },
  { path: [[604, 272], [522, 276], [442, 312], [372, 352]], width: 58, colors: ["#F0A987", "#E58C6A"], alpha: 0.55, dry: 0.65, delay: 320, duration: 800 },
  { path: [[742, 132], [822, 122], [892, 152], [942, 188]], width: 56, colors: ["#F0C3A0", "#E8A98A"], alpha: 0.5, dry: 0.55, delay: 420, duration: 700 },
  { path: [[784, 256], [852, 246], [906, 272], [946, 302]], width: 46, colors: ["#C9B88A", "#E0B37A"], alpha: 0.5, dry: 0.6, delay: 470, duration: 700 },
  { path: [[822, 362], [890, 356], [952, 386], [1004, 424]], width: 52, colors: ["#9DB8D4", "#7FA8C6"], alpha: 0.5, dry: 0.65, delay: 520, duration: 700 },

  // --- left ---
  { path: [[720, 22], [650, 52], [590, 100], [520, 160]], width: 60, colors: ["#DA8F9B", "#E3A3A8", "#C2A8C8"], alpha: 0.52, dry: 0.5, delay: 80, duration: 800 },
  { path: [[690, 84], [600, 112], [500, 192], [384, 290]], width: 100, colors: ["#F2A464", "#E8692E", "#EE9B62"], alpha: 0.66, dry: 0.5, delay: 120, duration: 900 },
  { path: [[624, 212], [524, 190], [424, 232], [332, 302]], width: 78, colors: ["#EDC892", "#E3B074"], alpha: 0.54, dry: 0.65, delay: 200, duration: 900 },
  { path: [[620, 332], [520, 330], [424, 372], [334, 420]], width: 64, colors: ["#7EAA8C", "#4F8DAA"], alpha: 0.66, dry: 0.7, delay: 280, duration: 900 },
  { path: [[650, 392], [562, 420], [472, 490], [394, 560]], width: 78, colors: ["#E4B472", "#A98F3C", "#D4616C"], alpha: 0.62, dry: 0.55, delay: 340, duration: 900 },

  // --- right ---
  { path: [[700, 62], [790, 60], [850, 86], [902, 122]], width: 60, colors: ["#EAC595", "#E2B67F"], alpha: 0.52, dry: 0.5, delay: 300, duration: 750 },
  { path: [[740, 202], [820, 190], [892, 216], [942, 256]], width: 76, colors: ["#D9A56E", "#DDB07A"], alpha: 0.52, dry: 0.55, delay: 380, duration: 750 },
  { path: [[800, 302], [870, 290], [916, 312], [936, 348]], width: 50, colors: ["#BEB37C", "#A9B08A"], alpha: 0.5, dry: 0.7, delay: 440, duration: 650 },
  { path: [[880, 422], [960, 442], [1030, 468], [1092, 504]], width: 60, colors: ["#E9BA88", "#DFA970"], alpha: 0.54, dry: 0.6, delay: 500, duration: 750 },
];

export const INK_LINES: InkLine[] = [
  // arcs over the top of the composition, well clear of the portrait, name and copy
  { path: [[20, 340], [300, -70], [1080, -50], [1440, 150]], width: 1.4, colors: ["#6a5a4c", "#4a3b30", "#c9a25b"] },
  // small swoosh under the name's right edge
  { path: [[1110, 596], [1200, 650], [1330, 630], [1440, 540]], width: 1.4, colors: ["#c9a25b", "#6a5a4c", "#c9a25b"] },
];

/** Soft watercolour droplets: pale fill, slightly stronger rim. Deliberately quieter than the strokes. */
export interface Bubble {
  x: number;
  y: number;
  r: number;
  color: string;
  delay: number;
}
export const BUBBLES: Bubble[] = [
  { x: 332, y: 176, r: 15, color: "#7FA8C6", delay: 1050 },
  { x: 288, y: 372, r: 9, color: "#F0A987", delay: 1150 },
  { x: 250, y: 252, r: 6, color: "#E2A0AB", delay: 1250 },
  { x: 972, y: 168, r: 13, color: "#F0B98E", delay: 1100 },
  { x: 976, y: 336, r: 8, color: "#A9B88C", delay: 1200 },
  { x: 1118, y: 556, r: 15, color: "#9DB8D4", delay: 1300 },
  { x: 846, y: 26, r: 7, color: "#E8B58E", delay: 1350 },
];

export const SPECKS: Specks[] = [
  { x: 1020, y: 250, r: 22, n: 8, color: "#C98F5C" },
  { x: 300, y: 80, r: 26, n: 8, color: "#E8692E" },
];
