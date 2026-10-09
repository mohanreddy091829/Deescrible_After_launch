/**
 * Procedural pencil-sketch landscape for the journey section.
 * Everything is generated deterministically (seeded RNG) so server and client markup match,
 * and the geometry — including milestone positions and the paper-plane route — comes from the
 * same polylines, never from hand-tuned screen coordinates.
 */
export type P = [number, number];

/** Scene design space. The SVGs extend beyond [0, W] so ultra-wide screens never show an edge. */
export const W = 1440;
export const H = 820;
export const X0 = -400;
export const X1 = 1840;
export const VIEWBOX = `${X0} 0 ${X1 - X0} ${H}`;
const STEP = 4;

function rng32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r1 = (n: number) => Math.round(n * 10) / 10;

/** Midpoint-displacement through key points, then resampled every STEP px in x. */
function ridge(keys: P[], seed: number, rough: number, levels = 4): P[] {
  const rnd = rng32(seed);
  let pts = keys;
  let k = rough;
  for (let l = 0; l < levels; l++) {
    const next: P[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      next.push(pts[i]);
      next.push([(x0 + x1) / 2 + (rnd() - 0.5) * (x1 - x0) * 0.1, (y0 + y1) / 2 + (rnd() - 0.5) * (x1 - x0) * k]);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
    k *= 0.62;
  }
  const out: P[] = [];
  let j = 0;
  for (let x = pts[0][0]; x <= pts[pts.length - 1][0]; x += STEP) {
    while (j < pts.length - 2 && pts[j + 1][0] < x) j++;
    const [xa, ya] = pts[j];
    const [xb, yb] = pts[j + 1];
    const t = xb === xa ? 0 : (x - xa) / (xb - xa);
    out.push([x, ya + (yb - ya) * t]);
  }
  return out;
}

/** Catmull-Rom smoothing so key points read as a hand-drawn curve rather than a zig-zag. */
function smoothKeys(keys: P[], per = 24): P[] {
  const out: P[] = [];
  for (let i = 0; i < keys.length - 1; i++) {
    const p0 = keys[Math.max(0, i - 1)], p1 = keys[i], p2 = keys[i + 1], p3 = keys[Math.min(keys.length - 1, i + 2)];
    for (let s = 0; s < per; s++) {
      const t = s / per, t2 = t * t, t3 = t2 * t;
      out.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ]);
    }
  }
  out.push(keys[keys.length - 1]);
  return out;
}

const line = (pts: P[]) => "M" + pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L");
const area = (pts: P[], base: number) => `${line(pts)}L${r1(pts[pts.length - 1][0])} ${base}L${r1(pts[0][0])} ${base}Z`;
const yAt = (pts: P[], x: number) => {
  const i = Math.min(pts.length - 2, Math.max(0, Math.round((x - pts[0][0]) / STEP)));
  return pts[i][1];
};

/** Diagonal graphite hatching hung from the ridge; shadow slopes are denser and cross-hatched. */
function hatch(poly: P[], base: number, seed: number, o: { pDark: number; pLight: number; min: number; max: number; angle: number }) {
  const rnd = rng32(seed);
  let d = "";
  for (let i = 3; i < poly.length - 3; i++) {
    const [x, y] = poly[i];
    const slope = (poly[i + 3][1] - poly[i - 3][1]) / (poly[i + 3][0] - poly[i - 3][0]);
    const dark = slope > 0.1;
    if (rnd() > (dark ? o.pDark : o.pLight)) continue;
    const len = o.min + rnd() * (o.max - o.min) * (dark ? 1 : 0.55);
    const a = o.angle + (rnd() - 0.5) * 0.16;
    d += `M${r1(x)} ${r1(y + 2)}L${r1(x - Math.sin(a) * len)} ${r1(Math.min(base, y + 2 + Math.cos(a) * len))}`;
    if (dark && rnd() < 0.42) {
      const a2 = -o.angle * 0.7 + (rnd() - 0.5) * 0.2;
      const l2 = len * (0.45 + rnd() * 0.3);
      const sy = y + 6 + rnd() * len * 0.3;
      d += `M${r1(x)} ${r1(sy)}L${r1(x - Math.sin(a2) * l2)} ${r1(Math.min(base, sy + Math.cos(a2) * l2))}`;
    }
  }
  return d;
}

