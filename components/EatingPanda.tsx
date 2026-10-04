"use client";

import { useEffect, useRef, useState } from "react";

type EatingPandaProps = {
  /** When true (section in view), the panda tosses gems and munches them. */
  eatingActive: boolean;
};

/**
 * Gem-snacking panda. Loop (CSS, see the .pd-* rules in globals.css): scoops with its
 * paw, flicks a spinning gem high over its head, eyes follow it, catches it in
 * an open mouth, then chews with a happy squish, wiggling ears, blushing cheeks
 * and a little "yum" burst. Blinks even while idle.
 */
export function EatingPanda({ eatingActive }: EatingPandaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hop, setHop] = useState(false);

  // Easter egg: the panda's pupils follow your cursor around the page.
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.28;
      const dx = px - cx;
      const dy = py - cy;
      const len = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, len / 240) * 2.2; // max ~2.2 SVG units
      el.style.setProperty("--gx", `${((dx / len) * k).toFixed(2)}px`);
      el.style.setProperty("--gy", `${((dy / len) * k).toFixed(2)}px`);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`select-none ${eatingActive ? "is-active" : ""} ${hop ? "is-hop" : ""}`}
      aria-hidden
      onClick={() => {
        setHop(false);
        requestAnimationFrame(() => setHop(true));
      }}
      onAnimationEnd={(e) => {
        if (e.animationName === "pd-hop") setHop(false);
      }}
      title="Boop the panda"
      style={{ cursor: "pointer" }}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mascot-svg pd-svg block h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28">
        <ellipse cx="100" cy="178" rx="56" ry="8" className="pd-shadow"/>
        <g className="pd-body">
          <ellipse cx="100" cy="128" rx="46" ry="42" className="pd-white" stroke="#171717" strokeWidth="2.5"/>
          <ellipse cx="72" cy="162" rx="20" ry="12" className="pd-black"/>
          <ellipse cx="128" cy="162" rx="20" ry="12" className="pd-black"/>
          <path d="M52 154 L52 168 Q100 188 148 168 L148 154 Z" className="pd-bowl"/>
          <ellipse cx="100" cy="154" rx="50" ry="12" className="pd-bowl-top" strokeWidth="1.5"/>
          <circle cx="78" cy="150" r="6" className="pd-gem-emerald"/>
          <circle cx="100" cy="152" r="7" className="pd-gem-violet"/>
          <circle cx="122" cy="149" r="5" className="pd-gem-rose"/>
          <circle cx="92" cy="156" r="4" className="pd-gem-amber"/>
          <circle cx="110" cy="154" r="5" className="pd-gem-cyan pd-gem-glow"/>
          <ellipse cx="58" cy="148" rx="12" ry="10" transform="rotate(-18 58 148)" className="pd-black"/>
        </g>
        <g className="pd-head">
          <g className="pd-ear pd-ear-l"><circle cx="66" cy="38" r="14" className="pd-black"/><circle cx="66" cy="38" r="6" className="pd-ear-in"/></g>
          <g className="pd-ear pd-ear-r"><circle cx="134" cy="38" r="14" className="pd-black"/><circle cx="134" cy="38" r="6" className="pd-ear-in"/></g>
          <circle cx="100" cy="58" r="36" className="pd-face" stroke="#171717" strokeWidth="2.5"/>
          <ellipse cx="78" cy="56" rx="11" ry="13" className="pd-black"/>
          <ellipse cx="122" cy="56" rx="11" ry="13" className="pd-black"/>
          <g className="pd-eyes">
            <ellipse cx="78" cy="56" rx="4" ry="5" className="pd-eye-white"/>
            <ellipse cx="122" cy="56" rx="4" ry="5" className="pd-eye-white"/>
            <g className="pd-gaze">
              <circle cx="79" cy="55" r="2.2" className="pd-black pd-pupil"/>
              <circle cx="123" cy="55" r="2.2" className="pd-black pd-pupil"/>
            </g>
          </g>
          <ellipse cx="84" cy="74" rx="5" ry="3" className="pd-blush"/>
          <ellipse cx="116" cy="74" rx="5" ry="3" className="pd-blush"/>
          <ellipse cx="100" cy="72" rx="18" ry="14" className="pd-eye-white" stroke="#171717" strokeWidth="1.5"/>
          <ellipse cx="100" cy="69" rx="8" ry="5.5" className="pd-black"/>
          <path d="M92 78 Q100 84 108 78" className="pd-smile" strokeWidth="1.8" strokeLinecap="round"/>
          <ellipse cx="100" cy="80" rx="5" ry="4" className="pd-mouth-open"/>
        </g>
        <g className="pd-arm">
          <g transform="translate(128 96)">
            <path d="M0 0 Q-6 18 -14 36" className="pd-black-s" strokeWidth="14" strokeLinecap="round"/>
            <ellipse cx="-16" cy="38" rx="11" ry="9" className="pd-black"/>
          </g>
        </g>
        <g className="pd-fly-x"><g className="pd-fly-y">
          <path d="M122 140 l7 8 l-7 8 l-7 -8 z" className="pd-flying-gem"/>
        </g></g>
        <g className="pd-yum">
          <path d="M100 96 v6 M86 92 l-4 4 M114 92 l4 4 M80 84 h-6 M120 84 h6" strokeWidth="2.5" strokeLinecap="round" className="pd-yum-lines"/>
        </g>
      </svg>
    </div>
  );
}
