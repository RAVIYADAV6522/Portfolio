"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Small brand underline that draws itself in under a section heading.
 */
export function HeadingAccent({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cn(
        "mt-3 block h-[3px] w-16 origin-left rounded-full bg-gradient-to-r from-primary via-accent-mint to-accent-lavender",
        className
      )}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    />
  );
}
