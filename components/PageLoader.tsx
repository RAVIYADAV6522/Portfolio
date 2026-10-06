"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PortfolioLoadProvider } from "@/components/PortfolioLoadContext";

/**
 * Full-screen intro loader on hard refresh / first paint. Hides once the web fonts
 * are ready (after a short minimum so it doesn't just flash). It deliberately does
 * not wait for `window.load`: on slow mobile networks that kept the splash up for
 * seconds even though the page was already usable.
 */
export function PageLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }

    const minVisibleMs = 600;
    const started = performance.now();
    let failSafeId: ReturnType<typeof setTimeout> | undefined;

    const unlockScroll = () => {
      document.body.style.overflow = "";
    };

    const finish = () => {
      if (failSafeId !== undefined) {
        clearTimeout(failSafeId);
        failSafeId = undefined;
      }
      const elapsed = performance.now() - started;
      const wait = Math.max(0, minVisibleMs - elapsed);
      window.setTimeout(() => {
        setReady(true);
        unlockScroll();
      }, wait);
    };

    document.body.style.overflow = "hidden";

    failSafeId = setTimeout(() => {
      failSafeId = undefined;
      setReady(true);
      unlockScroll();
    }, 1800);

    void document.fonts.ready.then(finish).catch(finish);

    return () => {
      if (failSafeId !== undefined) clearTimeout(failSafeId);
      unlockScroll();
    };
  }, []);

  return (
    <PortfolioLoadProvider ready={ready}>
      {children}

      <AnimatePresence>
        {!ready && (
          <motion.div
            key="page-loader"
            role="status"
            aria-live="polite"
            aria-label="Loading"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[var(--background)]"
            initial={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0.6, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <LoaderSvg />
            <p className="text-sm font-medium text-gray-text">Loading portfolio…</p>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <motion.div
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-accent-mint via-accent-lavender to-accent-coral"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortfolioLoadProvider>
  );
}

/** "RY" monogram that draws itself, with the brand gradient. */
function LoaderSvg() {
  const strokes = [
    "M14 70 V12 H40 a17 17 0 0 1 0 34 H14", // R bowl
    "M36 46 L56 70", // R leg
    "M66 12 L86 42 L106 12", // Y arms
    "M86 42 V70", // Y stem
  ];
  return (
    <motion.svg
      width={150}
      height={100}
      viewBox="0 0 120 82"
      fill="none"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <defs>
        <linearGradient id="ry-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="55%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#fca5a5" />
        </linearGradient>
      </defs>
      {strokes.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="url(#ry-grad)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0.2, 1, 1] }}
          transition={{
            duration: 1.6,
            times: [0, 0.6, 1],
            delay: i * 0.18,
            repeat: Infinity,
            repeatDelay: 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>
  );
}