/** Short irregular graphite ticks scattered along a ridge, like a pencil testing rock texture. */
function ticks(poly: P[], seed: number, every: number) {
  const rnd = rng32(seed);
  let d = "";
  for (let i = 4; i < poly.length - 4; i += every) {
    const [x, y] = poly[i];
    const dx = (rnd() - 0.5) * 12, len = 5 + rnd() * 12;
    d += `M${r1(x + dx)} ${r1(y + 6 + rnd() * 18)}l${r1(-len * 0.4)} ${r1(len)}`;
  }
  return d;
}


/** Torn-paper profile: slow waves, a persistent random walk and the odd fibre nick — never a saw-tooth. */
function torn(seed: number, amp: number, x0 = X0, x1 = X1, step = 5): P[] {
  const r = rng32(seed);
  const p1 = r() * 6.28, p2 = r() * 6.28, p3 = r() * 6.28;
  const out: P[] = [];
  let walk = 0;
  for (let x = x0; x <= x1; x += step) {
    walk = walk * 0.86 + (r() - 0.5) * amp * 0.5;
    let y = amp * (0.55 * Math.sin(x / 190 + p1) + 0.32 * Math.sin(x / 71 + p2) + 0.16 * Math.sin(x / 27 + p3)) + walk;
    if (r() < 0.05) y += (r() - 0.35) * amp * 0.9; // fibre nick
    out.push([x, y]);
  }
  return out;
}

// ------------------------------------------------------------------ mountains
const FAR_KEYS: P[] = [[X0, 418], [-180, 392], [-20, 404], [120, 366], [270, 410], [420, 356], [560, 396], [710, 338], [850, 392], [1000, 350], [1150, 384], [1300, 332], [1440, 372], [1600, 346], [X1, 382]];
const MID_KEYS: P[] = [[X0, 470], [-160, 440], [0, 470], [110, 430], [240, 462], [390, 398], [520, 436], [660, 392], [790, 440], [920, 416], [1060, 436], [1150, 384], [1230, 306], [1300, 270], [1380, 254], [1440, 242], [1620, 300], [X1, 340]];

const far = ridge(FAR_KEYS, 11, 0.5);
const mid = ridge(MID_KEYS, 29, 0.42);

export const ART = {
  far: {
    wash: area(far, 640),
    line: line(far),
    line2: line(far.map(([x, y], i) => [x, y + Math.sin(i * 0.9) * 1.4 + 1.5] as P)),
    hatch: hatch(far, 600, 101, { pDark: 0.5, pLight: 0.16, min: 26, max: 70, angle: 0.5 }),
    clip: area(far, 640),
  },
  mid: {
    wash: area(mid, 700),
    line: line(mid),
    line2: line(mid.map(([x, y], i) => [x, y + Math.sin(i * 1.3) * 1.6 + 1.8] as P)),
    hatch: hatch(mid, 700, 202, { pDark: 0.68, pLight: 0.3, min: 34, max: 120, angle: 0.5 }) + ticks(mid, 7, 3),
    clip: area(mid, 700),
  },
};

/** Everything above the mid ridge: the sun is clipped to this so mountains cover its lower half. */
export const SUN_CLIP = `${line(mid)}L${X1} 0L${X0} 0Z`;
export const SUN = { cx: 1372, cy: 236, r: 110 };

