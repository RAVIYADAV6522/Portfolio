"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { hero, siteConfig } from "@/data/portfolio";
import { springSnappy } from "@/lib/motion";

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ctaMotion =
  "inline-flex rounded-full px-6 py-2 text-sm font-bold lowercase text-slate-900 shadow-sm";

export function Hero() {
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
            {hero.greeting}
          </motion.h1>
          <motion.p
            variants={child}
            transition={{ duration: 0.5 }}
            className="mt-4 text-pretty text-base font-medium leading-relaxed text-slate-700 dark:text-slate-200"
          >
            {hero.summaryLine}
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
