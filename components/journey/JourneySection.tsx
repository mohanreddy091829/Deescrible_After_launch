"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY_COPY, JOURNEY_MILESTONES } from "@/data/experience";
import {
  ART, SUN, SUN_CLIP, PANEL, TORN_TOP, TORN_BOTTOM_VIEWBOX, VIEWBOX, W, H, X0, X1,
  GOLD_LEFT, GOLD_RIGHT, GOLD_RIGHT_LENGTH, PINS, PLANE_START, GIRL, GIRL_SCALE, GIRL_ROT, GIRL_X, GIRL_Y,
  vx, VERTICAL, TERRAIN, FOOT_GRASS, MR,
} from "./journey-art";
import { PinShape, Plane } from "./Sketch";
import { PIN_TIMES, T_END, T_LAND, armAngle, lean, mobileArc, planePose, rise } from "./throw";

const INK = "#3b342c";
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** Sketched mountains and sun. The same art renders on desktop (wide) and mobile (cropped). */
function Mountains({ id, viewBox, cls, par }: { id: string; viewBox: string; cls: string; par: string }) {
  const svg = { viewBox, preserveAspectRatio: par, className: cls, "aria-hidden": true as const };
  const draw = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 0, fill: "none", strokeLinecap: "round" as const };
  return (
    <>
      <svg {...svg} data-j="far-fill">
        <defs>
          <clipPath id={`${id}-cf`}><path d={ART.far.clip} /></clipPath>
          <linearGradient id={`${id}-gf`} gradientUnits="userSpaceOnUse" x1="0" y1="330" x2="0" y2="640">
            <stop offset="0" stopColor="#8a7a63" stopOpacity=".36" /><stop offset="1" stopColor="#8a7a63" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={ART.far.wash} fill={`url(#${id}-gf)`} />
        <g clipPath={`url(#${id}-cf)`}><path d={ART.far.hatch} fill="none" stroke="#7a6c5a" strokeWidth=".8" opacity=".5" /></g>
      </svg>
      <svg {...svg} data-j="far-line">
        <path d={ART.far.line} stroke={INK} strokeWidth="1.3" opacity=".7" {...draw} />
        <path d={ART.far.line2} stroke={INK} strokeWidth=".7" opacity=".45" {...draw} />
      </svg>
      <svg {...svg} data-j="sun">
        <defs>
          <radialGradient id={`${id}-sun`} cx=".42" cy=".4" r=".7">
            <stop offset="0" stopColor="#f6b86f" /><stop offset=".6" stopColor="#ec8f42" /><stop offset="1" stopColor="#dc702c" />
          </radialGradient>
          <clipPath id={`${id}-sc`}><path d={SUN_CLIP} /></clipPath>
        </defs>
        <g clipPath={`url(#${id}-sc)`}>
          <circle cx={SUN.cx} cy={SUN.cy} r={SUN.r + 15} fill="none" stroke="#e98a3f" strokeWidth="1" opacity=".35" />
          <circle cx={SUN.cx} cy={SUN.cy} r={SUN.r} fill={`url(#${id}-sun)`} />
        </g>
      </svg>
      <svg {...svg} data-j="mid-fill">
        <defs>
          <clipPath id={`${id}-cm`}><path d={ART.mid.clip} /></clipPath>
          <linearGradient id={`${id}-gm`} gradientUnits="userSpaceOnUse" x1="0" y1="240" x2="0" y2="700">
            <stop offset="0" stopColor="#4d4033" stopOpacity=".66" /><stop offset=".55" stopColor="#6b5a47" stopOpacity=".34" /><stop offset="1" stopColor="#6b5a47" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* opaque paper tone underneath so the sun can never show through the mountain */}
        <path d={ART.mid.wash} fill="#e3d8c1" />
        <path d={ART.mid.wash} fill={`url(#${id}-gm)`} />
        <g clipPath={`url(#${id}-cm)`}><path d={ART.mid.hatch} fill="none" stroke="#3b3128" strokeWidth=".9" opacity=".6" /></g>
      </svg>
      <svg {...svg} data-j="mid-line">
        <path d={ART.mid.line} stroke={INK} strokeWidth="1.6" opacity=".85" {...draw} />
        <path d={ART.mid.line2} stroke={INK} strokeWidth=".8" opacity=".5" {...draw} />
      </svg>
    </>
  );
}

