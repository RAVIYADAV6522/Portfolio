"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Juggled "skill" balls: brand colour + a tiny glyph. */
const BALLS = [
  { fill: "#3776ab", glyph: "Py" },
  { fill: "#38bdf8", glyph: "⚛" },
  { fill: "#ee4c2c", glyph: "PT", fumble: true },
];
const JUGGLE = "M44 112 C44 -12 156 -12 156 112 C156 134 44 134 44 112 Z";
const DUR = 2.4;
const ARMS = [
  "M72 110 Q48 100 42 114",
  "M80 116 Q66 142 54 150 Q48 156 56 158",
  "M88 118 Q84 146 74 162 Q70 170 78 170",
  "M96 120 Q96 150 90 168 Q88 176 96 174",
  "M104 120 Q104 150 110 168 Q112 176 104 174",
  "M112 118 Q116 146 126 162 Q130 170 122 170",
  "M120 116 Q134 142 146 150 Q152 156 144 158",
  "M128 110 Q152 100 158 114",
];

/**
 * Octopus juggling skill icons. Balls ride an SVG path (SMIL); arms wiggle and every
 * third throw the PyTorch ball slips, gets an "!" and is caught again (CSS, .oc-*).
 */
export function JugglingOctopus() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const active = useInView(ref, { amount: 0.6, once: false });
  const reduced = useReducedMotion();

  // SMIL ignores CSS classes and prefers-reduced-motion, so drive it ourselves.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (active && !reduced) svg.unpauseAnimations?.();
    else svg.pauseAnimations?.();
  }, [active, reduced]);

  return (
    <div ref={ref} className={`select-none ${active ? "is-active" : ""}`} aria-hidden>
      <svg ref={svgRef} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mascot-svg oc-svg block h-[5.5rem] w-[5.5rem] overflow-visible sm:h-28 sm:w-28">
        <ellipse cx="100" cy="184" rx="54" ry="7" className="oc-shadow" />
        {ARMS.map((d, i) => (
          <g key={i} className="oc-arm" style={{ animationDelay: `${-i * 0.22}s`, transformOrigin: `${72 + i * 8}px 114px` }}>
            <path d={d} className="oc-limb" strokeWidth="9" strokeLinecap="round" />
          </g>
        ))}
        <g className="oc-head">
          <ellipse cx="100" cy="82" rx="40" ry="38" className="oc-skin" />
          <ellipse cx="86" cy="58" rx="7" ry="5" className="oc-spot" />
          <ellipse cx="118" cy="52" rx="5" ry="4" className="oc-spot" />
          <ellipse cx="124" cy="68" rx="4" ry="3" className="oc-spot" />
          <g className="oc-eyes">
            <g className="oc-eyes-wide">
              <circle cx="86" cy="88" r="8" className="oc-eye" />
              <circle cx="114" cy="88" r="8" className="oc-eye" />
              <circle cx="87" cy="86" r="4" className="oc-pupil" />
              <circle cx="115" cy="86" r="4" className="oc-pupil" />
            </g>
          </g>
          <ellipse cx="78" cy="102" rx="5" ry="3" className="oc-blush" />
          <ellipse cx="122" cy="102" rx="5" ry="3" className="oc-blush" />
          <path d="M94 104 Q100 110 106 104" className="oc-mouth" strokeWidth="2" strokeLinecap="round" />
        </g>
        {BALLS.map((b, i) => (
          <g key={b.glyph} className={b.fumble ? "oc-fumble" : undefined}>
            <g>
              <circle r="10" fill={b.fill} className="oc-ball" />
              <text y="3.5" textAnchor="middle" className="oc-glyph">{b.glyph}</text>
              <animateMotion dur={`${DUR}s`} begin={`${(-i * DUR) / BALLS.length}s`} repeatCount="indefinite" path={JUGGLE} />
            </g>
          </g>
        ))}
        <g className="oc-oops">
          <text x="150" y="44" textAnchor="middle" className="oc-oops-text">!</text>
        </g>
      </svg>
    </div>
  );
}
