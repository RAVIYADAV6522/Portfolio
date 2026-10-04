"use client";

import { CricketFox } from "@/components/CricketFox";
import { SectionLabel } from "@/components/SectionLabel";

import { RevealText } from "@/components/RevealText";
import { motion } from "framer-motion";
import { HeadingAccent } from "@/components/HeadingAccent";
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
        <SectionLabel index={10} label="Beyond code" />
        <CricketFox />
        <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          <RevealText text="Achievements & Activities" />
        </h2>
        <HeadingAccent />
        <ul className="mt-10 space-y-6">
          {achievementsAndActivities.map((item, i) => (
            <motion.li
              key={i}
              {...scrollLiftProps(i)}
              className="spotlight flex gap-3 rounded-xl border border-slate-200/80 bg-white/60 p-5 text-base leading-relaxed text-slate-700 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300"
            >
              <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 [animation-duration:2.2s] motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>
                {(() => {
                  const cut = item.indexOf(": ");
                  if (cut === -1) return item;
                  return (
                    <>
                      <strong className="font-semibold text-slate-900 dark:text-white">
                        {item.slice(0, cut + 1)}
                      </strong>{" "}
                      {item.slice(cut + 2)}
                    </>
                  );
                })()}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionMotion>
  );
}
