/** Shared Framer Motion presets for consistent portfolio motion. */

export const easingSmooth = [0.22, 1, 0.36, 1] as const;

export const viewportOnce = {
  once: true as const,
  margin: "-10% 0px -5% 0px",
  amount: 0.12 as const,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 420,
  damping: 24,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 120,
  damping: 22,
};

/** Whole-section reveal (used by SectionMotion). */
export const sectionReveal = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
};

/** Parent: only orchestrates stagger; no own motion. */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

/** Child of staggerContainer — fade + rise. */
export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easingSmooth },
  },
};

/** Scroll-in list rows / cards without opacity 0 (avoids “stuck invisible” bugs). */
export function scrollLiftProps(index: number) {
  return {
    initial: { y: 22, opacity: 1 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-60px 0px", amount: 0.08 as const },
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 20,
      delay: index * 0.06,
    },
  };
}
