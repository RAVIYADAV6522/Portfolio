"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/**
 * Paragraph whose words "light up" one after another as you scroll through it.
 */
export function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.55"],
  });

  if (reduced) return <span ref={ref}>{text}</span>;

  const words = text.split(" ");
  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => {
          const start = i / words.length;
          const end = Math.min(1, start + 1.5 / words.length);
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {i < words.length - 1 ? `${w} ` : w}
            </Word>
          );
        })}
      </span>
    </span>
  );
}
