"use client";

import { motion } from "framer-motion";
import { SectionMotion } from "@/components/SectionMotion";
import { scrollLiftProps } from "@/lib/motion";

export function AchievementsActivities({
  achievementsAndActivities,
}: {
  achievementsAndActivities: string[];
}) {
  return (
    <SectionMotion
      id="achievements"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-content">
        <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Achievements &amp; Activities
        </h2>
        <ul className="mt-10 space-y-6">
          {achievementsAndActivities.map((item, i) => (
            <motion.li
              key={i}
              {...scrollLiftProps(i)}
              className="flex gap-3 rounded-xl border border-slate-200/80 bg-white/50 p-5 text-base leading-relaxed text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionMotion>
  );
}
