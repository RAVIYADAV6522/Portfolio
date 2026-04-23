"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { HeroContent, SiteConfig } from "@/data/portfolio";
import { springSnappy } from "@/lib/motion";
import { TypewriterText } from "@/components/TypewriterText";

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ctaMotion =
  "inline-flex rounded-full px-6 py-2 text-sm font-bold lowercase text-slate-900 shadow-sm";

type HeroProps = { hero: HeroContent; siteConfig: SiteConfig };

export function Hero({ hero, siteConfig }: HeroProps) {
  const [avatarSrc, setAvatarSrc] = useState(siteConfig.profileImage);

  return (
    <section
      id="hero"
      className="relative flex flex-col px-4 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20 md:flex-row md:items-center md:justify-between md:px-8 md:pb-16 md:pt-20"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-content flex-col gap-8 sm:gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
        <motion.div
          className="min-w-0 max-w-xl md:w-[55%]"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h1
            variants={child}
            transition={{ duration: 0.5 }}
            className="font-heading text-[clamp(1.625rem,5vw+0.5rem,3rem)] font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl"
          >
            <TypewriterText text={hero.greeting} startDelayMs={320} />
          </motion.h1>
          <motion.p
            variants={child}
            transition={{ duration: 0.5 }}
            className="mt-4 text-pretty text-base font-medium leading-relaxed text-slate-700 dark:text-slate-200"
          >
            <TypewriterText text={hero.summaryLine} startDelayMs={980} />
          </motion.p>
          <motion.p
            variants={child}
            transition={{ duration: 0.5 }}
            className="mt-3 text-pretty text-sm leading-relaxed text-gray-text"
          >
            {hero.metaLine}
          </motion.p>
          <motion.div
            variants={child}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start"
          >
            <motion.a
              href={
                siteConfig.resumeCacheKey
                  ? `${siteConfig.resumePath}?v=${siteConfig.resumeCacheKey}`
                  : siteConfig.resumePath
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`${ctaMotion} bg-accent-mint`}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
            >
              resume
            </motion.a>
            <motion.a
              href="#projects"
              className={`${ctaMotion} bg-accent-lavender`}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
            >
              projects
            </motion.a>
            <motion.a
              href="#contact"
              className={`${ctaMotion} bg-accent-coral`}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
            >
              contact
            </motion.a>
            <motion.a
              href="https://build-stack-ai.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-sm font-bold tracking-tight text-white shadow-md shadow-primary/35 ring-2 ring-primary/50 ring-offset-2 ring-offset-[var(--background)] dark:ring-offset-slate-900 bg-gradient-to-r from-primary via-teal-500 to-cyan-400 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-transform before:duration-500 hover:before:translate-x-full"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
            >
              <span className="relative z-10">Visit My Startup</span>
              <svg
                className="relative z-10 h-3.5 w-3.5 shrink-0 opacity-95 transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5a2.25 2.25 0 0 0 2.25-2.25V10.5M10 14 21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex shrink-0 justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.18 }}
        >
          <div className="relative h-32 w-32 sm:h-40 sm:w-40">
            <Image
              src={avatarSrc}
              alt={`${siteConfig.name} portrait`}
              width={160}
              height={160}
              priority
              sizes="(max-width: 768px) 128px, 160px"
              onError={() => setAvatarSrc("/avatar.svg")}
              className="h-32 w-32 rounded-full object-cover ring-4 ring-teal-400 ring-offset-2 ring-offset-[var(--background)] shadow-lg dark:ring-offset-slate-900 sm:h-40 sm:w-40"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
