"use client";

import { motion } from "framer-motion";
import { SectionMotion } from "@/components/SectionMotion";
import type { EducationEntry } from "@/data/portfolio";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Education({ educationEntries }: { educationEntries: EducationEntry[] }) {
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
        <motion.h2
          variants={staggerItem}
          className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
        >
          Education
        </motion.h2>
        <motion.ul
          variants={staggerContainer}
          className="mt-10 list-none space-y-6 p-0"
        >
          {educationEntries.map((entry) => (
            <motion.li
              key={entry.degree}
              variants={staggerItem}
              className="rounded-xl border border-slate-200/80 bg-white/50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/40"
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
                    {entry.grade}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </SectionMotion>
  );
}
