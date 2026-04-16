"use client";

import { motion } from "framer-motion";
import { SectionMotion } from "@/components/SectionMotion";
import { honorsAwards } from "@/data/portfolio";

export function HonorsAwards() {
  return (
    <SectionMotion
      id="honors"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-content">
        <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Honors &amp; Awards
        </h2>
        <ul className="mt-12 space-y-8">
          {honorsAwards.map((award, i) => (
            <motion.li
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border-b border-slate-200/80 pb-8 last:border-0 dark:border-slate-700"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white">
                  {award.title}
                </h3>
                <span className="shrink-0 text-sm text-gray-text sm:text-right">{award.year}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{award.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {award.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionMotion>
  );
}