// --------------------------------------------------------------- dark panel
/** The gold-edged charcoal ridge that carries the milestones. */
const RIDGE_KEYS: P[] = [[X0, 676], [-120, 650], [0, 612], [150, 572], [300, 534], [470, 502], [640, 452], [780, 462], [880, 486], [1000, 458], [1120, 410], [1290, 352], [1440, 334], [1640, 304], [X1, 284]];
const ridgeBase = smoothKeys(RIDGE_KEYS, 28);
const rn = rng32(77);
/** Resample at STEP px with a fine torn-paper wobble layered on the smooth curve. */
const RIDGE: P[] = (() => {
  const out: P[] = [];
  let j = 0;
  let wob = 0;
  for (let x = X0; x <= X1; x += STEP) {
    while (j < ridgeBase.length - 2 && ridgeBase[j + 1][0] < x) j++;
    const [xa, ya] = ridgeBase[j], [xb, yb] = ridgeBase[j + 1];
    const t = xb === xa ? 0 : (x - xa) / (xb - xa);
    wob = wob * 0.55 + (rn() - 0.5) * 2.6;
    out.push([x, ya + (yb - ya) * t + wob]);
  }
  return out;
})();
export const RIDGE_POLY = RIDGE;

/** Arc length at every polyline vertex — the single source of truth for path position. */
const cum: number[] = [0];
for (let i = 1; i < RIDGE.length; i++) cum.push(cum[i - 1] + Math.hypot(RIDGE[i][0] - RIDGE[i - 1][0], RIDGE[i][1] - RIDGE[i - 1][1]));
export const RIDGE_LENGTH = cum[cum.length - 1];

export function ridgeAtLength(len: number) {
  const L = Math.max(0, Math.min(RIDGE_LENGTH, len));
  let lo = 0, hi = cum.length - 1;
  while (hi - lo > 1) {
    const m = (lo + hi) >> 1;
    if (cum[m] < L) lo = m; else hi = m;
  }
  const t = (L - cum[lo]) / (cum[hi] - cum[lo] || 1);
  const [xa, ya] = RIDGE[lo], [xb, yb] = RIDGE[hi];
  // tangent from a wider window so the plane banks smoothly, ignoring torn-edge jitter
  const a = RIDGE[Math.max(0, lo - 10)], b = RIDGE[Math.min(RIDGE.length - 1, hi + 10)];
  return { x: xa + (xb - xa) * t, y: ya + (yb - ya) * t, angle: Math.atan2(b[1] - a[1], b[0] - a[0]) };
}
export function lengthAtX(x: number) {
  const i = Math.min(RIDGE.length - 1, Math.max(0, Math.round((x - X0) / STEP)));
  return cum[i];
}

/** Where the girl stands; the plane is thrown from here and the right-hand gold line starts here. */
export const GIRL_X = 292;
/** The plane leaves her hand slightly ahead of her feet. */
export const SPLIT_X = GIRL_X + 22;
export const PLANE_START = lengthAtX(SPLIT_X);
export const GIRL_Y = yAt(RIDGE, GIRL_X);
export const PIN_X = [150, 412, 658, 896, 1136];
export const PINS = PIN_X.map((x) => ({ x, y: yAt(RIDGE, x), len: lengthAtX(x) }));

const splitAt = (x: number) => Math.round((x - X0) / STEP);
export const GOLD_LEFT = line(RIDGE.slice(0, splitAt(SPLIT_X) + 1));
export const GOLD_RIGHT = line(RIDGE.slice(splitAt(SPLIT_X)));
/** Length of the right-hand gold path (its own start is PLANE_START). */
export const GOLD_RIGHT_LENGTH = RIDGE_LENGTH - PLANE_START;

/** Mobile: gentle vertical wiggle shared by the line, the pins and the plane (viewBox 40 × 1000). */
export const vx = (f: number) => 20 + 5 * Math.sin(f * Math.PI * 5.2);
export const VERTICAL_W = 88;
export const VERTICAL_H = 590;
/** The same wiggle in real px (88 × 590) so strokes and dashes are never distorted. */
export const VERTICAL = "M" + Array.from({ length: 81 }, (_, i) => `${r1((vx(i / 80) / 40) * 88)} ${r1((i / 80) * 590)}`).join("L");

