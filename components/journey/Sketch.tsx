import React from "react";

/** Folded-paper plane, pointing along +x. */
export function Plane() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M18 0 L-18 -12 L-8 0Z" fill="#fbf8f1" stroke="#3b342c" strokeWidth="1" />
      <path d="M18 0 L-8 0 L-15 8Z" fill="#e3dbc9" stroke="#3b342c" strokeWidth="1" />
      <path d="M-8 0 L-18 -12 L-14 -1Z" fill="#cfc6b2" stroke="#3b342c" strokeWidth=".7" />
      <path d="M18 0 L-8 0" stroke="#3b342c" strokeWidth=".8" />
    </g>
  );
}

/** Map-style pin: the tip sits at (0,0). */
export function PinShape({ color }: { color: string }) {
  return (
    <svg viewBox="-14 -36 28 38" width="28" height="38" aria-hidden="true" style={{ overflow: "visible" }}>
      <path d="M0 0 C-3 -9 -12 -14 -12 -23 A12 12 0 0 1 12 -23 C12 -14 3 -9 0 0Z" fill={color} stroke="#fff6e6" strokeWidth="1.6" />
      <circle cx="0" cy="-23" r="4.4" fill="#fff6e6" />
      <path d="M-6 -30 C-3 -33 1 -33 3 -32" stroke="#fff" strokeWidth="1.6" opacity=".55" fill="none" strokeLinecap="round" />
    </svg>
  );
}
