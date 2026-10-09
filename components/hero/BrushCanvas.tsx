"use client";

import React, { useEffect, useRef } from "react";
import { STROKES, INK_LINES, SPECKS, BUBBLES, type Stroke, type Pt } from "./brush-strokes";

/**
 * Procedural dry-brush / watercolour painter.
 *
 * Every stroke is a bundle of independent bristles that follow a cubic bezier, each with its
 * own offset, pressure, pigment and "dry" end. Everything is vector-sharp at any pixel density
 * (canvas is sized to CSS size × devicePixelRatio, capped for memory) and the strokes are
 * painted progressively once, then the canvas is static — no continuous animation loop.
 */

type Layout = { k: number; ox: number; oy: number };

const DESIGN_W = 1448;
const DESIGN_H = 700;
const MAX_DPR = 2;

// ---------- deterministic helpers ----------
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
function bez(p: [Pt, Pt, Pt, Pt], t: number): Pt {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [
    a * p[0][0] + b * p[1][0] + c * p[2][0] + d * p[3][0],
    a * p[0][1] + b * p[1][1] + c * p[2][1] + d * p[3][1],
  ];
}
function bezTan(p: [Pt, Pt, Pt, Pt], t: number): Pt {
  const u = 1 - t;
  const x = 3 * u * u * (p[1][0] - p[0][0]) + 6 * u * t * (p[2][0] - p[1][0]) + 3 * t * t * (p[3][0] - p[2][0]);
  const y = 3 * u * u * (p[1][1] - p[0][1]) + 6 * u * t * (p[2][1] - p[1][1]) + 3 * t * t * (p[3][1] - p[2][1]);
  const l = Math.hypot(x, y) || 1;
  return [x / l, y / l];
}

// ---------- bristle model ----------
interface Bristle {
  pts: Float32Array; // x,y pairs in CSS px
  rgb: Uint8ClampedArray; // r,g,b per sample
  alpha: Float32Array; // per sample
  width: number;
  n: number;
}
interface BuiltStroke {
  def: Stroke;
  bristles: Bristle[];
  samples: number;
}