/** Charcoal body of the panel, a torn cream edge along the bottom, and speckled paper-grit texture. */
const bottom: P[] = torn(5, 7).map(([x, y]) => [x, 790 + y] as P);
export const PANEL = {
  body: `${line(RIDGE)}L${X1} ${H + 40}L${X0} ${H + 40}Z`,
  tornBottom: `${line(bottom)}L${X1} ${H + 40}L${X0} ${H + 40}Z`,
  grit: (() => {
    const r = rng32(303);
    let d = "";
    for (let i = 0; i < 520; i++) {
      const x = X0 + r() * (X1 - X0);
      const y0 = yAt(RIDGE, x);
      const y = y0 + 8 + r() * (780 - y0);
      d += `M${r1(x)} ${r1(y)}l${r1((r() - 0.5) * 14)} ${r1(r() * 5)}`;
    }
    return d;
  })(),
  strata: (() => {
    const r = rng32(808);
    let d = "";
    for (let k = 0; k < 5; k++) {
      const off = 26 + k * 34;
      d += "M" + RIDGE.filter((_, i) => i % 2 === 0).map(([x, y], i) => `${r1(x)} ${r1(y + off + Math.sin(i * 0.2 + k) * 4 + (r() - 0.5) * 3)}`).join("L");
    }
    return d;
  })(),
};

/** Irregular torn edge for the very top of the sheet (white shows through where it is torn away). */
export const TORN_TOP = (() => {
  const pts = torn(41, 6).map(([x, y]) => [x, 15 + y] as P);
  return `M${X0} -2L${X1} -2L${X1} ${r1(pts[pts.length - 1][1])}${[...pts].reverse().map(([x, y]) => `L${r1(x)} ${r1(y)}`).join("")}Z`;
})();
/** Same profile as the panel's bottom edge, for the mobile panel (viewBox X0 770 … 70). */
export const TORN_BOTTOM_VIEWBOX = `${X0} 768 ${X1 - X0} 72`;

// ------------------------------------------------------------------ the walker
/** Sprite geometry (px in girl-body.webp / girl-arm.webp, both 524 × 1090). */
export const GIRL = {
  w: 524, h: 1090,
  ax: 273, ay: 1040, // anchor: midpoint between the soles
  px: 274, py: 412, // elbow / cuff pivot of the forearm layer
  hx: 374, hy: 553, // fist
  lx: 263, ly: 606, // hip: the upper body leans about this point
  soleDeg: -8.46, // slope of her soles in the sprite
};
/** Scene units per sprite pixel (she stands ≈ 218 units tall on an 820-unit scene). */
export const GIRL_SCALE = 0.2;
export const GIRL_ROT = (ridgeAtLength(lengthAtX(GIRL_X)).angle * 180) / Math.PI - GIRL.soleDeg;

const rot = (x: number, y: number, deg: number): P => {
  const a = (deg * Math.PI) / 180, c = Math.cos(a), sn = Math.sin(a);
  return [x * c - y * sn, x * sn + y * c];
};
/** Sprite pixel → scene coordinates (anchor sits on the ridge, sprite leans with the slope). */
export function spriteToScene(sx: number, sy: number): P {
  const [rx, ry] = rot((sx - GIRL.ax) * GIRL_SCALE, (sy - GIRL.ay) * GIRL_SCALE, GIRL_ROT);
  return [GIRL_X + rx, GIRL_Y + 2 + ry];
}
/**
 * Where her fist is when the forearm is rotated by `deg` (clockwise positive) about the cuff and the
 * whole upper body has leaned by `lean` degrees about the hip.
 */
export function handAt(deg: number, lean = 0): P {
  const [rx, ry] = rot(GIRL.hx - GIRL.px, GIRL.hy - GIRL.py, deg);
  const [ux, uy] = [GIRL.px + rx - GIRL.lx, GIRL.py + ry - GIRL.ly];
  const [lx, ly] = rot(ux, uy, lean);
  return spriteToScene(GIRL.lx + lx, GIRL.ly + ly);
}

