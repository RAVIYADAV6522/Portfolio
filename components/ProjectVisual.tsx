"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ProjectVisualKind } from "@/data/portfolio";

/**
 * Small animated illustration for each project card (SVG + SMIL + CSS — no images).
 * Styles live in globals.css under `.pv-*`.
 */
export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "100px 0px" });

  // SMIL ignores prefers-reduced-motion, so pause it ourselves; also pause
  // while the card is off screen so it doesn't burn frames during scrolling.
  useEffect(() => {
    if (reduced || !inView) ref.current?.pauseAnimations?.();
    else ref.current?.unpauseAnimations?.();
  }, [reduced, inView]);

  return (
    <div className="pv-frame relative overflow-hidden rounded-lg border border-slate-200/70 bg-gradient-to-br from-slate-50 via-white to-teal-50/60 dark:border-slate-700/70 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/40">
      <svg
        ref={ref}
        viewBox="0 0 320 160"
        className={`pv block h-full w-full ${inView ? "" : "pv-paused"}`}
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id={`pv-dots-${kind}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="pv-dot" />
          </pattern>
        </defs>
        <rect width="320" height="160" fill={`url(#pv-dots-${kind})`} />
        {kind === "grid" && <GridScene />}
        {kind === "options" && <OptionsScene />}
        {kind === "files" && <FilesScene />}
        {kind === "snake" && <SnakeScene />}
        {kind === "search" && <SearchScene />}
        {kind === "forest" && <ForestScene />}
      </svg>
    </div>
  );
}

/* ---------- Watt-IF: power grid with flowing current + cascading failure ---------- */
const NODES: [number, number][] = [
  [40, 42], [112, 30], [184, 56], [262, 34], [58, 116], [142, 102], [222, 124], [290, 96],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [2, 6], [3, 7], [4, 5], [5, 6], [6, 7], [3, 6],
];
const FAIL = 5;

function GridScene() {
  return (
    <g>
      {EDGES.map(([a, b], i) => {
        const [x1, y1] = NODES[a];
        const [x2, y2] = NODES[b];
        const touchesFail = a === FAIL || b === FAIL;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="pv-wire" />
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={touchesFail ? "pv-flow pv-cascade" : "pv-flow"}
              style={{ animationDelay: `${-i * 0.37}s` }}
            />
          </g>
        );
      })}
      {NODES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={11} className={i === FAIL ? "pv-halo pv-halo-fail" : "pv-halo"} style={{ animationDelay: `${i * 0.25}s` }} />
          <circle cx={x} cy={y} r={5.5} className={i === FAIL ? "pv-node pv-node-fail" : "pv-node"} />
        </g>
      ))}
      <text x={14} y={150} className="pv-label">max-flow · min-cut</text>
    </g>
  );
}

/* ---------- Optiforge: LSTM vs Black–Scholes with volatility band ---------- */
const LSTM = "M20 122 C60 112 78 72 118 82 S178 42 208 56 S268 32 300 24";
function OptionsScene() {
  return (
    <g>
      <path d="M20 20 V136 H304" className="pv-axis" />
      <path
        d="M20 110 C70 96 120 80 170 60 S260 34 300 26 L300 50 C260 58 210 78 170 86 S70 124 20 128 Z"
        className="pv-band"
      />
      <path d="M20 118 C70 104 120 88 170 72 S260 46 300 38" className="pv-bs" />
      <path d={LSTM} pathLength={1} className="pv-draw" />
      <circle r={5} className="pv-node">
        <animateMotion dur="4s" repeatCount="indefinite" path={LSTM} keyPoints="0;1;1" keyTimes="0;0.75;1" calcMode="linear" />
      </circle>
      <g transform="translate(210 112)">
        <rect width="94" height="34" rx="8" className="pv-card" />
        <line x1="10" y1="12" x2="24" y2="12" className="pv-draw-key" />
        <text x="30" y="15" className="pv-label">LSTM</text>
        <line x1="10" y1="25" x2="24" y2="25" className="pv-bs" />
        <text x="30" y="28" className="pv-label">Black–Scholes</text>
      </g>
    </g>
  );
}

