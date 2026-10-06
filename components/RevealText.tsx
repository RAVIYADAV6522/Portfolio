"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easingSmooth } from "@/lib/motion";

const container = (delay: number) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.028, delayChildren: delay } },
});

const char = {
  hidden: { opacity: 0, y: "0.45em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.55, ease: easingSmooth },
  },
};

/**
 * Heading text that rises in letter by letter.
 * Words never break mid-word; screen readers get the plain text.
 */
export function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{text}</>;

  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="inline"
        variants={container(delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {Array.from(word).map((c, ci) => (
              <motion.span key={ci} variants={char} className="inline-block">
                {c}
              </motion.span>
            ))}
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </>
  );
}
