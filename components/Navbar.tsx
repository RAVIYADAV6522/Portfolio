"use client";

import type { ComponentType, ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Briefcase,
  Command,
  House,
  Moon,
  PenLine,
  Sun,
  User,
  type LucideIcon,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { SiteConfig } from "@/data/portfolio";
import { EVENTS } from "@/lib/events";
import { cn } from "@/lib/utils";
type IconComp = ComponentType<{ className?: string }>;

type DockItem =
  | { kind: "scroll"; id: string; label: string; Icon: LucideIcon }
  | { kind: "link"; href: string; label: string; Icon: IconComp }
  | { kind: "theme"; label: string }
  | { kind: "palette"; label: string };

function buildDockItems(siteConfig: SiteConfig): DockItem[] {
  return [
    { kind: "scroll", id: "hero", label: "Home", Icon: House },
    { kind: "scroll", id: "work-experience", label: "Work", Icon: Briefcase },
    { kind: "scroll", id: "about", label: "About", Icon: User },
    { kind: "scroll", id: "skills", label: "Skills", Icon: PenLine },
    { kind: "link", href: siteConfig.social.github, label: "GitHub", Icon: FaGithub },
    {
      kind: "link",
      href: siteConfig.social.linkedin,
      label: "LinkedIn",
      Icon: FaLinkedin,
    },
    {
      kind: "link",
      href: siteConfig.social.leetcode,
      label: "LeetCode",
      Icon: SiLeetcode,
    },
    { kind: "palette", label: "Search  ⌘K" },
    { kind: "theme", label: "Theme" },
  ];
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** Which dock section is currently on screen (by DOM order, not dock order). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    let frame = 0;
    const compute = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let best: { id: string; top: number } | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line && (!best || top > best.top)) best = { id, top };
      }
      setActive(best?.id ?? ids[0] ?? "");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

const iconBtn =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:h-11 sm:w-11";

/**
 * macOS-style magnification: icons near the pointer grow and push neighbours apart.
 */
function DockSlot({
  mouseX,
  label,
  active,
  children,
}: {
  mouseX: MotionValue<number>;
  label: string;
  active?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [base, setBase] = useState(44);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const measure = () => setBase(window.innerWidth >= 640 ? 44 : 40);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !Number.isFinite(x)) return Infinity;
    return x - (r.left + r.width / 2);
  });
  const scaleRaw = useTransform(distance, [-140, 0, 140], [1, 1.45, 1], {
    clamp: true,
  });
  const scale = useSpring(scaleRaw, { stiffness: 320, damping: 22, mass: 0.4 });
  const width = useTransform(scale, (s) => base * s);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="group relative flex shrink-0 flex-col items-center justify-end"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div style={{ scale }} className="origin-bottom">
        {children}
      </motion.div>
      {active && (
        <motion.span
          layoutId="dock-active-dot"
          className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_rgba(13,148,136,0.9)] dark:bg-teal-300"
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        />
      )}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="pointer-events-none absolute bottom-full mb-5 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-1 text-xs text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Navbar({ siteConfig }: { siteConfig: SiteConfig }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const items = useMemo(() => buildDockItems(siteConfig), [siteConfig]);
  const sectionIds = useMemo(
    () => ["hero", "about", "work-experience", "skills"],
    []
  );
  const active = useActiveSection(sectionIds);
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Theme switch with a circular "ink" reveal that expands from the button
   * (View Transitions API). Falls back to an instant switch where unsupported.
   */
  const toggleTheme = useCallback(
    (e?: React.MouseEvent) => {
      const next = resolvedTheme === "dark" ? "light" : "dark";
      const root = document.documentElement;
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };

      if (!doc.startViewTransition || reduced) {
        setTheme(next);
        return;
      }

      const x = e?.clientX ?? window.innerWidth / 2;
      const y = e?.clientY ?? window.innerHeight - 40;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        // apply the class synchronously so the snapshot captures the new theme
        root.classList.toggle("dark", next === "dark");
        root.style.colorScheme = next;
        flushSync(() => setTheme(next));
      });

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 700,
              easing: "cubic-bezier(0.76, 0, 0.24, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});
    },
    [resolvedTheme, setTheme, reduced]
  );

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.6 }}
      onMouseMove={(e) => {
        if (!reduced) mouseX.set(e.clientX);
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="dock-bar fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-1/2 z-50 flex max-w-[min(calc(100vw-0.75rem),100%)] flex-nowrap items-end justify-start gap-0.5 overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200/80 bg-white/70 px-1.5 py-1.5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] ring-1 ring-white/60 backdrop-blur-xl backdrop-saturate-150 [scrollbar-width:none] dark:border-slate-700 dark:bg-slate-900/70 dark:ring-white/5 sm:bottom-6 sm:max-w-[calc(100vw-1.5rem)] sm:flex-wrap sm:justify-center sm:gap-1 sm:overflow-visible md:gap-2 md:px-3 [&::-webkit-scrollbar]:hidden"
      aria-label="Primary"
    >
      {items.map((item) => {
        if (item.kind === "palette") {
          return (
            <DockSlot key="palette" mouseX={mouseX} label={item.label}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => window.dispatchEvent(new CustomEvent(EVENTS.palette))}
                className={iconBtn}
                aria-label="Open command menu"
              >
                <Command className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
            </DockSlot>
          );
        }

        if (item.kind === "theme") {
          return (
            <DockSlot key="theme" mouseX={mouseX} label={item.label}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={(e) => toggleTheme(e)}
                className={cn(iconBtn, !mounted && "opacity-80")}
                aria-label="Toggle light or dark mode"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mounted && resolvedTheme === "dark" ? "sun" : "moon"}
                    initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex"
                  >
                    {mounted && resolvedTheme === "dark" ? (
                      <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </DockSlot>
          );
        }

        const { Icon } = item;

        if (item.kind === "scroll") {
          const isActive = active === item.id;
          return (
            <DockSlot
              key={item.id}
              mouseX={mouseX}
              label={item.label}
              active={isActive}
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollToId(item.id)}
                className={cn(iconBtn, isActive && "text-primary dark:text-teal-300")}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
            </DockSlot>
          );
        }

        return (
          <DockSlot key={item.href} mouseX={mouseX} label={item.label}>
            <motion.a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.9 }}
              className={iconBtn}
              aria-label={item.label}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.a>
          </DockSlot>
        );
      })}
    </motion.nav>
  );
}
