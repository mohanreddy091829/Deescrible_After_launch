import { P, PINS, PLANE_START, lengthAtX, ridgeAtLength, handAt } from "./journey-art";

/**
 * The throw as a pure function of time `t` (arbitrary units), so it can be scrubbed by scroll in
 * either direction without drifting out of sync:
 *   0.00–0.50  forearm swings down to her hip pocket
 *   0.42–0.62  paper plane is drawn out of the pocket (grows in her fist)
 *   0.50–0.72  she lifts it and winds back
 *   0.72–1.12  forearm whips up and forward; the plane leaves her hand at T_REL
 *   T_REL–T_LAND  it arcs through the air and settles into a glide just above the ridge
 *   T_LAND–T_END  it follows the ridge at constant speed, lighting each milestone on arrival
 */
export const T_REL = 1.0;
export const ARC = 1.15;
export const T_LAND = T_REL + ARC;
export const CRUISE = 4.0;
export const T_END = T_LAND + CRUISE;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const inOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const inOut3 = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out3 = (t: number) => 1 - Math.pow(1 - t, 3);

export function armAngle(t: number): number {
  if (t < 0.5) return 34 * inOut(clamp(t / 0.5));
  if (t < 0.72) return 34 + 18 * inOut(clamp((t - 0.5) / 0.22));
  if (t < 1.12) return 52 - 152 * inOut3(clamp((t - 0.72) / 0.4));
  return -100 + 100 * inOut(clamp((t - 1.12) / 0.6));
}

/** Torso lean about the hip (deg, clockwise = forward): bends to the pocket, rocks back to wind up, drives through the throw. */
export function lean(t: number): number {
  if (t < 0.5) return 3 * inOut(clamp(t / 0.5));
  if (t < 0.72) return 3 - 6.5 * inOut(clamp((t - 0.5) / 0.22));
  if (t < 1.1) return -3.5 + 8.5 * inOut3(clamp((t - 0.72) / 0.38));
  return 5 - 5 * inOut(clamp((t - 1.1) / 0.7));
}
/** Small vertical rise (px, scene units) as she throws — weight comes up through the legs. */
export function rise(t: number): number {
  return -3 * Math.sin(Math.PI * clamp((t - 0.78) / 0.7));
}

const LIFT = 26; // glide height above the ridge
const CRUISE_FROM = PLANE_START + 150; // arc ends on the ridge this far ahead of her
export const PLANE_END = lengthAtX(1440 + 140);
const span = PLANE_END - CRUISE_FROM;

const bez = (p: [P, P, P, P], u: number): P => {
  const v = 1 - u;
  return [
    v * v * v * p[0][0] + 3 * v * v * u * p[1][0] + 3 * v * u * u * p[2][0] + u * u * u * p[3][0],
    v * v * v * p[0][1] + 3 * v * v * u * p[1][1] + 3 * v * u * u * p[2][1] + u * u * u * p[3][1],
  ];
};
const bezAngle = (p: [P, P, P, P], u: number) => {
  const v = 1 - u;
  const dx = 3 * v * v * (p[1][0] - p[0][0]) + 6 * v * u * (p[2][0] - p[1][0]) + 3 * u * u * (p[3][0] - p[2][0]);
  const dy = 3 * v * v * (p[1][1] - p[0][1]) + 6 * v * u * (p[2][1] - p[1][1]) + 3 * u * u * (p[3][1] - p[2][1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

function arcPoints(): [P, P, P, P] {
  const a = armAngle(T_REL);
  const r0 = handAt(a, lean(T_REL));
  const r1 = handAt(a + 0.6, lean(T_REL - 0.01));
  const dl = Math.hypot(r1[0] - r0[0], r1[1] - r0[1]) || 1;
  const dir: P = [(r0[0] - r1[0]) / dl, (r0[1] - r1[1]) / dl]; // direction of the fist at release (arm is moving to smaller angles)
  const c = ridgeAtLength(CRUISE_FROM);
  const end: P = [c.x, c.y - LIFT];
  const tx = Math.cos(c.angle), ty = Math.sin(c.angle);
  return [r0, [r0[0] + dir[0] * 150, r0[1] + dir[1] * 150 - 20], [end[0] - tx * 130, end[1] - ty * 130 - 70], end];
}
const ARC_P = arcPoints();

export interface Pose {
  x: number; y: number; rot: number; scale: number; visible: boolean;
  /** Ridge length reached by the plane's shadow — drives the gold line. */
  len: number;
}

export function planePose(t: number): Pose {
  if (t < 0.42) return { x: 0, y: 0, rot: 0, scale: 0, visible: false, len: PLANE_START };
  if (t < T_REL) {
    const a = armAngle(t);
    const [hx, hy] = handAt(a, lean(t));
    const grow = 0.2 + 0.8 * out3(clamp((t - 0.42) / 0.2));
    return { x: hx + 4, y: hy - 6 - (1 - grow) * 10, rot: -38 + a * 0.12, scale: grow, visible: true, len: PLANE_START };
  }
  if (t < T_LAND) {
    const u = clamp((t - T_REL) / ARC);
    const e = 1.35 * u - 0.35 * u * u; // thrown fast, easing into the glide
    const [x, y] = bez(ARC_P, e);
    return { x, y, rot: bezAngle(ARC_P, e), scale: 1, visible: true, len: PLANE_START + (CRUISE_FROM - PLANE_START) * out3(u) };
  }
  const q = clamp((t - T_LAND) / CRUISE);
  const len = CRUISE_FROM + span * q;
  const pt = ridgeAtLength(len);
  const settle = Math.min(1, (t - T_LAND) / 0.8);
  const bob = Math.sin((t - T_LAND) * 5.2) * (3.2 - 1.6 * settle);
  return { x: pt.x, y: pt.y - LIFT + bob, rot: (pt.angle * 180) / Math.PI - 5 + Math.cos((t - T_LAND) * 5.2) * 3, scale: 1, visible: q < 0.995, len };
}

/** Clock time at which the cruising plane reaches each pin (index 0 is already lit by the gold line). */
export const PIN_TIMES = PINS.map((p) => T_LAND + CRUISE * clamp((p.len - CRUISE_FROM) / span));

/** Mobile: the same throw, flying to a point (px) and then handing off to scroll. */
export function mobileArc(hand: (deg: number, lean: number) => P, land: P, t: number) {
  const a = armAngle(Math.min(t, T_REL));
  const r0 = hand(armAngle(T_REL), lean(T_REL));
  const r1 = hand(armAngle(T_REL) + 0.6, lean(T_REL - 0.01));
  const dl = Math.hypot(r1[0] - r0[0], r1[1] - r0[1]) || 1;
  const dir: P = [(r0[0] - r1[0]) / dl, (r0[1] - r1[1]) / dl];
  const p: [P, P, P, P] = [r0, [r0[0] + dir[0] * 60, r0[1] + dir[1] * 60 - 10], [land[0] - 6, land[1] - 54], land];
  if (t < 0.42) return { x: 0, y: 0, rot: 0, scale: 0, visible: false };
  if (t < T_REL) {
    const [hx, hy] = hand(a, lean(t));
    const grow = 0.2 + 0.8 * out3(clamp((t - 0.42) / 0.2));
    return { x: hx + 2, y: hy - 3, rot: -38, scale: grow, visible: true };
  }
  const u = clamp((t - T_REL) / ARC);
  const e = 1.35 * u - 0.35 * u * u;
  const [x, y] = bez(p, e);
  return { x, y, rot: bezAngle(p, e), scale: 1, visible: true };
}