/* ---------- File organizer: scattered files fly into labelled folders ---------- */
const FILES = [
  { x: 40, y: 18, dx: 22, dy: 96, c: "teal" },
  { x: 120, y: 30, dx: 30, dy: 84, c: "lav" },
  { x: 200, y: 14, dx: 50, dy: 100, c: "coral" },
  { x: 260, y: 36, dx: -30, dy: 78, c: "coral" },
  { x: 80, y: 46, dx: -18, dy: 68, c: "teal" },
  { x: 168, y: 52, dx: -8, dy: 62, c: "lav" },
];
function FilesScene() {
  return (
    <g>
      {[
        { x: 40, c: "teal", label: "docs" },
        { x: 130, c: "lav", label: "images" },
        { x: 220, c: "coral", label: "code" },
      ].map((f, i) => (
        <g key={f.label} className="pv-folder" style={{ animationDelay: `${0.9 + i * 0.35}s` }}>
          <path d={`M${f.x} 112 h22 l6 6 h32 v30 h-60 z`} className={`pv-folder-${f.c}`} />
          <text x={f.x + 30} y={142} textAnchor="middle" className="pv-folder-text">{f.label}</text>
        </g>
      ))}
      {FILES.map((f, i) => (
        <g
          key={i}
          className="pv-file"
          style={
            {
              "--dx": `${f.dx}px`,
              "--dy": `${f.dy}px`,
              animationDelay: `${i * 0.3}s`,
            } as React.CSSProperties
          }
        >
          <path d={`M${f.x} ${f.y} h14 l6 6 v20 h-20 z`} className={`pv-doc pv-doc-${f.c}`} />
          <line x1={f.x + 4} y1={f.y + 14} x2={f.x + 16} y2={f.y + 14} className="pv-doc-line" />
          <line x1={f.x + 4} y1={f.y + 19} x2={f.x + 13} y2={f.y + 19} className="pv-doc-line" />
        </g>
      ))}
      <g transform="translate(160 84)" className="pv-ai">
        <path d="M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10Z" />
      </g>
    </g>
  );
}

/* ---------- Snake OS: snake gliding around a terminal grid ---------- */
const SNAKE_PATH = "M30 30 H290 V70 H90 V110 H290 V130 H30 Z";
function SnakeScene() {
  const segments = 7;
  return (
    <g>
      <rect x="14" y="14" width="292" height="132" rx="10" className="pv-term" />
      <circle cx="28" cy="24" r="2.5" className="pv-term-dot" />
      <circle cx="36" cy="24" r="2.5" className="pv-term-dot" />
      <circle cx="44" cy="24" r="2.5" className="pv-term-dot" />
      <rect x="203" y="63" width="14" height="14" rx="3" className="pv-food" />
      {Array.from({ length: segments }).map((_, i) => (
        <rect
          key={i}
          x={-7}
          y={-7}
          width={14}
          height={14}
          rx={3}
          className={i === 0 ? "pv-snake-head" : "pv-snake"}
          opacity={1 - i * 0.09}
        >
          <animateMotion dur="9s" repeatCount="indefinite" path={SNAKE_PATH} begin={`${-i * 0.16}s`} />
        </rect>
      ))}
      <text x={222} y={140} className="pv-mono">64KB heap · ok</text>
    </g>
  );
}

/* ---------- PrepLens: search → interview experiences stream in with upvotes ---------- */
const RESULTS = [
  { y: 52, tag: "Round 2 · DSA", votes: 42, w: 96 },
  { y: 86, tag: "HR · Behavioural", votes: 27, w: 116 },
  { y: 120, tag: "System Design", votes: 18, w: 100 },
];
function SearchScene() {
  return (
    <g>
      <rect x="18" y="12" width="284" height="28" rx="14" className="pv-card" />
      <circle cx="36" cy="25" r="5" className="pv-search-icon" />
      <line x1="40" y1="29" x2="44" y2="33" className="pv-search-icon" />
      <text x="52" y="29" className="pv-label">Google · SDE interview</text>
      <rect x="160" y="19" width="1.5" height="12" className="pv-caret" />
      {RESULTS.map((r, i) => (
        <g key={r.tag} className="pv-seq" style={{ animationDelay: `${0.6 + i * 0.7}s` }}>
          <rect x="18" y={r.y} width="284" height="28" rx="8" className="pv-card" />
          <rect x="28" y={r.y + 8} width={r.w} height="12" rx="6" className="pv-price" />
          <text x="34" y={r.y + 17} className="pv-tag-text">{r.tag}</text>
          <rect x={r.w + 40} y={r.y + 10} width={200 - r.w} height="8" rx="4" className="pv-line pv-line-soft" />
          <path d={`M262 ${r.y + 17} l5 -6 l5 6 z`} className="pv-node" />
          <text x="278" y={r.y + 18} className="pv-label">{r.votes}</text>
        </g>
      ))}
    </g>
  );
}

/* ---------- ForestLens: scan a satellite tile and box each detected crown ---------- */
const CROWNS: [number, number, number][] = [
  [52, 46, 15], [96, 92, 18], [44, 118, 13], [146, 40, 14], [168, 108, 17],
  [214, 62, 16], [262, 98, 13], [282, 44, 12], [126, 126, 10],
];
function ForestScene() {
  return (
    <g>
      <rect x="14" y="14" width="292" height="132" rx="10" className="pv-tile" />
      {CROWNS.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} className="pv-crown" />
          <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.45} className="pv-crown-hi" />
          <rect
            x={x - r - 3}
            y={y - r - 3}
            width={(r + 3) * 2}
            height={(r + 3) * 2}
            rx="3"
            className="pv-bbox"
            style={{ animationDelay: `${(x / 300) * 2.4}s` }}
          />
        </g>
      ))}
      <rect x="14" y="14" width="3" height="132" className="pv-scan" />
      <g transform="translate(206 128)">
        <rect width="94" height="22" rx="11" className="pv-card" />
        <text x="47" y="14.5" textAnchor="middle" className="pv-label">71 trees/ha</text>
      </g>
    </g>
  );
}
