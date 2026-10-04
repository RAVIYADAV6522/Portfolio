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
  /** Substring rendered with the animated brand gradient (e.g. your name). */
  highlight?: string;
  /** Emoji / substring that waves once typing finishes (e.g. "👋"). */
  wave?: string;
};

/** Splits typed text into plain / highlighted / waving runs. */
function renderStyled(
  shownChars: string[],
  fullChars: string[],
  highlight: string | undefined,
  wave: string | undefined,
  done: boolean
) {
  const full = fullChars.join("");
  const ranges: { start: number; end: number; kind: "hl" | "wave" }[] = [];
  const toCpIndex = (strIndex: number) => Array.from(full.slice(0, strIndex)).length;

  if (highlight) {
    const i = full.indexOf(highlight);
    if (i >= 0) {
      const s = toCpIndex(i);
      ranges.push({ start: s, end: s + Array.from(highlight).length, kind: "hl" });
    }
  }
  if (wave) {
    const i = full.indexOf(wave);
    if (i >= 0) {
      const s = toCpIndex(i);
      ranges.push({ start: s, end: s + Array.from(wave).length, kind: "wave" });
    }
  }
  if (ranges.length === 0) return shownChars.join("");

  ranges.sort((a, b) => a.start - b.start);
  const out: React.ReactNode[] = [];
  let cursor = 0;
  const n = shownChars.length;
  ranges.forEach((r, ri) => {
    if (cursor < Math.min(r.start, n)) {
      out.push(shownChars.slice(cursor, Math.min(r.start, n)).join(""));
    }
    const seg = shownChars.slice(r.start, Math.min(r.end, n)).join("");
    if (seg) {
      out.push(
        <span
          key={ri}
          className={
            r.kind === "hl"
              ? "text-gradient-brand"
              : done
                ? "animate-wave"
                : "inline-block"
          }
        >
          {seg}
        </span>
      );
    }
    cursor = Math.max(cursor, r.end);
  });
  if (cursor < n) out.push(shownChars.slice(cursor).join(""));
  return out;
}

/**
 * Natural typing: per-character delay varies (spaces/punctuation slower, light jitter).
 * Respects prefers-reduced-motion (shows full text immediately).
 */
export function TypewriterText({
  text,
  startDelayMs = 360,
  highlight,
  wave,
}: TypewriterTextProps) {
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
          {highlight || wave
            ? renderStyled(toChars(shown), toChars(text), highlight, wave, done)
            : shown}
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
