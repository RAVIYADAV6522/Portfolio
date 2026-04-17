"use client";

import { motion } from "framer-motion";
import { SectionMotion } from "@/components/SectionMotion";
import { skillsByCategory } from "@/data/portfolio";
import { springSnappy, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function Skills() {
  return (
    <SectionMotion
      id="skills"
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
          Skills
        </motion.h2>
        <div className="mt-10 space-y-10">
          {skillsByCategory.map((group) => (
            <motion.div key={group.category} variants={staggerItem}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-200">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springSnappy}
                    className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionMotion>
  );
}
