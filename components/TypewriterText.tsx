"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolioLoadReady } from "@/components/PortfolioLoadContext";

function delayForChar(char: string, index: number): number {
  let ms = 20 + (index % 7) * 4;
  if (char === " ") ms += 32;
  if (".!,;:?".includes(char)) ms += 75;
  ms += Math.random() * 22;
  return ms;
}

/** Unicode-safe code points (handles emoji e.g. 👋 in greetings). */
function toChars(text: string): string[] {
  return Array.from(text);
}

type TypewriterTextProps = {
  text: string;
  /** Delay before first character (ms). */
  startDelayMs?: number;
};

/**
 * Natural typing: per-character delay varies (spaces/punctuation slower, light jitter).
 * Respects prefers-reduced-motion (shows full text immediately).
 */
export function TypewriterText({ text, startDelayMs = 360 }: TypewriterTextProps) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const cancelledRef = useRef(false);
  const loadReady = usePortfolioLoadReady();

  useEffect(() => {
    if (!loadReady) return;

    cancelledRef.current = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(text);
      setDone(true);
      return;
    }

    setShown("");
    setDone(false);

    const chars = toChars(text);
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      if (cancelledRef.current) return;
      if (i >= chars.length) {
        setDone(true);
        return;
      }
      const char = chars[i];
      i += 1;
      setShown(chars.slice(0, i).join(""));
      timeoutId = setTimeout(tick, delayForChar(char, i - 1));
    };

    const startId = setTimeout(tick, startDelayMs);
    return () => {
      cancelledRef.current = true;
      clearTimeout(startId);
      clearTimeout(timeoutId);
    };
  }, [loadReady, text, startDelayMs]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="relative block">
        <span className="invisible block whitespace-pre-wrap">{text}</span>
        <span className="absolute left-0 top-0 block w-full whitespace-pre-wrap">
          {shown}
          {!done ? (
            <span
              className="ml-0.5 inline-block animate-pulse font-mono text-sky-500 dark:text-sky-400"
              aria-hidden
            >
              |
            </span>
          ) : null}
        </span>
      </span>
    </>
  );
}
