"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Fox opener in helmet and pads. Loop (CSS, see the .ck-* rules in globals.css):
 * taps the bat while taking guard, back-lifts, drives the incoming ball for a
 * six that sails out of frame, and celebrates. Blinks even while idle.
 */
export function CricketFox() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { amount: 0.6, once: false });

  return (
    <div ref={ref} className={`select-none ${active ? "is-active" : ""}`} aria-hidden>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mascot-svg ck-svg block h-[5.5rem] w-[5.5rem] overflow-visible sm:h-28 sm:w-28">
        <ellipse cx="100" cy="186" rx="60" ry="7" className="ck-shadow" />
        <g className="ck-stumps">
          <rect x="30" y="116" width="5" height="66" rx="2" className="ck-stump" />
          <rect x="39" y="116" width="5" height="66" rx="2" className="ck-stump" />
          <rect x="48" y="116" width="5" height="66" rx="2" className="ck-stump" />
          <rect x="29" y="112" width="13" height="4" rx="2" className="ck-bail" />
          <rect x="41" y="112" width="13" height="4" rx="2" className="ck-bail" />
        </g>
        <g className="ck-fox">
          <path d="M78 156 Q42 162 40 128 Q56 142 78 140 Z" className="ck-orange" />
          <path d="M48 140 Q40 136 40 128 Q44 138 54 142 Z" className="ck-cream" />
          <ellipse cx="100" cy="136" rx="28" ry="32" className="ck-orange" />
          <ellipse cx="100" cy="144" rx="16" ry="22" className="ck-cream" />
          <rect x="83" y="160" width="13" height="22" rx="4" className="ck-pad" strokeWidth="1.5" />
          <rect x="104" y="160" width="13" height="22" rx="4" className="ck-pad" strokeWidth="1.5" />
          <path d="M86 166 h7 M86 172 h7 M107 166 h7 M107 172 h7" className="ck-pad-line" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M112 122 Q128 122 138 132" className="ck-arm" strokeWidth="9" strokeLinecap="round" />
          <g className="ck-head">
            <path d="M76 70 L72 36 L94 58 Z" className="ck-orange" />
            <path d="M124 70 L128 36 L106 58 Z" className="ck-orange" />
            <path d="M78 64 L76 44 L88 58 Z" className="ck-ear-in" />
            <path d="M122 64 L124 44 L112 58 Z" className="ck-ear-in" />
            <circle cx="100" cy="86" r="28" className="ck-orange" />
            <path d="M76 92 Q100 124 124 92 Q100 102 76 92 Z" className="ck-cream" />
            <path d="M70 82 Q70 50 100 50 Q130 50 130 82 Z" className="ck-helmet" />
            <path d="M126 78 Q146 76 152 84 L128 84 Z" className="ck-helmet-dk" />
            <path d="M84 62 Q100 54 116 62" className="ck-helmet-stripe" strokeWidth="3" strokeLinecap="round" />
            <g className="ck-eyes">
              <circle cx="90" cy="90" r="3.6" className="ck-ink" />
              <circle cx="112" cy="90" r="3.6" className="ck-ink" />
            </g>
            <circle cx="100" cy="104" r="4.5" className="ck-ink" />
            <path d="M94 110 Q100 115 106 110" className="ck-mouth" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <g className="ck-bat">
            <rect x="135" y="130" width="6" height="16" rx="2" className="ck-handle" />
            <rect x="131" y="144" width="14" height="40" rx="4" className="ck-blade" strokeWidth="1.5" />
            <circle cx="138" cy="132" r="6.5" className="ck-orange" />
          </g>
        </g>
        <g className="ck-ball">
          <circle cx="148" cy="172" r="5.5" className="ck-ball-red" />
          <path d="M144 169 q4 3 8 0" className="ck-seam" strokeWidth="1" strokeLinecap="round" />
        </g>
        <g className="ck-six">
          <text x="166" y="40" textAnchor="middle" className="ck-six-text">SIX!</text>
        </g>
      </svg>
    </div>
  );
}
