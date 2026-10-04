"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EVENTS } from "@/lib/events";

/** Little pill that pops up above the dock, e.g. "Email copied ✓". */
export function Toaster() {
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onToast = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      setMsg({ id: Date.now(), text });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener(EVENTS.toast, onToast);
    return () => {
      window.removeEventListener(EVENTS.toast, onToast);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] z-[80] flex justify-center sm:bottom-28"
    >
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 16, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-xl dark:bg-white dark:text-slate-900"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-slate-900">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
