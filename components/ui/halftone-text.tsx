"use client";

// Halftone text, adapted from the "Halftone Wordmark Footer" engine.
// The words are set once on an offscreen mask, sampled into a field of dots whose radius follows how much of
// each cell the letter covers, and drawn on a 2D canvas. The pointer parts the dots on springs (warming their
// colour as they leave home), a click sends a shock ring through the word, and everything sleeps when idle or
// off-screen. Colours are chosen per dot by `colorAt`, so the same word can read dark on one ground and light
// on another. Real text is kept for assistive technology; reduced-motion visitors get a static print.

import * as React from "react";

export type RGB = [number, number, number];

export interface HalftoneTextProps {
  /** One string per printed line. */
  lines: string[];
  /** Dot colour at a position inside the canvas. x, y are 0–1 fractions; line is the line index. */
  colorAt: (x: number, y: number, line: number) => RGB;
  /** The colour a dot warms toward as it is pushed off its place. */
  warm?: RGB;
  /** Dot pitch as a fraction of canvas width (0.0043 ≈ 4.3px at 1000px). */
  pitch?: number;
  /** Pointer push radius as a fraction of canvas width. */
  radius?: number;
  /** Letter weight; heavy Didone / grotesque faces print best. */
  weight?: number;
  /** CSS font-family string for the canvas. */
  fontFamily: string;
  /** Line height as a multiple of cap height. */
  leading?: number;
  /** Text read by screen readers. */
  label: string;
  className?: string;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const dotRadius = (cov: number, gap: number) => Math.sqrt(clamp01(cov)) * gap * 0.6;

function spring(x: number, y: number, vx: number, vy: number, hx: number, hy: number, px: number, py: number, r: number) {
  const dx = x - px;
  const dy = y - py;
  const d2 = dx * dx + dy * dy;
  if (r > 0 && d2 < r * r) {
    const d = Math.sqrt(d2) + 0.001;
    const f = (1 - d / r) * 2.6;
    vx += (dx / d) * f;
    vy += (dy / d) * f;
  }
  vx = (vx + (hx - x) * 0.05) * 0.84;
  vy = (vy + (hy - y) * 0.05) * 0.84;
  return [x + vx, y + vy, vx, vy] as const;
}

export function HalftoneText({ lines, colorAt, warm = [224, 69, 47], pitch = 0.0043, radius = 0.09, weight = 900, fontFamily, leading = 1.12, label, className = "" }: HalftoneTextProps) {
  const wrap = React.useRef<HTMLSpanElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const opts = React.useRef({ lines, colorAt, warm, pitch, radius, weight, fontFamily, leading });
  // keep the latest props available to the canvas loop; declared before the main effect so it runs first
  React.useLayoutEffect(() => {
    opts.current = { lines, colorAt, warm, pitch, radius, weight, fontFamily, leading };
  });
  const key = [lines.join("|"), weight, fontFamily, pitch, leading].join("~");

  React.useEffect(() => {
    const box = wrap.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let visible = true;
    let awake = true;
    let ring = { x: 0, y: 0, t: -1 };
    let dots = new Float32Array(0); // x y vx vy hx hy r R G B
    let count = 0;
    const S = 10;

    const layout = () => {
      const o = opts.current;
      const rect = box.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const mask = document.createElement("canvas");
      mask.width = w;
      mask.height = h;
      const m = mask.getContext("2d", { willReadFrequently: true });
      if (!m) return;
      // fit the longest line to the width, then shrink if the block would be too tall
      m.font = `${o.weight} 100px ${o.fontFamily}`;
      const longest = Math.max(...o.lines.map((l) => m.measureText(l).width), 1);
      let size = (w * 0.995) / longest * 100;
      const capRatio = 0.7;
      const blockH = (sz: number) => sz * capRatio + sz * capRatio * o.leading * (o.lines.length - 1);
      if (blockH(size) > h * 0.98) size = (h * 0.98) / (capRatio * (1 + o.leading * (o.lines.length - 1)));
      m.font = `${o.weight} ${size}px ${o.fontFamily}`;
      const cap = size * capRatio;
      const lineH = cap * o.leading;
      const top = (h - (cap + lineH * (o.lines.length - 1))) / 2 + cap;
      m.fillStyle = "#000";
      m.textBaseline = "alphabetic";
      o.lines.forEach((l, i) => {
        const bw = m.measureText(l).width;
        m.fillText(l, (w - bw) / 2, top + lineH * i);
      });
      const img = m.getImageData(0, 0, w, h).data;

      const gap = Math.max(2.6, w * o.pitch);
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);
      const tmp: number[] = [];
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let sum = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3));
              const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3));
              sum += img[(y * w + x) * 4 + 3];
            }
          }
          const cov = sum / (9 * 255);
          if (cov < 0.07) continue;
          const hx = gx * gap + gap / 2;
          const hy = gy * gap + gap / 2;
          const line = Math.min(o.lines.length - 1, Math.max(0, Math.floor((hy - (top - cap - (lineH - cap) / 2)) / lineH)));
          const c = o.colorAt(hx / w, hy / h, line);
          tmp.push(hx, hy, 0, 0, hx, hy, dotRadius(cov, gap), c[0], c[1], c[2]);
        }
      }
      dots = new Float32Array(tmp);
      count = tmp.length / S;
      awake = true;
    };

    const draw = (now: number) => {
      const o = opts.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const r = reduced ? 0 : o.radius * w;
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t;
      const ringR = ringAge * 0.9;
      let moving = false;
      for (let i = 0; i < count; i++) {
        const j = i * S;
        let x = dots[j];
        let y = dots[j + 1];
        let vx = dots[j + 2];
        let vy = dots[j + 3];
        const hx = dots[j + 4];
        const hy = dots[j + 5];
        if (!reduced) {
          if (ringAge < 900) {
            const dx = hx - ring.x;
            const dy = hy - ring.y;
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
            const band = 1 - Math.min(1, Math.abs(d - ringR) / 26);
            if (band > 0) {
              const f = band * 3.2 * (1 - ringAge / 900);
              vx += (dx / d) * f;
              vy += (dy / d) * f;
            }
          }
          const s = spring(x, y, vx, vy, hx, hy, px, py, r);
          x = s[0]; y = s[1]; vx = s[2]; vy = s[3];
          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) moving = true;
          else { x = hx; y = hy; vx = 0; vy = 0; }
          dots[j] = x; dots[j + 1] = y; dots[j + 2] = vx; dots[j + 3] = vy;
        }
        const k = Math.min(1, Math.hypot(x - hx, y - hy) / 26);
        const R = dots[j + 7], G = dots[j + 8], B = dots[j + 9];
        ctx.fillStyle = k > 0.02
          ? `rgb(${Math.round(R + (o.warm[0] - R) * k)},${Math.round(G + (o.warm[1] - G) * k)},${Math.round(B + (o.warm[2] - B) * k)})`
          : `rgb(${R},${G},${B})`;
        ctx.beginPath();
        ctx.arc(x, y, dots[j + 6], 0, 6.2832);
        ctx.fill();
      }
      awake = moving || ringAge < 900 || px > -1e4;
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      draw(now);
      if (awake) raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      awake = true;
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };
    const local = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    };
    // listen on the hero (nearest section) so the dots react even when the cursor is over a layer above the canvas
    const host = (box.closest("section") as HTMLElement) || box;
    const onMove = (e: PointerEvent) => { if (e.pointerType !== "mouse" || reduced) return; const p = local(e); px = p[0]; py = p[1]; wake(); };
    const onLeave = () => { px = -1e5; py = -1e5; wake(); };
    const onDown = (e: PointerEvent) => {
      if (reduced || (e.target as HTMLElement).closest("a,button")) return;
      const p = local(e);
      if (p[0] < 0 || p[1] < 0 || p[0] > w || p[1] > h) return;
      ring = { x: p[0], y: p[1], t: performance.now() };
      wake();
    };

    layout();
    draw(performance.now());
    box.dataset.ready = "true";
    wake();
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    const ro = new ResizeObserver(() => { layout(); wake(); });
    ro.observe(box);
    const io = new IntersectionObserver((en) => { visible = en[0] ? en[0].isIntersecting : true; if (visible) wake(); });
    io.observe(box);
    let alive = true;
    // make sure the heavy face is actually loaded before the word is sampled, then re-sample in the real face
    Promise.all([document.fonts?.load(`${opts.current.weight} 100px ${opts.current.fontFamily}`).catch(() => []), document.fonts?.ready]).then(() => {
      if (alive) { layout(); wake(); }
    });
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [key, colorAt]);

  return (
    <span ref={wrap} className={`halftone-text ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
