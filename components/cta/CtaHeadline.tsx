"use client";

import React, { useEffect, useState } from "react";
import { HalftoneText, type RGB } from "@/components/ui/halftone-text";

const ROSE: RGB = [244, 205, 198];
const BLUSH: RGB = [226, 150, 150];

/** The big interactive halftone headline. Dots part around the pointer; the real text is kept for screen readers. */
export function CtaHeadline() {
  const [family, setFamily] = useState("");
  const [narrow, setNarrow] = useState<boolean | null>(null);
  useEffect(() => {
    const read = () => setFamily(getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim());
    read();
    const mq = window.matchMedia("(max-width: 699px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const colorAt = React.useCallback((_x: number, _y: number, line: number): RGB => (line % 2 === 0 ? ROSE : BLUSH), []);
  return (
    <h2 className="cta__headline">
      {family && narrow !== null ? (
        <HalftoneText lines={narrow ? ["LET'S", "CREATE", "WHAT'S", "NEXT."] : ["LET'S CREATE", "WHAT'S NEXT."]} colorAt={colorAt} fontFamily={family} weight={900} pitch={narrow ? 0.0056 : 0.0046} leading={1.1} radius={narrow ? 0.14 : 0.08} warm={[255, 120, 90]} label="Let's create what's next." />
      ) : (
        <span className="sr-only">Let&apos;s create what&apos;s next.</span>
      )}
    </h2>
  );
}
