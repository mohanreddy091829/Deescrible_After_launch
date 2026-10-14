"use client";

import React, { useEffect, useState } from "react";
import { HalftoneText, type RGB } from "@/components/ui/halftone-text";

const mix = (a: RGB, b: RGB, t: number): RGB => [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)];
const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Ink per line: [on cream, on the red panel]
const LINE0: [RGB, RGB] = [[20, 18, 17], [250, 228, 216]];
const LINE1: [RGB, RGB] = [[112, 16, 26], [238, 192, 186]];

/**
 * Desktop geometry mirrors the CSS in globals.css (units are 1% of the hero width):
 * canvas box = left 4.4, top 28.7, 66 × 17.4; the red panel's edge is the circle centred (114.5, 59.9), r 77.7.
 * The word is dark where it sits on cream and light where it crosses onto the red photo, with a soft ramp.
 */
const BOX = { x: 4.4, y: 28.7, w: 66, h: 17.4 };
const EDGE = { cx: 114.5, cy: 59.9, r: 77.7 };

export function HeroName({ first, last }: { first: string; last: string }) {
  const [family, setFamily] = useState("");
  const [narrow, setNarrow] = useState<boolean | null>(null);

  useEffect(() => {
    const read = () => setFamily(getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim());
    read();
    const mq = window.matchMedia("(max-width: 899px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const colorAt = React.useCallback(
    (xr: number, yr: number, line: number): RGB => {
      const [dark, light] = line === 0 ? LINE0 : LINE1;
      if (narrow) return dark; // on mobile the word sits fully on cream, below the photo
      const x = BOX.x + xr * BOX.w;
      const y = BOX.y + yr * BOX.h;
      const edge = EDGE.cx - Math.sqrt(Math.max(0, EDGE.r * EDGE.r - (y - EDGE.cy) ** 2));
      return mix(dark, light, smooth(edge - 2.4, edge + 2.4, x));
    },
    [narrow],
  );

  return (
    <h1 className="rh__name" data-ready={family && narrow !== null ? "true" : "false"}>
      {family && narrow !== null ? (
        <HalftoneText
          lines={[first, last]}
          colorAt={colorAt}
          fontFamily={family}
          weight={900}
          pitch={narrow ? 0.0058 : 0.0044}
          leading={1.12}
          radius={narrow ? 0.12 : 0.085}
          label={`${first} ${last}`.replace(/\b(\w)(\w*)/g, (_, a: string, b: string) => a + b.toLowerCase())}
        />
      ) : (
        <span className="sr-only">{`${first} ${last}`}</span>
      )}
    </h1>
  );
}
