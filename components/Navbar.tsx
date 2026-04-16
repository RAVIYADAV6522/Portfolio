"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Home,
  Moon,
  PenLine,
  Sun,
  User,
  type LucideIcon,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";
type IconComp = ComponentType<{ className?: string }>;

type DockItem =
  | { kind: "scroll"; id: string; label: string; Icon: LucideIcon }
  | { kind: "link"; href: string; label: string; Icon: IconComp }
  | { kind: "theme"; label: string };

const items: DockItem[] = [
  { kind: "scroll", id: "hero", label: "Home", Icon: Home },
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
  { kind: "theme", label: "Theme" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <nav
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-1/2 z-50 flex max-w-[min(calc(100vw-0.75rem),100%)] -translate-x-1/2 flex-nowrap items-center justify-start gap-0.5 overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200/80 bg-white/70 px-1.5 py-1.5 shadow-xl backdrop-blur-md [scrollbar-width:none] dark:border-slate-700 dark:bg-slate-900/70 sm:bottom-6 sm:max-w-[calc(100vw-1.5rem)] sm:flex-wrap sm:justify-center sm:gap-1 sm:overflow-visible md:gap-2 md:px-3 [&::-webkit-scrollbar]:hidden"
      aria-label="Primary"
    >
      {items.map((item) => {
        if (item.kind === "theme") {
          return (
            <div key="theme" className="group relative flex flex-col items-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:h-11 sm:w-11",
                  !mounted && "opacity-80"
                )}
                aria-label="Toggle light or dark mode"
              >
                {mounted && resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </motion.button>
              <span className="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                {item.label}
              </span>
            </div>
          );
        }

        const { Icon } = item;

        if (item.kind === "scroll") {
          return (
            <div key={item.id} className="group relative flex flex-col items-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToId(item.id)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:h-11 sm:w-11"
                aria-label={item.label}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
              <span className="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                {item.label}
              </span>
            </div>
          );
        }

        return (
          <div key={item.href} className="group relative flex flex-col items-center">
            <motion.a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:h-11 sm:w-11"
              aria-label={item.label}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.a>
            <span className="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-100 dark:text-slate-900">
              {item.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
