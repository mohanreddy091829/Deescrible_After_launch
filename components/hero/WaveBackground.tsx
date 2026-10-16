"use client";

import React, { useEffect, useRef } from "react";

const SCALE = 6; // one computed pixel per 6 screen pixels; the browser smooths it up, which suits soft waves
const FRAME_MS = 1000 / 24;

/**
 * Soft animated wave field for the cream side of the hero. Adapted from a canvas wave shader and tinted
 * for a light ground: it only darkens the cream a few percent toward rose, so dark text stays fully
 * readable. The red panel sits above this layer, so the effect never shows on the red. It pauses off
 * screen and draws one still frame for reduced-motion visitors.
 */
export function WaveBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const SIN = new Float32Array(1024);
    const COS = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const a = (i / 1024) * Math.PI * 2;
      SIN[i] = Math.sin(a);
      COS[i] = Math.cos(a);
    }
    const TAU = Math.PI * 2;
    const idx = (x: number) => Math.floor((((x % TAU) + TAU) % TAU) / TAU * 1024) & 1023;
    const fsin = (x: number) => SIN[idx(x)];
    const fcos = (x: number) => COS[idx(x)];

    let w = 0;
    let h = 0;
    let img: ImageData;
    const size = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(8, Math.ceil(r.width / SCALE));
      h = Math.max(8, Math.ceil(r.height / SCALE));
      canvas.width = w;
      canvas.height = h;
      img = ctx.createImageData(w, h);
    };

    const draw = (t: number) => {
      const d = img.data;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const ux = (2 * x - w) / h;
          const uy = (2 * y - h) / h;
          let a = 0;
          let b = 0;
          for (let i = 0; i < 4; i++) {
            a += fcos(i - b + t * 0.4 - a * ux);
            b += fsin(i * uy + a);
          }
          const wave = (fsin(a) + fcos(b)) * 0.25 + 0.5; // 0..1
          const accent = (fcos(b * 2 + t * 0.1) + 1) * 0.5;
          // cream (248,236,226) shaded toward soft rose / blush; never darker than about (238,208,198)
          const o = (y * w + x) * 4;
          d[o] = 248 - 5 * wave;
          d[o + 1] = 237 - 22 * wave - 6 * accent * wave;
          d[o + 2] = 228 - 24 * wave - 4 * accent * wave;
          d[o + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    size();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    let last = 0;
    let visible = true;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < FRAME_MS) return;
      last = now;
      draw((now - start) / 1000);
    };
    draw(2.5);
    if (!reduced) raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      size();
      draw(2.5);
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="rh__wave" aria-hidden="true" />;
}
