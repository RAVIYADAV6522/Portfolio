"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteConfig } from "@/data/portfolio";
import { EVENTS, resumeHref } from "@/lib/events";

/** In-page résumé preview (desktop/tablet). Opened via `openResume()` / the ⌘K menu. */
export function ResumeModal({ siteConfig }: { siteConfig: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const href = resumeHref(siteConfig.resumePath, siteConfig.resumeCacheKey);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(EVENTS.resume, onOpen);
    return () => window.removeEventListener(EVENTS.resume, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence onExitComplete={() => setLoaded(false)}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${siteConfig.name} résumé`}
            initial={{ opacity: 0, y: 40, scale: 0.94, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{ transformPerspective: 1200 }}
            className="relative flex h-[min(88vh,1000px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-3 dark:border-slate-700">
              <p className="font-heading text-base font-semibold text-slate-900 dark:text-white">
                Résumé · {siteConfig.name}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={href}
                  download
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-mint px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-sm transition hover:brightness-95"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> New tab
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close résumé"
                  className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative flex-1 bg-slate-100 dark:bg-slate-800">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[80%] w-[60%] max-w-md animate-pulse rounded-lg bg-white shadow dark:bg-slate-700" />
                </div>
              )}
              <iframe
                src={`${href}#view=FitH&toolbar=0`}
                title={`${siteConfig.name} résumé`}
                onLoad={() => setLoaded(true)}
                className="relative h-full w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