function buildStroke(def: Stroke, L: Layout, seed: number): BuiltStroke {
  const rnd = mulberry32(seed);
  const P = def.path.map(([x, y]) => [x * L.k + L.ox, y * L.k + L.oy]) as [Pt, Pt, Pt, Pt];
  // approximate arc length → sample count
  let len = 0;
  let prev = bez(P, 0);
  for (let i = 1; i <= 24; i++) {
    const q = bez(P, i / 24);
    len += Math.hypot(q[0] - prev[0], q[1] - prev[1]);
    prev = q;
  }
  const samples = Math.max(24, Math.round(len / 4));
  const width = def.width * L.k;
  const count = Math.round(def.bristles ?? clamp(width * 2.6, 80, 260));
  const [c0, c1, c2] = [hex(def.colors[0]), hex(def.colors[1]), hex(def.colors[def.colors.length - 1])];
  const dry = def.dry ?? 0.5;
  const bristles: Bristle[] = [];

  for (let b = 0; b < count; b++) {
    // lateral position, slightly clustered toward the centre like a loaded brush
    const r = rnd() * 2 - 1;
    const off = Math.sign(r) * Math.pow(Math.abs(r), 0.82);
    const start = rnd() * 0.1 + (Math.abs(off) > 0.7 ? rnd() * 0.1 : 0);
    // dry bristles run out earlier → frayed tail
    const end = 1 - Math.pow(rnd(), 1.9) * dry * (0.12 + Math.abs(off) * 0.85);
    const i0 = Math.floor(start * samples);
    const i1 = Math.max(i0 + 4, Math.floor(end * samples));
    const n = i1 - i0 + 1;
    const pts = new Float32Array(n * 2);
    const rgb = new Uint8ClampedArray(n * 3);
    const alpha = new Float32Array(n);
    const phase = rnd() * 6.283;
    const wob = (0.6 + rnd() * 1.8) * L.k * 5;
    const tone = (rnd() - 0.5) * 0.16;
    const baseA = def.alpha * 0.92 * (0.22 + rnd() * 0.3) * (1 - 0.5 * off * off);
    const bw = (width / count) * (3.2 + rnd() * 3.4);
    const hue = rnd();

    for (let i = 0; i < n; i++) {
      const t = (i0 + i) / samples;
      const [px, py] = bez(P, t);
      const [tx, ty] = bezTan(P, t);
      // brush pressure profile: swell quickly, hold, taper
      const press =
        smooth(0, 0.08, t) * (1 - 0.5 * smooth(0.5, 1, t)) * (0.8 + 0.2 * Math.sin(Math.PI * t) + 0.05 * Math.sin(t * 9 + phase));
      const lateral =
        off * (width / 2) * press + (Math.sin(t * 7 + phase) + 0.6 * Math.sin(t * 19 + phase * 2)) * wob * 0.5;
      pts[i * 2] = px - ty * lateral;
      pts[i * 2 + 1] = py + tx * lateral;

      // colour: blend along the stroke through up to three stops, plus per-bristle variation
      let col: [number, number, number];
      const m = clamp(t + (hue - 0.5) * 0.18);
      if (def.colors.length > 2) {
        const mid = hex(def.colors[1]);
        col = m < 0.5 ? mix(c0, mid, m * 2) : mix(mid, c2, (m - 0.5) * 2);
      } else {
        col = mix(c0, c1, m);
      }
      const f = 1 + tone;
      rgb[i * 3] = col[0] * f;
      rgb[i * 3 + 1] = col[1] * f;
      rgb[i * 3 + 2] = col[2] * f;

      // fade in at start, grain + dry-out toward the end
      const fadeIn = smooth(0, 0.05, t);
      const fadeOut = 1 - smooth(0.7, 1, t) * dry * 0.9;
      alpha[i] = baseA * fadeIn * fadeOut * (0.82 + 0.18 * Math.sin(t * 31 + phase * 3));
    }
    bristles.push({ pts, rgb, alpha, width: bw, n });
  }
  return { def, bristles, samples };
}
function mix(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

// ---------- paint ----------
/** Soft pooled-pigment body under the bristles: a few wide, very low-alpha round-cap passes. */
function paintWash(ctx: CanvasRenderingContext2D, s: BuiltStroke, L: Layout, from: number, to: number) {
  const P = s.def.path.map(([x, y]) => [x * L.k + L.ox, y * L.k + L.oy]) as [Pt, Pt, Pt, Pt];
  const rnd = mulberry32(Math.round(P[0][0] * 31 + P[0][1] * 17));
  const [c0, c1] = [hex(s.def.colors[0]), hex(s.def.colors[s.def.colors.length - 1])];
  const steps = 48;
  const a = Math.floor(from * steps), b = Math.floor(to * steps);
  if (b <= a) return;
  ctx.lineCap = "round";
  for (let pass = 0; pass < 5; pass++) {
    const w = s.def.width * L.k * (0.4 + pass * 0.095);
    const jx = (rnd() - 0.5) * s.def.width * L.k * 0.14;
    const jy = (rnd() - 0.5) * s.def.width * L.k * 0.14;
    ctx.lineWidth = w;
    for (let i = a; i < b; i++) {
      const t0 = (i + 0.0) / steps, t1 = (i + 1.0) / steps;
      const p0 = bez(P, t0), p1 = bez(P, t1);
      const col = mix(c0, c1, (t0 + t1) / 2);
      const taper = smooth(0, 0.12, t0) * (1 - 0.6 * smooth(0.6, 1, t0));
      ctx.strokeStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${(s.def.alpha * 0.055 * taper).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(p0[0] + jx, p0[1] + jy);
      ctx.lineTo(p1[0] + jx, p1[1] + jy);
      ctx.stroke();
    }
  }
  ctx.lineCap = "butt";
}

function paintStroke(ctx: CanvasRenderingContext2D, s: BuiltStroke, from: number, to: number) {
  // from/to are 0..1 stroke progress; bristles draw the matching slice of their own samples
  for (const br of s.bristles) {
    const total = br.n;
    const a = Math.floor(from * total);
    const b = Math.min(total - 1, Math.floor(to * total));
    if (b <= a) continue;
    ctx.lineWidth = br.width;
    // alpha/colour vary slowly; chunk into short runs so each run is a single path
    const RUN = 14;
    for (let i = a; i < b; i += RUN) {
      const e = Math.min(b, i + RUN);
      ctx.beginPath();
      ctx.moveTo(br.pts[i * 2], br.pts[i * 2 + 1]);
      for (let j = i + 1; j <= e; j++) ctx.lineTo(br.pts[j * 2], br.pts[j * 2 + 1]);
      ctx.strokeStyle = `rgba(${br.rgb[i * 3] | 0},${br.rgb[i * 3 + 1] | 0},${br.rgb[i * 3 + 2] | 0},${br.alpha[i].toFixed(3)})`;
      ctx.stroke();
    }
  }
}

function paintInk(ctx: CanvasRenderingContext2D, L: Layout, progress: number) {
  for (const ln of INK_LINES) {
    const P = ln.path.map(([x, y]) => [x * L.k + L.ox, y * L.k + L.oy]) as [Pt, Pt, Pt, Pt];
    const steps = 90;
    const end = Math.floor(steps * clamp(progress));
    if (end < 2) continue;
    ctx.beginPath();
    for (let i = 0; i <= end; i++) {
      const [x, y] = bez(P, i / steps);
      if (i) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    }
    const g = ctx.createLinearGradient(P[0][0], P[0][1], P[3][0], P[3][1]);
    g.addColorStop(0, ln.colors[0]);
    g.addColorStop(0.6, ln.colors[1]);
    g.addColorStop(1, ln.colors[2]);
    ctx.strokeStyle = g;
    ctx.lineWidth = ln.width * Math.max(0.7, L.k);
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

function granulate(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number, seed: number) {
  // Paper tooth: tiny erased specks so pigment looks dry-brushed rather than digitally flat.
  const rnd = mulberry32(seed);
  const n = Math.round((w * h) / 900);
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  for (let i = 0; i < n; i++) {
    const x = rnd() * w, y = rnd() * h;
    const s = (0.5 + rnd() * 1.7) * dpr;
    ctx.fillStyle = `rgba(0,0,0,${(0.08 + rnd() * 0.3).toFixed(2)})`;
    ctx.fillRect(x, y, s, s * (0.5 + rnd()));
  }
  ctx.restore();
}

function paintBubbles(ctx: CanvasRenderingContext2D, L: Layout, list = BUBBLES) {
  const s = Math.max(0.75, L.k);
  for (const b of list) {
    const p = 1;
    const r = b.r * s;
    const x = b.x * L.k + L.ox, y = b.y * L.k + L.oy;
    const [cr, cg, cb] = hex(b.color);
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.1, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${0.5 * p})`);
    g.addColorStop(0.45, `rgba(${cr},${cg},${cb},${0.16 * p})`);
    g.addColorStop(1, `rgba(${cr},${cg},${cb},${0.4 * p})`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 6.283);
    ctx.fill();
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},${0.35 * p})`;
    ctx.lineWidth = Math.max(0.8, r * 0.07);
    ctx.stroke();
  }
}

function paintSpecks(ctx: CanvasRenderingContext2D, L: Layout) {
  const rnd = mulberry32(77);
  for (const sp of SPECKS) {
    for (let i = 0; i < sp.n; i++) {
      const a = rnd() * 6.283, d = Math.pow(rnd(), 1.4) * sp.r * L.k;
      const x = sp.x * L.k + L.ox + Math.cos(a) * d;
      const y = sp.y * L.k + L.oy + Math.sin(a) * d;
      ctx.fillStyle = sp.color + Math.round((0.25 + rnd() * 0.5) * 255).toString(16).padStart(2, "0");
      ctx.beginPath();
      ctx.arc(x, y, (0.6 + rnd() * 2.4) * Math.max(0.7, L.k), 0, 6.283);
      ctx.fill();
    }
  }
}

export function BrushCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let first = true;
    let built: BuiltStroke[] = [];
    let layout: Layout = { k: 1, ox: 0, oy: 0 };
    let size = { w: 0, h: 0, dpr: 1 };

    const measure = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      size = { w, h, dpr };
      const mobile = w < 900;
      if (mobile) {
        // separate composition: cluster centred behind the portrait
        const k = Math.max(w / 760, 0.4);
        layout = { k, ox: w / 2 - (DESIGN_W / 2) * k, oy: h * 0.07 };
      } else {
        const boxW = Math.min(w, 1845);
        const k = boxW / DESIGN_W;
        layout = { k, ox: (w - boxW) / 2, oy: Math.max(0, (h - DESIGN_H * k) / 2) };
      }
      built = STROKES.map((s, i) => buildStroke(s, layout, 1000 + i * 97));
    };

    const base = () => {
      ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      ctx.lineCap = "butt";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "source-over";
    };

    const drawStatic = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      base();
      for (const s of built) {
        paintWash(ctx, s, layout, 0, 1);
        paintStroke(ctx, s, 0, 1);
      }
      ctx.globalCompositeOperation = "source-over";
      paintSpecks(ctx, layout);
      paintBubbles(ctx, layout);
      paintInk(ctx, layout, 1);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      granulate(ctx, canvas.width, canvas.height, size.dpr, 5);
    };

    const animate = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const start = performance.now();
      const drawn = built.map(() => 0);
      const pending = [...BUBBLES];
      const DUR = 1500;
      const step = (now: number) => {
        const el = now - start;
        base();
        let done = true;
        built.forEach((s, i) => {
          const local = clamp((el - s.def.delay) / s.def.duration);
          // brush accelerates then slows (ease-out cubic)
          const p = 1 - Math.pow(1 - local, 3);
          if (p > drawn[i]) {
            paintWash(ctx, s, layout, drawn[i], p);
            paintStroke(ctx, s, drawn[i], p);
          }
          drawn[i] = p;
          if (local < 1) done = false;
        });
        ctx.globalCompositeOperation = "source-over";
        const due = pending.filter((b) => el >= b.delay);
        if (due.length) {
          paintBubbles(ctx, layout, due);
          due.forEach((b) => pending.splice(pending.indexOf(b), 1));
        }
        if (el > DUR * 0.55) {
          // ink lines draw last; clear-free redraw is cheap (two thin curves)
          paintInk(ctx, layout, clamp((el - DUR * 0.55) / 700));
        }
        if (!done || pending.length || el < DUR * 0.55 + 700) {
          raf = requestAnimationFrame(step);
        } else {
          paintSpecks(ctx, layout);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          granulate(ctx, canvas.width, canvas.height, size.dpr, 5);
        }
      };
      raf = requestAnimationFrame(step);
    };

    const render = () => {
      cancelAnimationFrame(raf);
      measure();
      if (first && !reduce) animate();
      else drawStatic();
      first = false;
    };

    render();

    let timer: ReturnType<typeof setTimeout>;
    let lastW = parent.clientWidth;
    const ro = new ResizeObserver(() => {
      if (parent.clientWidth === lastW) return; // ignore pure height jitter (mobile URL bar)
      lastW = parent.clientWidth;
      clearTimeout(timer);
      timer = setTimeout(() => {
        cancelAnimationFrame(raf);
        measure();
        drawStatic();
      }, 140);
    });
    ro.observe(parent);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
