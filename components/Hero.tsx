"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { hero, siteConfig } from "@/data/portfolio";

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const [avatarSrc, setAvatarSrc] = useState(siteConfig.profileImage);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen min-h-[100dvh] flex-col justify-center px-4 pb-32 pt-20 sm:px-6 sm:pb-28 sm:pt-24 md:flex-row md:items-center md:px-8 md:py-24"
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
            <Link
              href={siteConfig.resumePath}
              className="inline-flex rounded-full bg-accent-mint px-6 py-2 text-sm font-bold lowercase text-slate-900 shadow-sm transition hover:scale-105"
            >
              resume
            </Link>
            <a
              href="#projects"
              className="inline-flex rounded-full bg-accent-lavender px-6 py-2 text-sm font-bold lowercase text-slate-900 shadow-sm transition hover:scale-105"
            >
              projects
            </a>
            <a
              href="#contact"
              className="inline-flex rounded-full bg-accent-coral px-6 py-2 text-sm font-bold lowercase text-slate-900 shadow-sm transition hover:scale-105"
            >
              contact
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex shrink-0 justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15 }}
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
