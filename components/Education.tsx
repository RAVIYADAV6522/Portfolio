"use client";

import { SectionLabel } from "@/components/SectionLabel";

import { RevealText } from "@/components/RevealText";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { CountUpText } from "@/components/CountUpText";
import { HeadingAccent } from "@/components/HeadingAccent";
import { SectionMotion } from "@/components/SectionMotion";
import type { EducationEntry } from "@/data/portfolio";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Education({ educationEntries }: { educationEntries: EducationEntry[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  // the timeline's coloured line "draws" as you scroll through the list
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <SectionMotion
      id="education"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24"
    >
      <motion.div
        className="mx-auto max-w-content"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <SectionLabel index={3} label="Academics" />
        <motion.h2
          variants={staggerItem}
          className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
        >
          <RevealText text="Education" />
        </motion.h2>
        <HeadingAccent />
        <motion.ul
          ref={listRef}
          variants={staggerContainer}
          className="relative mt-10 list-none space-y-6 py-0 pl-8 pr-0"
        >
          {/* timeline rail + animated progress */}
          <span
            aria-hidden
            className="absolute bottom-3 left-[11px] top-3 w-[2px] rounded-full bg-slate-200 dark:bg-slate-700"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: reduced ? 1 : lineScale }}
            className="absolute bottom-3 left-[11px] top-3 w-[2px] origin-top rounded-full bg-gradient-to-b from-primary via-teal-400 to-accent-lavender shadow-[0_0_10px_rgba(45,212,191,0.6)]"
          />
          {educationEntries.map((entry) => (
            <motion.li
              key={entry.degree}
              variants={staggerItem}
              className="relative"
            >
              <motion.span
                aria-hidden
                className="absolute -left-[27px] top-7 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-primary bg-[var(--background)] dark:border-teal-300"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 1, margin: "0px 0px -35% 0px" }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-teal-300" />
              </motion.span>
              <div className="spotlight rounded-xl border border-slate-200/80 bg-white/60 p-6 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/40"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white md:text-xl">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {entry.institution}
                  </p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-sm text-gray-text">{entry.dates}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <CountUpText text={entry.grade} match="first" />
                  </p>
                </div>
              </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </SectionMotion>
  );
}
