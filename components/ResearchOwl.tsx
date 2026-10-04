"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Bespectacled owl reading a paper. Loop (CSS, see the .ow-* rules in globals.css):
 * turns a page, tilts its head at the new page, and a little ⚡ sparks above it.
 * Blinks even while idle.
 */
export function ResearchOwl() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { amount: 0.6, once: false });

  return (
    <div ref={ref} className={`select-none ${active ? "is-active" : ""}`} aria-hidden>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mascot-svg ow-svg block h-[5.5rem] w-[5.5rem] overflow-visible sm:h-28 sm:w-28">
        <ellipse cx="100" cy="184" rx="52" ry="7" className="ow-shadow" />
        <g className="ow-body">
          <path d="M100 58 C142 58 152 100 150 136 C148 168 128 182 100 182 C72 182 52 168 50 136 C48 100 58 58 100 58 Z" className="ow-brown" />
          <ellipse cx="100" cy="142" rx="32" ry="36" className="ow-belly" />
          <path d="M90 122 l4 4 l4 -4 M102 122 l4 4 l4 -4 M84 134 l4 4 l4 -4 M108 134 l4 4 l4 -4 M96 134 l4 4 l4 -4" className="ow-chevron" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="88" cy="182" rx="7" ry="4" className="ow-feet" />
          <ellipse cx="112" cy="182" rx="7" ry="4" className="ow-feet" />
        </g>
        <g className="ow-head">
          <path d="M66 70 L58 38 L84 60 Z" className="ow-brown-dk" />
          <path d="M134 70 L142 38 L116 60 Z" className="ow-brown-dk" />
          <circle cx="80" cy="84" r="22" className="ow-disc" />
          <circle cx="120" cy="84" r="22" className="ow-disc" />
          <g className="ow-eyes">
            <circle cx="80" cy="84" r="9" className="ow-eye" />
            <circle cx="120" cy="84" r="9" className="ow-eye" />
            <circle cx="81" cy="86" r="5.5" className="ow-pupil" />
            <circle cx="121" cy="86" r="5.5" className="ow-pupil" />
            <circle cx="83" cy="84" r="1.8" className="ow-glint" />
            <circle cx="123" cy="84" r="1.8" className="ow-glint" />
          </g>
          <circle cx="80" cy="84" r="16" className="ow-lens" strokeWidth="3" />
          <circle cx="120" cy="84" r="16" className="ow-lens" strokeWidth="3" />
          <path d="M96 82 Q100 78 104 82" className="ow-frame" strokeWidth="3" strokeLinecap="round" />
          <path d="M94 100 L106 100 L100 112 Z" className="ow-beak" />
        </g>
        <g className="ow-book">
          <path d="M100 146 Q78 138 54 144 L54 178 Q78 172 100 180 Z" className="ow-page" strokeWidth="1.5" />
          <path d="M100 146 Q122 138 146 144 L146 178 Q122 172 100 180 Z" className="ow-page" strokeWidth="1.5" />
          <path d="M62 152 h28 M62 159 h24 M62 166 h28 M110 152 h28 M110 159 h20 M110 166 h26" className="ow-text" strokeWidth="2" strokeLinecap="round" />
          <g className="ow-flip">
            <path d="M100 146 Q122 138 146 144 L146 178 Q122 172 100 180 Z" className="ow-page ow-page-turn" strokeWidth="1.5" />
          </g>
          <ellipse cx="54" cy="158" rx="11" ry="16" transform="rotate(16 54 158)" className="ow-brown-dk" />
          <ellipse cx="146" cy="158" rx="11" ry="16" transform="rotate(-16 146 158)" className="ow-brown-dk" />
        </g>
        <g className="ow-spark">
          <path d="M160 26 l-12 20 h10 l-7 16 l18 -22 h-10 l7 -14 z" className="ow-bolt" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
