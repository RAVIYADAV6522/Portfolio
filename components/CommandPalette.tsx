"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Copy,
  CornerDownLeft,
  ExternalLink,
  FileText,
  Moon,
  Search,
  Sparkles,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import type { SiteConfig } from "@/data/portfolio";
import { EVENTS, copyText, resumeHref } from "@/lib/events";
import { cn } from "@/lib/utils";

type Action = {
  id: string;
  label: string;
  group: "Navigate" | "Actions" | "Links";
  icon: ReactNode;
  keywords?: string;
  run: () => void;
};

const SECTIONS: [string, string][] = [
  ["hero", "Home"],
  ["about", "About"],
  ["work-experience", "Experience"],
  ["education", "Education"],
  ["honors", "Honors & Awards"],
  ["skills", "Skills"],
  ["certifications", "Certifications"],
  ["research", "Research"],
  ["projects", "Projects"],
  ["activity", "Coding activity"],
  ["achievements", "Achievements"],
  ["contact", "Contact"],
];

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * ⌘K / Ctrl+K (or "/") command menu: jump to sections, copy email, open résumé,
 * toggle theme, open profiles. Fully keyboard-driven.
 */
export function CommandPalette({ siteConfig }: { siteConfig: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const actions = useMemo<Action[]>(() => {
    const ext = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      ...SECTIONS.map(([id, label]) => ({
        id: `go-${id}`,
        label,
        group: "Navigate" as const,
        icon: <ArrowUp className="h-4 w-4 rotate-45" />,
        run: () => go(id),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        keywords: "mail contact",
        icon: <Copy className="h-4 w-4" />,
        run: () => copyText(siteConfig.email, "Email copied"),
      },
      {
        id: "resume",
        label: "View résumé",
        group: "Actions",
        keywords: "cv resume pdf",
        icon: <FileText className="h-4 w-4" />,
        run: () => {
          if (window.innerWidth >= 640) window.dispatchEvent(new CustomEvent(EVENTS.resume));
          else ext(resumeHref(siteConfig.resumePath, siteConfig.resumeCacheKey))();
        },
      },
      {
        id: "theme",
        label: "Toggle dark / light mode",
        group: "Actions",
        keywords: "theme dark light",
        icon: <Moon className="h-4 w-4" />,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "party",
        label: "Make the mascots dance",
        group: "Actions",
        keywords: "fun easter egg party",
        icon: <Sparkles className="h-4 w-4" />,
        run: () => window.dispatchEvent(new CustomEvent(EVENTS.party)),
      },
      {
        id: "github",
        label: "GitHub",
        group: "Links",
        icon: <FaGithub className="h-4 w-4" />,
        run: ext(siteConfig.social.github),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        group: "Links",
        icon: <FaLinkedin className="h-4 w-4" />,
        run: ext(siteConfig.social.linkedin),
      },
      {
        id: "leetcode",
        label: "LeetCode",
        group: "Links",
        icon: <SiLeetcode className="h-4 w-4" />,
        run: ext(siteConfig.social.leetcode),
      },
      {
        id: "startup",
        label: "Visit my startup",
        group: "Links",
        keywords: "build stack ai",
        icon: <ExternalLink className="h-4 w-4" />,
        run: ext("https://build-stack-ai.vercel.app/"),
      },
    ];
  }, [siteConfig, resolvedTheme, setTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.keywords ?? ""} ${a.group}`.toLowerCase().includes(q));
  }, [actions, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const runAt = useCallback(
    (i: number) => {
      const a = results[i];
      if (!a) return;
      close();
      // let the modal start closing before scrolling / opening
      setTimeout(a.run, 60);
    },
    [results, close]
  );

  // global shortcuts + event from the dock button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, [contenteditable='true']");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(EVENTS.palette, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EVENTS.palette, onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(active);
    } else if (e.key === "Escape") {
      close();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={close} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -12, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 px-4 dark:border-slate-700">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search sections, links, actions…"
                className="h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                aria-label="Search commands"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
              />
              <kbd className="hidden rounded-md border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-700 sm:block">
                ESC
              </kbd>
            </div>
            <ul role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-slate-500">No results for “{query}”</li>
              )}
              {results.map((a, i) => {
                const header = a.group !== lastGroup ? a.group : null;
                lastGroup = a.group;
                return (
                  <li key={a.id}>
                    {header && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        {header}
                      </p>
                    )}
                    <button
                      id={`cmd-${a.id}`}
                      role="option"
                      aria-selected={i === active}
                      type="button"
                      onMouseMove={() => setActive(i)}
                      onClick={() => runAt(i)}
                      className={cn(
                        "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200",
                        i === active && "text-slate-900 dark:text-white"
                      )}
                    >
                      {i === active && (
                        <motion.span
                          layoutId="cmd-active"
                          className="absolute inset-0 rounded-lg bg-primary/10 dark:bg-teal-300/10"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span className="relative text-primary dark:text-teal-300">{a.icon}</span>
                      <span className="relative flex-1">{a.label}</span>
                      {i === active && <CornerDownLeft className="relative h-3.5 w-3.5 text-slate-400" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-slate-200/80 px-4 py-2 font-mono text-[10px] text-slate-400 dark:border-slate-700">
              <span>↑↓ to move · ↵ to select</span>
              <span>⌘K / Ctrl K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
