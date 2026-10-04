"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { EVENTS, showToast } from "@/lib/events";

/**
 * Page-wide premium layer:
 * - gradient scroll-progress bar
 * - pointer-following glow (desktop only)
 * - spotlight tracking for every `.spotlight` card (sets --mx / --my)
 */
export function AmbientEffects() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <SpotlightTracker />
      <LiteMode />
      <PartyMode />
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-accent-mint via-accent-lavender to-accent-coral shadow-[0_0_12px_rgba(110,231,183,0.7)]"
    />
  );
}

function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || isLowPower()) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[1] -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.13),rgba(165,180,252,0.08)_40%,transparent_68%)] dark:bg-[radial-gradient(circle,rgba(45,212,191,0.11),rgba(129,140,248,0.07)_40%,transparent_68%)]"
    />
  );
}

/** One delegated listener drives every `.spotlight` element on the page. */
function SpotlightTracker() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover)");
    if (!fine.matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const target = (last.target as Element | null)?.closest?.(
        ".spotlight"
      ) as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${last.clientX - rect.left}px`);
      target.style.setProperty("--my", `${last.clientY - rect.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

/** Rough "this device will struggle" check: few cores, little RAM, or data-saver on. */
export function isLowPower() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  return (
    cores <= 2 ||
    memory <= 2 ||
    (cores <= 4 && memory <= 4) ||
    nav.connection?.saveData === true
  );
}

/** Flags low-power devices so heavy decorative layers (grain, aurora blur, cubes) switch off. */
function LiteMode() {
  useEffect(() => {
    if (isLowPower()) document.documentElement.dataset.lite = "1";
  }, []);
  return null;
}

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];
const CONFETTI_COLORS = ["#6ee7b7", "#a5b4fc", "#fca5a5", "#2dd4bf", "#fbbf24", "#f472b6"];

/**
 * Easter egg: type ↑↑↓↓←→←→ B A (or pick "Make the mascots dance" in ⌘K)
 * → mascots dance and confetti rains for a few seconds.
 */
function PartyMode() {
  useEffect(() => {
    let pos = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const party = () => {
      const root = document.documentElement;
      root.classList.add("party");
      clearTimeout(timer);
      timer = setTimeout(() => root.classList.remove("party"), 6000);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      showToast("Party mode unlocked 🎉");
      const frag = document.createDocumentFragment();
      for (let i = 0; i < 90; i++) {
        const c = document.createElement("span");
        c.className = "confetti";
        c.style.left = `${Math.random() * 100}vw`;
        c.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        c.style.setProperty("--drift", `${(Math.random() - 0.5) * 240}px`);
        c.style.setProperty("--spin", `${(Math.random() - 0.5) * 1440}deg`);
        c.style.setProperty("--dur", `${2.4 + Math.random() * 2}s`);
        c.style.animationDelay = `${Math.random() * 0.8}s`;
        c.addEventListener("animationend", () => c.remove(), { once: true });
        frag.appendChild(c);
      }
      document.body.appendChild(frag);
    };

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        party();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(EVENTS.party, party);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EVENTS.party, party);
      clearTimeout(timer);
    };
  }, []);
  return null;
}