const SCRIBBLE =
  "M70 175C40 90 150 28 270 36S410 110 372 196S248 304 128 276S12 198 62 118S206 34 304 66S392 160 340 232S214 290 140 250";

/** A letter hanging from a nail by two threads; used on desktop and mobile. */
function HangingLetter({ cls }: { cls: string }) {
  return (
    <div className={cls} data-j="fold" aria-hidden="true">
      <div className="jd__sway" data-j="sway">
        <svg viewBox="0 0 240 110" className="jd__threads" data-j="threads">
          <circle cx="120" cy="7" r="5.5" fill="#6b5f50" stroke="#3b342c" strokeWidth="1.2" />
          <path d="M120 8L46 112M120 8L194 112" stroke="#6b5f50" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
        <div className="jd__letter">
          <svg viewBox="0 0 420 320" className="jd__scribble">
            <path data-j="scribble" d={SCRIBBLE} pathLength={1} fill="none" stroke="#4a4036" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1" strokeDashoffset="0" opacity=".8" />
          </svg>
          <svg viewBox="0 0 240 170" className="jd__sheet">
            <path d="M14 16 L226 8 L233 155 L9 162Z" fill="#f4eee0" stroke="#3b342c" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M14 16 L122 90 L9 162Z" fill="#e6dec9" />
            <path d="M226 8 L122 90 L233 155Z" fill="#ebe4d1" />
            <path d="M14 16 L122 90 L226 8M9 162 L122 90 L233 155" fill="none" stroke="#3b342c" strokeWidth="1.1" opacity=".55" />
            <path d="M200 8 L226 8 L226 34Z" fill="#d9d0ba" stroke="#3b342c" strokeWidth=".9" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Legs, torso (leans about the hip) and forearm (swings about the cuff), cut from the approved character art. */
function Walker({ cls, style }: { cls: string; style?: React.CSSProperties }) {
  const img = { width: GIRL.w, height: GIRL.h, unoptimized: true, draggable: false } as const;
  return (
    <div className={cls} data-j="girl" style={style}>
      <Image src="/assets/journey/girl-lower.webp" alt="" {...img} />
      <div className="jd__upper" data-j="upper">
        <Image src="/assets/journey/girl-upper.webp" alt="" {...img} />
        <Image className="jd__arm" data-j="arm" src="/assets/journey/girl-arm.webp" alt="" {...img} />
      </div>
    </div>
  );
}

export function JourneySection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const mm = gsap.matchMedia();

    const draw0 = (t: gsap.TweenTarget) => gsap.set(t, { strokeDashoffset: 1 });
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    /** Opens `target`'s clip-path from a small centred rectangle to the full box. */
    const clipOpener = (target: HTMLElement, from: [number, number, number, number], radius: number) => {
      const state = { o: 0 };
      const apply = () => {
        const k = 1 - state.o;
        target.style.clipPath = `inset(${(from[0] * k).toFixed(2)}% ${(from[1] * k).toFixed(2)}% ${(from[2] * k).toFixed(2)}% ${(from[3] * k).toFixed(2)}% round ${(radius * k).toFixed(1)}px)`;
      };
      apply();
      return { state, apply };
    };

    // ------------------------------------------------------------------ desktop (pinned)
    const desktop = () => {
      el.classList.add("is-anim");
      const jd = el.querySelector<HTMLElement>(".jd")!;
      const q = (s: string) => Array.from(jd.querySelectorAll<HTMLElement>(s));
      const one = (s: string) => jd.querySelector<HTMLElement>(s)!;
      const lines = q('[data-j$="-line"] path');
      const msEls = q('[data-j="ms"]');
      const fold = one('[data-j="fold"]');
      const sway = one('[data-j="sway"]');
      const paper = one('[data-j="paper"]');
      const arm = one('[data-j="arm"]');
      const upper = one('[data-j="upper"]');
      const fg = one('[data-j="fg"]');
      const unit = () => one('.jd__scene').offsetWidth / W;
      const planeOuter = one('[data-j="plane-pos"]');
      const planeInner = one('[data-j="plane"]');
      const goldRight = q('[data-j="gold-right"]');

      const opener = clipOpener(paper, [50, 50, 50, 50], 10);
      gsap.set(fold, { autoAlpha: 1 });
      draw0(q('[data-j="scribble"]'));
      gsap.set(q('[data-j="eyebrow"], [data-j="intro"]'), { autoAlpha: 0, y: 24 });
      gsap.set(q('[data-j="hline"] > span'), { yPercent: 112 });
      gsap.set(q('[data-j="edge"], [data-j="curl"]'), { autoAlpha: 0 });
      gsap.set(q('[data-j="far-fill"], [data-j="mid-fill"]'), { clipPath: "inset(0 100% 0 0)" });
      draw0(lines);
      gsap.set(one('[data-j="sun"]'), { autoAlpha: 0, y: 110 });
      gsap.set([one('[data-j="girl"]'), fg], { autoAlpha: 0, y: 18 });
      gsap.set(arm, { transformOrigin: `${(GIRL.px / GIRL.w) * 100}% ${(GIRL.py / GIRL.h) * 100}%`, rotation: 0 });
      gsap.set(upper, { transformOrigin: `${(GIRL.lx / GIRL.w) * 100}% ${(GIRL.ly / GIRL.h) * 100}%`, rotation: 0 });
      gsap.set(one('[data-j="panel"]'), { clipPath: "inset(100% 0 0 0)" });
      draw0(q('[data-j="gold"] path'));
      gsap.set(planeInner, { autoAlpha: 0, scale: 0.4 });
      msEls.forEach((m) => {
        gsap.set(m.querySelector('[data-j="pin"]'), { autoAlpha: 0, scale: 0, y: -26, transformOrigin: "50% 100%" });
        gsap.set(m.querySelectorAll('[data-j="glow"]'), { autoAlpha: 0 });
        gsap.set(m.querySelectorAll('[data-j="mt"]'), { autoAlpha: 0, y: 16 });
      });

      const revealMs = (i: number) => {
        const m = msEls[i];
        const t = gsap.timeline();
        t.to(m.querySelector('[data-j="pin"]'), { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2.6)" }, 0);
        t.fromTo(m.querySelector('[data-j="glow"]'), { autoAlpha: 0.85, scale: 0.3 }, { autoAlpha: 0, scale: 2.8, duration: 0.9, ease: "power2.out" }, 0.08);
        t.to(m.querySelectorAll('[data-j="mt"]'), { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12, ease: "power2.out" }, 0.14);
        return t;
      };

      // one clock drives arm, plane and gold line, so they can never drift apart
      const clock = { t: 0 };
      const update = () => {
        const t = clock.t;
        gsap.set(arm, { rotation: armAngle(t) });
        gsap.set(upper, { rotation: lean(t), y: rise(t) * unit() });
        const p = planePose(t);
        planeOuter.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.rot.toFixed(1)})`);
        gsap.set(planeInner, { autoAlpha: p.visible ? 1 : 0, scale: p.scale });
        gsap.set(goldRight, { strokeDashoffset: 1 - clamp01((p.len - PLANE_START) / GOLD_RIGHT_LENGTH) });
      };
      update();

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: jd,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 5.2)}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const S = 0.8; // the letter's drop adds this much lead-in before the old sequence
      const dropY = () => jd.clientHeight / 2 - 0.6775 * fold.offsetWidth * 1.08;

      // 1 — the hanging letter stops swaying, drops to the centre; a pencil scribble circles it
      tl.to(sway, { "--sway": "0deg", duration: 0.9, ease: "power1.out" }, 0)
        .to(fold, { y: dropY, scale: 1.08, duration: 1.3, ease: "power2.inOut" }, 0)
        .to(q('[data-j="threads"]'), { autoAlpha: 0, duration: 0.5, ease: "none" }, 0.7)
        .to(q('[data-j="scribble"]'), { strokeDashoffset: 0, duration: 1.2, ease: "none" }, 1.1)
        // 2 — the sheet opens out from its centre
        .to(opener.state, { o: 1, duration: 1.7, ease: "power3.inOut", onUpdate: opener.apply }, 1.4 + S)
        .to(fold, { scale: 3, autoAlpha: 0, duration: 1.2, ease: "power2.in" }, 1.4 + S)
        .to(q('[data-j="scribble"]'), { autoAlpha: 0, duration: 0.7 }, 1.6 + S)
        .to(q('[data-j="edge"], [data-j="curl"]'), { autoAlpha: 1, duration: 0.6 }, 2.6 + S)
        // 3 — heading and intro
        .to(q('[data-j="eyebrow"]'), { autoAlpha: 1, y: 0, duration: 0.6 }, 2.8 + S)
        .to(q('[data-j="hline"] > span'), { yPercent: 0, duration: 0.9, stagger: 0.18, ease: "power3.out" }, 2.9 + S)
        .to(q('[data-j="intro"]'), { autoAlpha: 1, y: 0, duration: 0.8 }, 3.3 + S)
        // 4 — the landscape is sketched in
        .to(lines.slice(0, 2), { strokeDashoffset: 0, duration: 1.6, ease: "none", stagger: 0.05 }, 3.2 + S)
        .to(one('[data-j="far-fill"]'), { clipPath: "inset(0 0% 0 0)", duration: 1.8, ease: "none" }, 3.2 + S)
        .to(one('[data-j="sun"]'), { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" }, 3.6 + S)
        .to(lines.slice(2), { strokeDashoffset: 0, duration: 1.7, ease: "none", stagger: 0.05 }, 4.0 + S)
        .to(one('[data-j="mid-fill"]'), { clipPath: "inset(0 0% 0 0)", duration: 1.9, ease: "none" }, 4.0 + S)
        .to([one('[data-j="girl"]'), fg], { autoAlpha: 1, y: 0, duration: 0.9 }, 5.0 + S)
        // 5 — charcoal panel rises, first milestone appears
        .to(one('[data-j="panel"]'), { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "power3.out" }, 5.6 + S)
        .to(q('[data-j="gold-left"]'), { strokeDashoffset: 0, duration: 1.1, ease: "none" }, 6.1 + S)
        .add(revealMs(0), 6.5 + S);

      // 6 — she pulls a paper plane from her pocket and throws it; it glides the ridge, lighting each milestone
      const T0 = 7.3 + S;
      tl.to(clock, { t: T_END, duration: T_END, ease: "none", onUpdate: update }, T0);
      PINS.slice(1).forEach((_, k) => tl.add(revealMs(k + 1), T0 + PIN_TIMES[k + 1] - 0.1));
      tl.to({}, { duration: 0.9 }, T0 + T_END); // hold on the finished scene

      return () => el.classList.remove("is-anim");
    };

    // ------------------------------------------------------------------ mobile (natural scroll)
    const mobile = () => {
      el.classList.add("is-anim");
      const jm = el.querySelector<HTMLElement>(".jm")!;
      const q = (s: string) => Array.from(jm.querySelectorAll<HTMLElement>(s));
      const one = (s: string) => jm.querySelector<HTMLElement>(s)!;
      const lis = q('[data-j="mli"]');
      const paper = one('[data-j="paper"]');
      const girl = one('[data-j="girl"]');
      const arm = one('[data-j="arm"]');
      const upper = one('[data-j="upper"]');
      const plane = one('[data-j="mplane"]');
      const list = one('[data-j="mlist"]');

      const opener = clipOpener(paper, [0, 50, 100, 50], 14);
      gsap.set(q('[data-j="eyebrow"], [data-j="intro"]'), { autoAlpha: 0, y: 20 });
      gsap.set(q('[data-j="hline"] > span'), { yPercent: 112 });
      draw0(q('[data-j="scribble"]'));
      gsap.set(q('[data-j="far-fill"], [data-j="mid-fill"]'), { clipPath: "inset(0 100% 0 0)" });
      draw0(q('[data-j$="-line"] path'));
      gsap.set(one('[data-j="sun"]'), { autoAlpha: 0, y: 40 });
      draw0(q('[data-j="mgold"]'));
      gsap.set(plane, { autoAlpha: 0, xPercent: -50, yPercent: -50, left: 0, top: 0 });
      gsap.set(girl, { autoAlpha: 0, y: 16 });
      gsap.set(arm, { transformOrigin: `${(GIRL.px / GIRL.w) * 100}% ${(GIRL.py / GIRL.h) * 100}%`, rotation: 0 });
      gsap.set(upper, { transformOrigin: `${(GIRL.lx / GIRL.w) * 100}% ${(GIRL.ly / GIRL.h) * 100}%`, rotation: 0 });
      lis.forEach((li) => {
        gsap.set(li.querySelector('[data-j="pin"]'), { autoAlpha: 0, scale: 0, y: -20, transformOrigin: "50% 100%" });
        gsap.set(li.querySelectorAll('[data-j="mt"]'), { autoAlpha: 0, y: 14 });
      });

      // letter opens into the sheet
      gsap.timeline({ scrollTrigger: { trigger: jm, start: "top 38%", once: true } })
        .to(q('[data-j="sway"]'), { "--sway": "0deg", duration: 0.5 }, 0)
        .to(q('[data-j="threads"]'), { autoAlpha: 0, duration: 0.3 }, 0.1)
        .to(q('[data-j="fold"]'), { y: 24, scale: 2.4, autoAlpha: 0, duration: 1.0, ease: "power2.in" }, 0.2)
        .to(opener.state, { o: 1, duration: 1.2, ease: "power3.inOut", onUpdate: opener.apply }, 0.25)
        .to(q('[data-j="eyebrow"]'), { autoAlpha: 1, y: 0, duration: 0.5 }, 0.8)
        .to(q('[data-j="hline"] > span'), { yPercent: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 0.9)
        .to(q('[data-j="intro"]'), { autoAlpha: 1, y: 0, duration: 0.7 }, 1.3)
        .to(q('[data-j="scribble"]'), { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut" }, 1.4);

      const lines = q('[data-j$="-line"] path');
      gsap.timeline({ scrollTrigger: { trigger: one('[data-j="art"]'), start: "top 85%", once: true } })
        .to(lines.slice(0, 2), { strokeDashoffset: 0, duration: 1.3, ease: "none" })
        .to(one('[data-j="far-fill"]'), { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "none" }, 0)
        .to(one('[data-j="sun"]'), { autoAlpha: 1, y: 0, duration: 1 }, 0.5)
        .to(lines.slice(2), { strokeDashoffset: 0, duration: 1.3, ease: "none" }, 0.6)
        .to(one('[data-j="mid-fill"]'), { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "none" }, 0.6);

      // geometry of the standing figure in list-relative px
      const S = girl.offsetWidth / GIRL.w;
      const rot = (x: number, y: number, deg: number): [number, number] => {
        const a = (deg * Math.PI) / 180;
        return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
      };
      const hand = (deg: number, leanDeg: number): [number, number] => {
        const [rx, ry] = rot(GIRL.hx - GIRL.px, GIRL.hy - GIRL.py, deg);
        const [lx, ly] = rot(GIRL.px + rx - GIRL.lx, GIRL.py + ry - GIRL.ly, leanDeg);
        return [girl.offsetLeft + (GIRL.lx + lx) * S - list.offsetLeft, girl.offsetTop + (GIRL.ly + ly) * S - list.offsetTop];
      };
      const lineX = () => (vx(0) / 40) * list.querySelector<HTMLElement>(".jm__track")!.offsetWidth;
      const land = (): [number, number] => [lineX() + 10, 26];

      const placePlane = (x: number, y: number, rotDeg: number, scale: number, visible: boolean) => {
        gsap.set(plane, { autoAlpha: visible ? 1 : 0, x: 0, y: 0, left: x, top: y, rotation: rotDeg, scale });
      };

      // the throw plays once as she comes into view
      const clock = { t: 0 };
      const throwTl = gsap.timeline({ paused: true });
      throwTl.to(girl, { autoAlpha: 1, y: 0, duration: 0.5 }, 0).to(
        clock,
        {
          t: T_LAND,
          duration: 2.6,
          ease: "none",
          onUpdate: () => {
            gsap.set(arm, { rotation: armAngle(clock.t) });
            gsap.set(upper, { rotation: lean(clock.t), y: rise(clock.t) * S * 5 });
            const p = mobileArc(hand, land(), clock.t);
            placePlane(p.x, p.y, p.rot, p.scale, p.visible);
          },
        },
        0.3,
      );
      ScrollTrigger.create({ trigger: girl, start: "top 80%", once: true, onEnter: () => throwTl.play() });

      // then the scroll carries the plane down the line and unveils each milestone
      const prog = { p: 0 };
      const applyScroll = () => {
        if (clock.t < T_LAND - 0.01) return; // still in the air; the throw owns the plane
        const p = prog.p;
        gsap.set(q('[data-j="mgold"]'), { strokeDashoffset: 1 - p });
        const h = list.querySelector<HTMLElement>(".jm__list")!.offsetHeight;
        const w = list.querySelector<HTMLElement>(".jm__track")!.offsetWidth;
        const dx = vx(Math.min(1, p + 0.01)) - vx(Math.max(0, p - 0.01));
        const ang = 90 + Math.atan2(dx * (w / 40), 0.02 * h) * (180 / Math.PI) * 0.6;
        const sx = (vx(p) / 40) * w + 8, sy = Math.max(26, p * h);
        placePlane(sx, sy, ang, 1, p < 0.985);
      };
      throwTl.eventCallback("onComplete", applyScroll);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 62%", scrub: 0.7 },
      });
      tl.to(prog, { p: 1, duration: 1, ease: "none", onUpdate: applyScroll }, 0);
      lis.forEach((li, i) => {
        const f = (i * 118 + 18) / (lis.length * 118);
        const t = gsap.timeline();
        t.to(li.querySelector('[data-j="pin"]'), { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2.6)" }, 0)
          .to(li.querySelectorAll('[data-j="mt"]'), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.1);
        tl.add(t, Math.max(0, f - 0.02));
      });
      return () => el.classList.remove("is-anim");
    };

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", desktop);
    mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", mobile);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  const girlStyle: React.CSSProperties = {
    left: pct(GIRL_X - GIRL.ax * GIRL_SCALE, W),
    top: pct(GIRL_Y + 2 - GIRL.ay * GIRL_SCALE, H),
    width: pct(GIRL.w * GIRL_SCALE, W),
    transformOrigin: `${(GIRL.ax / GIRL.w) * 100}% ${(GIRL.ay / GIRL.h) * 100}%`,
    transform: `rotate(${GIRL_ROT.toFixed(2)}deg)`,
  };

  return (
    <section id="journey" ref={root} className="journey" aria-label="Career journey">
      <noscript>
        <style>{`.jd__paper,.jm__paper{clip-path:none!important;opacity:1!important}.jd__fold,.jm__fold{display:none!important}`}</style>
      </noscript>

      {/* ============================ DESKTOP ============================ */}
      <div className="jd">
        <div className="jd__stage">
          <HangingLetter cls="jd__fold" />

          <div className="jd__paper" data-j="paper">
            <div className="jd__scene">
              <Mountains id="d" viewBox={VIEWBOX} cls="jd__layer" par="none" />

              {/* charcoal panel + gold ridge */}
              <svg viewBox={VIEWBOX} preserveAspectRatio="none" className="jd__layer" data-j="panel" aria-hidden="true">
                <defs>
                  <linearGradient id="d-panel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#24211f" /><stop offset="1" stopColor="#151413" />
                  </linearGradient>
                </defs>
                <path d={PANEL.body} fill="url(#d-panel)" />
                <path d={PANEL.strata} fill="none" stroke="#fff" strokeWidth=".8" opacity=".05" />
                <path d={PANEL.grit} fill="none" stroke="#d8c7a4" strokeWidth=".8" opacity=".16" strokeLinecap="round" />
                <path d={TERRAIN.scratches} fill="none" stroke="#8a6c4f" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity=".42" />
                <path d={TERRAIN.shrubs} fill="#1d1b18" />
                <path d={TERRAIN.shrubHi} fill="none" stroke="#c9a25b" strokeWidth="1" opacity=".55" strokeLinecap="round" />
                <path d={TERRAIN.rockBody} fill="#2b2825" stroke="#0e0d0c" strokeWidth="1.1" strokeLinejoin="round" />
                <path d={TERRAIN.rockFacet} fill="none" stroke="#0e0d0c" strokeWidth="1" opacity=".7" strokeLinecap="round" />
                <path d={TERRAIN.rockHi} fill="none" stroke="#9a8160" strokeWidth="1.1" opacity=".75" strokeLinecap="round" strokeLinejoin="round" />
                <path d={TERRAIN.grassDark} fill="none" stroke="#1b1916" strokeWidth="1.5" strokeLinecap="round" />
                <path d={TERRAIN.grassGold} fill="none" stroke="#b8933f" strokeWidth="1.3" strokeLinecap="round" opacity=".85" />
                <path d={PANEL.tornBottom} fill="#f7f3ea" />
              </svg>
              <svg viewBox={VIEWBOX} preserveAspectRatio="none" className="jd__layer" data-j="gold" aria-hidden="true">
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path data-j="gold-left" d={GOLD_LEFT} pathLength={1} strokeDasharray="1" strokeDashoffset="0" stroke="#f0c777" strokeWidth="9" opacity=".16" />
                  <path data-j="gold-left" d={GOLD_LEFT} pathLength={1} strokeDasharray="1" strokeDashoffset="0" stroke="#e8b95f" strokeWidth="2.6" />
                  <path data-j="gold-right" d={GOLD_RIGHT} pathLength={1} strokeDasharray="1" strokeDashoffset="0" stroke="#f0c777" strokeWidth="9" opacity=".16" />
                  <path data-j="gold-right" d={GOLD_RIGHT} pathLength={1} strokeDasharray="1" strokeDashoffset="0" stroke="#e8b95f" strokeWidth="2.6" />
                </g>
              </svg>

              <Walker cls="jd__girl" style={girlStyle} />
              <svg viewBox={VIEWBOX} preserveAspectRatio="none" className="jd__layer" data-j="fg" aria-hidden="true">
                <path d={FOOT_GRASS.dark} fill="none" stroke="#1b1916" strokeWidth="1.6" strokeLinecap="round" />
                <path d={FOOT_GRASS.gold} fill="none" stroke="#b8933f" strokeWidth="1.4" strokeLinecap="round" opacity=".9" />
              </svg>

              <svg viewBox={VIEWBOX} preserveAspectRatio="none" className="jd__layer" aria-hidden="true">
                <g data-j="plane-pos"><g data-j="plane"><Plane /></g></g>
              </svg>

              {/* copy */}
              <p className="jd__eyebrow" data-j="eyebrow">{JOURNEY_COPY.eyebrow}</p>
              <h2 className="jd__heading">
                <span className="jd__hline" data-j="hline"><span>{JOURNEY_COPY.headingTop}</span></span>
                <span className="jd__hline" data-j="hline"><span>{JOURNEY_COPY.headingBottom}</span></span>
              </h2>
              <p className="jd__intro" data-j="intro">{JOURNEY_COPY.intro}</p>

              <ol className="jd__list">
                {JOURNEY_MILESTONES.map((m, i) => (
                  <li key={m.id} className="jd__ms" data-j="ms" style={{ left: pct(PINS[i].x, W), top: pct(PINS[i].y, H) }}>
                    <span className="jd__pin" data-j="pin">
                      <span className="jd__glow" data-j="glow" style={{ background: m.pin }} />
                      <PinShape color={m.pin} />
                    </span>
                    <div className="jd__mtext">
                      <span className="jd__year" data-j="mt">{m.period}</span>
                      <h3 className="jd__mtitle" data-j="mt">{m.title}</h3>
                      <p className="jd__mdesc" data-j="mt">{m.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <svg viewBox={`${X0} 0 ${X1 - X0} 30`} preserveAspectRatio="none" className="jd__edge" data-j="edge" aria-hidden="true">
              <path d={TORN_TOP} fill="#fff" />
            </svg>
            <svg viewBox="0 0 120 120" className="jd__curl" data-j="curl" aria-hidden="true">
              <path d="M0 0H120L0 120Z" fill="#2a2623" />
              <path d="M0 0H92C70 30 34 62 0 92Z" fill="#f1e9d8" stroke="#3b342c" strokeWidth=".8" />
              <path d="M92 0C70 30 34 62 0 92" fill="none" stroke="#8d8372" strokeWidth="3" opacity=".25" />
            </svg>
          </div>
        </div>
      </div>

      {/* ============================ MOBILE ============================ */}
      <div className="jm">
        <HangingLetter cls="jm__fold" />
        <div className="jm__paper" data-j="paper">
          <svg viewBox={`${X0} 0 ${X1 - X0} 30`} preserveAspectRatio="none" className="jm__edge" aria-hidden="true">
            <path d={TORN_TOP} fill="#fff" />
          </svg>
          <p className="jm__eyebrow" data-j="eyebrow">{JOURNEY_COPY.eyebrow}</p>
          <h2 className="jm__heading">
            <span className="jd__hline" data-j="hline"><span>{JOURNEY_COPY.headingTop}</span></span>
            <span className="jd__hline" data-j="hline"><span>{JOURNEY_COPY.headingBottom}</span></span>
          </h2>
          <svg viewBox="0 0 300 14" className="jm__underline" aria-hidden="true" preserveAspectRatio="none">
            <path data-j="scribble" d="M4 8C40 2 70 12 110 6S190 2 230 9S280 4 296 7" pathLength={1} fill="none" stroke="#4a4036" strokeWidth="2" strokeLinecap="round" strokeDasharray="1" strokeDashoffset="0" opacity=".7" />
          </svg>
          <p className="jm__intro" data-j="intro">{JOURNEY_COPY.intro}</p>
          <div className="jm__art" data-j="art">
            <Mountains id="m" viewBox="560 190 900 470" cls="jm__layer" par="xMidYMax slice" />
          </div>
        </div>

        <div className="jm__panel">
          <svg viewBox={MR.viewBox} preserveAspectRatio="xMinYMin slice" className="jm__ridge" aria-hidden="true">
            <path d={MR.body} fill="#1d1b19" />
            <path d={MR.shrubs} fill="#1d1b18" />
            <path d={MR.shrubHi} fill="none" stroke="#c9a25b" strokeWidth="1" opacity=".55" strokeLinecap="round" />
            <path d={MR.rockBody} fill="#2b2825" stroke="#0e0d0c" strokeWidth="1" strokeLinejoin="round" />
            <path d={MR.rockFacet} fill="none" stroke="#0e0d0c" strokeWidth=".9" opacity=".7" strokeLinecap="round" />
            <path d={MR.rockHi} fill="none" stroke="#9a8160" strokeWidth="1" opacity=".75" strokeLinecap="round" strokeLinejoin="round" />
            <path d={MR.grassDark} fill="none" stroke="#1b1916" strokeWidth="1.4" strokeLinecap="round" />
            <path d={MR.grassGold} fill="none" stroke="#b8933f" strokeWidth="1.2" strokeLinecap="round" opacity=".85" />
            <path d={MR.gold} fill="none" stroke="#e8b95f" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <Walker cls="jm__girl" style={{ left: MR.feetX - GIRL.ax * (74 / GIRL.w), top: MR.feetY - 22 + 2 - GIRL.ay * (74 / GIRL.w), width: 74 }} />

          <div className="jm__listwrap" data-j="mlist">
            <div className="jm__track" aria-hidden="true">
              <svg viewBox="0 0 88 590">
                <path d={VERTICAL} pathLength={1} fill="none" stroke="#f0c777" strokeWidth="8" opacity=".16" strokeDasharray="1" strokeDashoffset="0" strokeLinecap="round" data-j="mgold" />
                <path d={VERTICAL} pathLength={1} fill="none" stroke="#e8b95f" strokeWidth="2.4" strokeDasharray="1" strokeDashoffset="0" strokeLinecap="round" data-j="mgold" />
              </svg>
            </div>
            <svg className="jm__plane" data-j="mplane" viewBox="-22 -16 44 32" aria-hidden="true"><Plane /></svg>
            <ol className="jm__list">
              {JOURNEY_MILESTONES.map((m, i) => {
                const f = (i * 118 + 18) / (JOURNEY_MILESTONES.length * 118);
                return (
                  <li key={m.id} className="jm__ms" data-j="mli">
                    <span className="jm__pin" data-j="pin" style={{ left: (vx(f) / 40) * 88, top: 18 }}>
                      <PinShape color={m.pin} />
                    </span>
                    <div className="jm__mtext">
                      <span className="jd__year" data-j="mt">{m.period}</span>
                      <h3 className="jd__mtitle" data-j="mt">{m.title}</h3>
                      <p className="jd__mdesc" data-j="mt">{m.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <svg viewBox={TORN_BOTTOM_VIEWBOX} preserveAspectRatio="none" className="jm__torn" aria-hidden="true">
            <path d={PANEL.tornBottom} fill="#f7f3ea" />
          </svg>
        </div>
      </div>
    </section>
  );
}