// ------------------------------------------------------------------ terrain: grass, shrubs, rocks
function grassAlong(poly: P[], seed: number, o: { step: number; hmin: number; hmax: number; skip?: (x: number) => boolean; gold?: number; lift?: number }) {
  const r = rng32(seed);
  let dark = "", gold = "";
  for (let i = 4; i < poly.length - 4; i += Math.max(1, Math.round(o.step / STEP))) {
    const [bx, by0] = poly[i];
    if (o.skip?.(bx)) continue;
    const by = by0 + (o.lift ?? 3);
    const n = 2 + Math.floor(r() * 4);
    for (let k = 0; k < n; k++) {
      const x = bx + (r() - 0.5) * 9;
      const h = o.hmin + r() * (o.hmax - o.hmin);
      const lean = (r() - 0.5) * h * 0.9;
      const d = `M${r1(x)} ${r1(by)}Q${r1(x + lean * 0.25)} ${r1(by - h * 0.62)} ${r1(x + lean)} ${r1(by - h)}`;
      if (r() < (o.gold ?? 0.22)) gold += d; else dark += d;
    }
  }
  return { dark, gold };
}

/** Fern-like shrub: pointed leaves fanning out from a base point. */
function shrub(cx: number, cy: number, size: number, seed: number) {
  const r = rng32(seed);
  let d = "", hi = "";
  const n = 7 + Math.floor(r() * 3);
  for (let k = 0; k < n; k++) {
    const a = -Math.PI / 2 + ((k / (n - 1)) - 0.5) * 2.5 + (r() - 0.5) * 0.18;
    const L = size * (0.65 + r() * 0.5);
    const tx = cx + Math.cos(a) * L, ty = cy + Math.sin(a) * L - L * 0.1;
    const nx = -Math.sin(a), ny = Math.cos(a);
    const w = L * 0.17;
    const mx = cx + Math.cos(a) * L * 0.55, my = cy + Math.sin(a) * L * 0.55;
    d += `M${r1(cx)} ${r1(cy)}Q${r1(mx + nx * w)} ${r1(my + ny * w)} ${r1(tx)} ${r1(ty)}Q${r1(mx - nx * w)} ${r1(my - ny * w)} ${r1(cx)} ${r1(cy)}Z`;
    if (r() < 0.5) hi += `M${r1(cx)} ${r1(cy)}Q${r1(mx)} ${r1(my - 1)} ${r1(tx)} ${r1(ty)}`;
  }
  return { d, hi };
}

/** Angular boulder with a lit edge and two facet lines. */
function rock(cx: number, base: number, w: number, h: number, seed: number) {
  const r = rng32(seed);
  const j = () => (r() - 0.5) * 0.14;
  const pts: P[] = [[-0.5, 0], [-0.46 + j(), -0.5], [-0.2 + j(), -0.92], [0.12 + j(), -1], [0.38 + j(), -0.62], [0.5, 0]].map(([x, y]) => [cx + x * w, base + y * h] as P);
  const body = "M" + pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L") + "Z";
  const facet = `M${r1(pts[2][0])} ${r1(pts[2][1])}L${r1(cx + w * 0.02)} ${r1(base - h * 0.36)}L${r1(pts[4][0])} ${r1(pts[4][1])}M${r1(cx + w * 0.02)} ${r1(base - h * 0.36)}L${r1(cx - w * 0.12)} ${r1(base)}`;
  const hi = `M${r1(pts[0][0])} ${r1(pts[0][1] - 1)}L${r1(pts[1][0])} ${r1(pts[1][1])}L${r1(pts[2][0])} ${r1(pts[2][1])}L${r1(pts[3][0])} ${r1(pts[3][1])}`;
  return { body, facet, hi };
}

const nearPin = (x: number) => PIN_X.some((p) => Math.abs(p - x) < 34) || Math.abs(x - GIRL_X) < 90;
const G = grassAlong(RIDGE, 913, { step: 10, hmin: 7, hmax: 21, skip: nearPin, gold: 0.24 });
const SH = [30, 560, 1000, 1262, 1650].map((x, i) => shrub(x, yAt(RIDGE, x) + 4, 30 + (i % 3) * 8, 77 + i));
const RK = [78, 538, 790, 1030, 1218, 1334, 1500].map((x, i) => rock(x, yAt(RIDGE, x) + 5, 40 + (i % 3) * 14, 20 + (i % 2) * 9, 31 + i));

