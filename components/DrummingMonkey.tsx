"use client";

import { motion, useReducedMotion } from "framer-motion";

type DrummingMonkeyProps = {
  /** When true (section in view), plays the drum; otherwise idle pose. */
  drumActive: boolean;
};

const strikeTransition = {
  duration: 0.42,
  repeat: Infinity,
  ease: [0.45, 0, 0.55, 1] as const,
};

/**
 * Monkey with a small drum; alternates left/right “strikes” when `drumActive` is true.
 */
export function DrummingMonkey({ drumActive }: DrummingMonkeyProps) {
  const reduced = useReducedMotion();
  const playing = drumActive && !reduced;

  return (
    <div className="pointer-events-none select-none" aria-hidden>
      <svg
        viewBox="0 0 200 200"
        className="h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tail */}
        <path
          d="M52 138 C28 120 18 95 24 72 C30 52 48 42 58 48"
          className="stroke-amber-800 dark:stroke-amber-400"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Body */}
        <ellipse
          cx={100}
          cy={128}
          rx={48}
          ry={44}
          className="fill-amber-700 dark:fill-amber-500"
        />
        <ellipse
          cx={100}
          cy={132}
          rx={28}
          ry={26}
          className="fill-amber-500/90 dark:fill-amber-400/80"
        />
        {/* Legs */}
        <ellipse
          cx={78}
          cy={168}
          rx={22}
          ry={14}
          className="fill-amber-800 dark:fill-amber-600"
        />
        <ellipse
          cx={122}
          cy={168}
          rx={22}
          ry={14}
          className="fill-amber-800 dark:fill-amber-600"
        />

        {/* Drum (between body and arms in z-order: shell first) */}
        <path
          d="M58 148 L58 162 Q100 178 142 162 L142 148"
          className="fill-amber-900/85 dark:fill-amber-950/80"
        />
        <ellipse
          cx={100}
          cy={148}
          rx={44}
          ry={11}
          className="fill-amber-100 stroke-amber-800/40 dark:fill-amber-200 dark:stroke-amber-200/50"
          strokeWidth={2}
        />
        <ellipse
          cx={100}
          cy={148}
          rx={40}
          ry={7}
          className="fill-amber-200/60 dark:fill-amber-300/40"
        />

        {/* Left arm + stick — shoulder (68, 110) */}
        <g transform="translate(68, 110)">
          <motion.g
            initial={false}
            animate={
              playing
                ? { rotate: [14, -18, 14] }
                : { rotate: 6 }
            }
            transition={
              playing
                ? strikeTransition
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ transformOrigin: "0px 0px" }}
          >
            <path
              d="M0 0 Q14 12 32 28"
              className="stroke-amber-800 dark:stroke-amber-600"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <circle cx={34} cy={30} r={8} className="fill-amber-700 dark:fill-amber-500" />
            {/* stick */}
            <line
              x1={38}
              y1={28}
              x2={52}
              y2={38}
              className="stroke-stone-700 dark:stroke-stone-500"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
        </g>

        {/* Right arm + stick — shoulder (132, 110) */}
        <g transform="translate(132, 110)">
          <motion.g
            initial={false}
            animate={
              playing
                ? { rotate: [-14, 18, -14] }
                : { rotate: -6 }
            }
            transition={
              playing
                ? { ...strikeTransition, delay: 0.21 }
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ transformOrigin: "0px 0px" }}
          >
            <path
              d="M0 0 Q-14 12 -32 28"
              className="stroke-amber-800 dark:stroke-amber-600"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <circle cx={-34} cy={30} r={8} className="fill-amber-700 dark:fill-amber-500" />
            <line
              x1={-38}
              y1={28}
              x2={-52}
              y2={38}
              className="stroke-stone-700 dark:stroke-stone-500"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </motion.g>
        </g>

        {/* Head + face (on top) */}
        <circle cx={100} cy={62} r={36} className="fill-amber-700 dark:fill-amber-500" />
        <circle cx={66} cy={56} r={13} className="fill-amber-800 dark:fill-amber-600" />
        <circle cx={134} cy={56} r={13} className="fill-amber-800 dark:fill-amber-600" />
        <circle cx={66} cy={56} r={6} className="fill-amber-900/40 dark:fill-amber-950/30" />
        <circle cx={134} cy={56} r={6} className="fill-amber-900/40 dark:fill-amber-950/30" />
        <ellipse cx={100} cy={68} rx={26} ry={22} className="fill-amber-200 dark:fill-amber-100" />
        <circle cx={88} cy={64} r={4} className="fill-slate-900 dark:fill-slate-800" />
        <circle cx={112} cy={64} r={4} className="fill-slate-900 dark:fill-slate-800" />
        <path
          d="M88 78 Q100 86 112 78"
          className="stroke-slate-800 dark:stroke-slate-900"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <ellipse cx={82} cy={72} rx={5} ry={3} className="fill-rose-300/70 dark:fill-rose-400/50" />
        <ellipse cx={118} cy={72} rx={5} ry={3} className="fill-rose-300/70 dark:fill-rose-400/50" />
      </svg>
    </div>
  );
}
