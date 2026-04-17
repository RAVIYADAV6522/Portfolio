"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SEGMENT_ROTATIONS = [0, 45, 90, 135, 180, 225, 270, 315] as const;
const NUM_SEGMENTS = SEGMENT_ROTATIONS.length;
const OFFSET = 0.09;
const WAVE_DURATION = NUM_SEGMENTS * OFFSET;

const pathD =
  "M 94 25 C 94 21.686 96.686 19 100 19 L 100 19 C 103.314 19 106 21.686 106 25 L 106 50 C 106 53.314 103.314 56 100 56 L 100 56 C 96.686 56 94 53.314 94 50 Z";

/**
 * Full-screen intro loader on hard refresh / first paint. Hides after window load
 * (and a minimum time) so the segment animation is visible before content appears.
 */
export function PageLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }

    const minVisibleMs = 900;
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
    }, 4500);

    if (document.readyState === "complete") {
      void document.fonts.ready.then(finish).catch(finish);
    } else {
      window.addEventListener(
        "load",
        () => {
          void document.fonts.ready.then(finish).catch(finish);
        },
        { once: true }
      );
    }

    return () => {
      if (failSafeId !== undefined) clearTimeout(failSafeId);
      unlockScroll();
    };
  }, []);

  return (
    <>
      {children}

      <AnimatePresence>
        {!ready && (
          <motion.div
            key="page-loader"
            role="status"
            aria-live="polite"
            aria-label="Loading"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[var(--background)]/92 backdrop-blur-md"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <LoaderSvg />
            <p className="text-sm font-medium text-gray-text">Loading portfolio…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LoaderSvg() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      viewBox="0 0 200 200"
      className="text-[#ff0088]"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <path id="portfolio-loader-path" d={pathD} />
      </defs>
      {SEGMENT_ROTATIONS.map((deg, i) => (
        <motion.g
          key={deg}
          transform={`rotate(${deg} 100 100)`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: WAVE_DURATION,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 1],
            delay: i * OFFSET - WAVE_DURATION,
          }}
        >
          <use href="#portfolio-loader-path" fill="currentColor" />
        </motion.g>
      ))}
    </motion.svg>
  );
}
