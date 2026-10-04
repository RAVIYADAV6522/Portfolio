"use client";

import { JugglingOctopus } from "@/components/JugglingOctopus";
import { SectionLabel } from "@/components/SectionLabel";
import { SkillIcon } from "@/components/SkillIcon";

import { RevealText } from "@/components/RevealText";
import { motion } from "framer-motion";
import { HeadingAccent } from "@/components/HeadingAccent";
import { SectionMotion } from "@/components/SectionMotion";
import type { SkillCategory } from "@/data/portfolio";
import { springSnappy, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const chipItem = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 420, damping: 22 },
  },
};

export function Skills({ skillsByCategory }: { skillsByCategory: SkillCategory[] }) {
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
        <SectionLabel index={7} label="Toolkit" />
        <JugglingOctopus />
        <motion.h2
          variants={staggerItem}
          className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
        >
          <RevealText text="Skills" />
          <HeadingAccent />
        </motion.h2>
        <div className="mt-10 space-y-10">
          {skillsByCategory.map((group) => (
            <motion.div key={group.category} variants={staggerItem}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-200">
                {group.category}
              </h3>
              <motion.div
                className="mt-3 flex flex-wrap gap-2"
                variants={chipContainer}
              >
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={chipItem}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springSnappy}
                    className="group/chip inline-flex cursor-default items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 ring-1 ring-transparent transition-[background-color,box-shadow,color] duration-300 hover:bg-white hover:text-primary hover:shadow-[0_6px_20px_-6px_rgba(13,148,136,0.45)] hover:ring-primary/40 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-teal-300 dark:hover:ring-teal-400/40"
                  >
                    <SkillIcon
                      name={skill}
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/chip:rotate-[-12deg] group-hover/chip:scale-125"
                    />
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionMotion>
  );
}