/** Short angular scratches in the ground, like dry-brush on a hillside. */
function scratches(seed: number, n: number) {
  const r = rng32(seed);
  let d = "";
  for (let i = 0; i < n; i++) {
    const x = X0 + r() * (X1 - X0);
    const y0 = yAt(RIDGE, x);
    let px = x, py = y0 + 14 + r() * 150;
    d += `M${r1(px)} ${r1(py)}`;
    const segs = 2 + Math.floor(r() * 2);
    for (let s = 0; s < segs; s++) { px += 6 + r() * 16; py -= 2 + r() * 9; d += `L${r1(px)} ${r1(py)}`; }
  }
  return d;
}

export const TERRAIN = {
  grassDark: G.dark,
  grassGold: G.gold,
  shrubs: SH.map((s) => s.d).join(""),
  shrubHi: SH.map((s) => s.hi).join(""),
  rockBody: RK.map((k) => k.body).join(""),
  rockFacet: RK.map((k) => k.facet).join(""),
  rockHi: RK.map((k) => k.hi).join(""),
  scratches: scratches(5150, 300),
};

/** A few tufts in front of her shoes, drawn above the sprite. */
export const FOOT_GRASS = (() => {
  const r = rng32(404);
  let dark = "", gold = "";
  for (let x = GIRL_X - 78; x <= GIRL_X + 82; x += 5.5) {
    if (r() < 0.45) continue;
    const by = yAt(RIDGE, x) + 4;
    const h = 6 + r() * 15;
    const lean = (r() - 0.5) * h;
    const d = `M${r1(x)} ${r1(by)}Q${r1(x + lean * 0.3)} ${r1(by - h * 0.6)} ${r1(x + lean)} ${r1(by - h)}`;
    if (r() < 0.25) gold += d; else dark += d;
  }
  return { dark, gold };
})();

// ------------------------------------------------------------------ mobile ridge (real px, 900 × 44, left-aligned)
export const MR = (() => {
  const keys: P[] = [[-30, 31], [60, 24], [150, 30], [250, 21], [350, 28], [470, 19], [600, 27], [760, 18], [930, 26]];
  const base = smoothKeys(keys, 20);
  const r = rng32(61);
  let w = 0;
  const poly: P[] = [];
  let j = 0;
  for (let x = -30; x <= 930; x += STEP) {
    while (j < base.length - 2 && base[j + 1][0] < x) j++;
    const [xa, ya] = base[j], [xb, yb] = base[j + 1];
    const t = xb === xa ? 0 : (x - xa) / (xb - xa);
    w = w * 0.55 + (r() - 0.5) * 1.6;
    poly.push([x, ya + (yb - ya) * t + w]);
  }
  const feetX = 62;
  const gx = grassAlong(poly, 33, { step: 9, hmin: 5, hmax: 14, skip: (x) => Math.abs(x - feetX) < 26, gold: 0.25, lift: 2 });
  const sh = [150, 380, 640].map((x, i) => shrub(x, poly[Math.round((x + 30) / STEP)][1] + 3, 20 + i * 4, 14 + i));
  const rk = [250, 520, 780].map((x, i) => rock(x, poly[Math.round((x + 30) / STEP)][1] + 4, 28 + i * 6, 13 + i * 3, 9 + i));
  return {
    viewBox: "0 0 900 44",
    body: `${line(poly)}L930 44L-30 44Z`,
    gold: line(poly),
    grassDark: gx.dark, grassGold: gx.gold,
    shrubs: sh.map((s) => s.d).join(""), shrubHi: sh.map((s) => s.hi).join(""),
    rockBody: rk.map((k) => k.body).join(""), rockFacet: rk.map((k) => k.facet).join(""), rockHi: rk.map((k) => k.hi).join(""),
    feetX,
    feetY: poly[Math.round((feetX + 30) / STEP)][1],
  };
})();
