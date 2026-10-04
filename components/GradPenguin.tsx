"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

const CONFETTI = [
  { dx: -34, dy: -18, c: "#2dd4bf" },
  { dx: -20, dy: -34, c: "#f472b6" },
  { dx: 0, dy: -40, c: "#facc15" },
  { dx: 20, dy: -34, c: "#a5b4fc" },
  { dx: 34, dy: -18, c: "#fb923c" },
  { dx: 0, dy: 10, c: "#34d399" },
];

/**
 * Graduate penguin with diploma. Loop (CSS, see the .pg-* rules in globals.css):
 * crouches, hops and flings its mortarboard skyward (confetti at the top),
 * catches it back on its head and does a happy wiggle. Blinks even while idle.
 */
export function GradPenguin() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { amount: 0.6, once: false });

  return (
    <div ref={ref} className={`select-none ${active ? "is-active" : ""}`} aria-hidden>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mascot-svg pg-svg block h-[5.5rem] w-[5.5rem] overflow-visible sm:h-28 sm:w-28">
        <ellipse cx="100" cy="186" rx="46" ry="7" className="pg-shadow" />
        <g className="pg-hop">
          <g className="pg-body">
            <ellipse cx="88" cy="180" rx="10" ry="5" className="pg-feet" />
            <ellipse cx="112" cy="180" rx="10" ry="5" className="pg-feet" />
            <ellipse cx="100" cy="128" rx="40" ry="52" className="pg-dark" strokeWidth="2" />
            <ellipse cx="100" cy="142" rx="28" ry="36" className="pg-belly" />
            <circle cx="88" cy="100" r="13" className="pg-belly" />
            <circle cx="112" cy="100" r="13" className="pg-belly" />
            <g className="pg-eyes">
              <circle cx="89" cy="100" r="4" className="pg-ink" />
              <circle cx="111" cy="100" r="4" className="pg-ink" />
              <circle cx="90.5" cy="98.5" r="1.4" className="pg-glint" />
              <circle cx="112.5" cy="98.5" r="1.4" className="pg-glint" />
            </g>
            <ellipse cx="80" cy="112" rx="5" ry="3" className="pg-blush" />
            <ellipse cx="120" cy="112" rx="5" ry="3" className="pg-blush" />
            <path d="M93 108 L107 108 L100 118 Z" className="pg-beak" />
            <g className="pg-flip-l">
              <path d="M62 116 Q42 142 54 162 Q66 142 66 122 Z" className="pg-dark" />
            </g>
            <g className="pg-flip-r">
              <path d="M138 116 Q158 142 146 162 Q134 142 134 122 Z" className="pg-dark" />
              <g transform="rotate(-24 152 158)">
                <rect x="140" y="153" width="26" height="10" rx="5" className="pg-scroll" strokeWidth="1.2" />
                <rect x="151" y="152" width="4" height="12" className="pg-ribbon" />
              </g>
            </g>
          </g>
          <g className="pg-cap">
            <path d="M80 78 v8 Q100 94 120 86 v-8 Z" className="pg-cap-dk" />
            <path d="M58 74 L100 60 L142 74 L100 88 Z" className="pg-cap-board" />
            <g className="pg-tassel">
              <path d="M100 74 L134 76 L134 92" className="pg-tassel-cord" strokeWidth="2" strokeLinecap="round" />
              <circle cx="134" cy="94" r="3.5" className="pg-tassel-end" />
            </g>
          </g>
        </g>
        <g transform="translate(100 -20)">
          {CONFETTI.map((p, i) => (
            <rect
              key={i}
              x="-3"
              y="-3"
              width="6"
              height="6"
              rx="1.5"
              fill={p.c}
              className="pg-confetti"
              style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px` } as React.CSSProperties}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
