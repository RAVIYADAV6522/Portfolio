"use client";

import { motion } from "framer-motion";
import type { AboutContent } from "@/data/portfolio";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function About({ about }: { about: AboutContent }) {
  return (
    <section
      id="about"
      className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:px-8 md:pb-24 md:pt-12 lg:pb-28"
    >
      <motion.div
        className="mx-auto flex max-w-content flex-col gap-6 text-base leading-relaxed text-gray-text"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2
          variants={staggerItem}
          className="font-heading text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl md:text-4xl"
        >
          About
        </motion.h2>
        {about.introParagraphs.map((p, i) => (
          <motion.p key={i} variants={staggerItem}>
            {p}
          </motion.p>
        ))}

        {about.closingParagraphs.map((p, i) => (
          <motion.p key={`close-${i}`} variants={staggerItem}>
            {p}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
}
