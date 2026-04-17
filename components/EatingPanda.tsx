"use client";

import { motion, useReducedMotion } from "framer-motion";

type EatingPandaProps = {
  /** When true (section in view), panda eats from the bowl. */
  eatingActive: boolean;
};

const chewTransition = {
  duration: 0.55,
  repeat: Infinity,
  ease: [0.45, 0, 0.55, 1] as const,
};

/**
 * Sitting panda with a gem bowl; paw moves toward the muzzle + head bob when `eatingActive`.
 */
export function EatingPanda({ eatingActive }: EatingPandaProps) {
  const prefersReduced = useReducedMotion();
  const eating = eatingActive && !prefersReduced;

  return (
    <div className="pointer-events-none select-none" aria-hidden>
      <svg
        viewBox="0 0 200 200"
        className="h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx={100}
          cy={178}
          rx={56}
          ry={8}
          className="fill-slate-900/10 dark:fill-white/10"
        />

        {/* Torso + feet first */}
        <ellipse
          cx={100}
          cy={128}
          rx={46}
          ry={42}
          className="fill-zinc-100"
          stroke="#171717"
          strokeWidth="2.5"
        />
        <ellipse cx={72} cy={162} rx={20} ry={12} className="fill-neutral-900" />
        <ellipse cx={128} cy={162} rx={20} ry={12} className="fill-neutral-900" />

        {/* Bowl on lap (in front of belly) */}
        <path
          d="M52 154 L52 168 Q100 188 148 168 L148 154 Z"
          className="fill-slate-300/90 dark:fill-slate-600/90"
        />
        <ellipse
          cx={100}
          cy={154}
          rx={50}
          ry={12}
          className="fill-slate-200 stroke-slate-400/50 dark:fill-slate-500 dark:stroke-slate-400/40"
          strokeWidth={1.5}
        />

        {/* Gems */}
        <circle cx={78} cy={150} r={6} className="fill-emerald-400" />
        <circle cx={100} cy={152} r={7} className="fill-violet-500" />
        <circle cx={122} cy={149} r={5} className="fill-rose-400" />
        <circle cx={92} cy={156} r={4} className="fill-amber-400" />
        <motion.circle
          cx={108}
          cy={154}
          r={5}
          className="fill-cyan-400"
          animate={
            eating
              ? { opacity: [0.55, 1, 0.55], scale: [0.92, 1.06, 0.92] }
              : { opacity: 0.85, scale: 1 }
          }
          transition={
            eating
              ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.25 }
          }
        />

        {/* Left paw on rim */}
        <ellipse
          cx={58}
          cy={148}
          rx={12}
          ry={10}
          transform="rotate(-18 58 148)"
          className="fill-neutral-900"
        />

        {/* Head + face (subtle chew bob while eating) */}
        <motion.g
          animate={eating ? { y: [0, -2.2, 0, -1.4, 0] } : { y: 0 }}
          transition={
            eating
              ? { duration: 1.05, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.25 }
          }
        >
          <circle cx={66} cy={38} r={14} className="fill-neutral-900" />
          <circle cx={134} cy={38} r={14} className="fill-neutral-900" />
          <circle cx={66} cy={38} r={6} className="fill-rose-300/50" />
          <circle cx={134} cy={38} r={6} className="fill-rose-300/50" />
          <circle cx={100} cy={58} r={36} className="fill-zinc-50" stroke="#171717" strokeWidth="2.5" />
          <ellipse cx={78} cy={56} rx={11} ry={13} className="fill-neutral-900" />
          <ellipse cx={122} cy={56} rx={11} ry={13} className="fill-neutral-900" />
          <ellipse cx={78} cy={56} rx={4} ry={5} className="fill-white" />
          <ellipse cx={122} cy={56} rx={4} ry={5} className="fill-white" />
          <circle cx={79} cy={56} r={2.2} className="fill-neutral-900" />
          <circle cx={123} cy={56} r={2.2} className="fill-neutral-900" />
          <ellipse cx={100} cy={72} rx={18} ry={14} className="fill-white" stroke="#171717" strokeWidth="1.5" />
          <ellipse cx={100} cy={70} rx={8} ry={6} className="fill-neutral-900" />
          <path
            d="M92 78 Q100 84 108 78"
            className="stroke-neutral-900"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Right arm — brings gem toward mouth */}
        <g transform="translate(128, 96)">
          <motion.g
            initial={false}
            animate={eating ? { rotate: [28, -32, 28] } : { rotate: 18 }}
            transition={eating ? chewTransition : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <path
              d="M0 0 Q-6 18 -14 36"
              className="stroke-neutral-900"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx={-16} cy={38} rx={11} ry={9} className="fill-neutral-900" />
            <circle cx={-14} cy={34} r={4} className="fill-fuchsia-400" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
