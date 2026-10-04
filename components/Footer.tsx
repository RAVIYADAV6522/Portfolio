"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import type { SiteConfig } from "@/data/portfolio";
import { springSnappy } from "@/lib/motion";

export function Footer({ siteConfig }: { siteConfig: SiteConfig }) {
  const year = new Date().getFullYear();
  const socials = [
    { href: siteConfig.social.github, label: "GitHub", Icon: FaGithub },
    { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { href: siteConfig.social.leetcode, label: "LeetCode", Icon: SiLeetcode },
  ];

  return (
    <footer className="relative z-10 overflow-hidden px-4 pb-2 pt-6 sm:px-6 md:px-8">
      <div className="mx-auto max-w-content">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />

        <div className="mt-8 flex flex-col items-center justify-between gap-5 text-sm text-gray-text sm:flex-row">
          <p className="text-center sm:text-left">
            © {year} {siteConfig.name} · Built with Next.js, Tailwind &amp; Framer Motion
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                transition={springSnappy}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-slate-600 backdrop-blur-sm hover:text-primary dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:text-teal-300"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={springSnappy}
              className="group ml-2 flex h-9 items-center gap-1.5 rounded-full bg-slate-900 px-3.5 text-xs font-semibold text-white shadow-md dark:bg-teal-300 dark:text-slate-900"
            >
              Top
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* oversized faded signature */}
      <motion.p
        aria-hidden
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none mt-8 select-none whitespace-nowrap text-center font-heading text-[17vw] font-bold leading-[0.85] tracking-tighter text-transparent sm:text-[8.5rem]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(13,148,136,0.22), rgba(165,180,252,0.12) 55%, transparent 90%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {siteConfig.name}
      </motion.p>
    </footer>
  );
}
