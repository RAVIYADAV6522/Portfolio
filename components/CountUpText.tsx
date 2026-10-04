"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Renders `text` but counts one of its numbers up from 0 the first time it
 * scrolls into view. e.g. "JEE Advanced '23 — AIR 6522" → counts 6522;
 * "7.13 / 10.0" with match="first" → counts 7.13 and keeps "10.0" fixed.
 */
export function CountUpText({
  text,
  match = "last",
  duration = 1.6,
}: {
  text: string;
  match?: "first" | "last";
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  const matches = Array.from(text.matchAll(/\d+(?:\.\d+)?/g));
  const target = match === "first" ? matches[0] : matches[matches.length - 1];
  const raw = target?.[0];
  const index = target?.index;

  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (!raw || !inView || reduced) return;
    const controls = animate(0, parseFloat(raw), {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduced, raw, duration]);

  if (!raw || index === undefined) return <>{text}</>;

  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const shown = reduced ? raw : (value ?? 0).toFixed(decimals);

  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, index)}
        <span className="tabular-nums">{shown}</span>
        {text.slice(index + raw.length)}
      </span>
    </span>
  );
}
