"use client";

import { motion } from "framer-motion";
import { easingSmooth } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Consistent numbered eyebrow above every section title, e.g. "02 —— EXPERIENCE".
 */
export function SectionLabel({
  index,
  label,
  className,
}: {
  index: number;
  label: string;
  className?: string;
}) {
  return (
    <motion.span
      className={cn(
        "mb-3 inline-flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary dark:text-teal-300",
        className
      )}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: easingSmooth }}
    >
      <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
      <motion.span
        aria-hidden
        className="h-px w-8 origin-left bg-current opacity-60"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easingSmooth, delay: 0.15 }}
      />
      <span>{label}</span>
    </motion.span>
  );
}
