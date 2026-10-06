"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import type { HeroContent, SiteConfig } from "@/data/portfolio";
import { openResume } from "@/lib/events";
import { springSnappy } from "@/lib/motion";
import { Magnetic } from "@/components/Magnetic";
import { TypewriterText } from "@/components/TypewriterText";

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ctaMotion =
  "btn-shine inline-flex rounded-full px-6 py-2 text-sm font-bold lowercase text-slate-900 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg";

type HeroProps = { hero: HeroContent; siteConfig: SiteConfig };

export function Hero({ hero, siteConfig }: HeroProps) {
  const [avatarSrc, setAvatarSrc] = useState(siteConfig.profileImage);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Gentle scroll parallax: copy drifts up & fades a touch as you leave the hero.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.9], [1, reduced ? 1 : 0.35]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -110]);

  // 3D tilt on the portrait.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 16 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 16 });
  const onAvatarMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * 22);
    tiltX.set(-py * 22);
  };
  const onAvatarLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col px-4 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20 md:px-8 md:pb-16 md:pt-20"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-content flex-col gap-8 sm:gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
        <motion.div
          className="min-w-0 max-w-xl md:w-[55%]"
          initial="hidden"
          animate="visible"
          style={{ y: copyY, opacity: copyOpacity }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={child} transition={{ duration: 0.5 }} className="mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/60 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md dark:border-teal-400/25 dark:bg-slate-900/50 dark:text-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to opportunities
            </span>
          </motion.div>
          <motion.h1
            variants={child}
            transition={{ duration: 0.5 }}
            className="font-heading text-[clamp(1.625rem,5vw+0.5rem,3rem)] font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl"
          >
            <TypewriterText
              text={hero.greeting}
              startDelayMs={320}
              highlight={siteConfig.name}
              wave="👋"
            />
          </motion.h1>
          {/* Only the greeting types; the summary glides in (much faster to read). */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 },
              },
            }}
            className="mt-4 text-pretty text-base font-medium leading-relaxed text-slate-700 dark:text-slate-200"
          >
            {hero.summaryLine}
          </motion.p>
          <motion.div
            variants={child}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start"
          >
            <Magnetic>
            <motion.a
              href={
                siteConfig.resumeCacheKey
                  ? `${siteConfig.resumePath}?v=${siteConfig.resumeCacheKey}`
                  : siteConfig.resumePath
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openResume(e)}
              className={`${ctaMotion} bg-accent-mint`}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
            >
              resume
            </motion.a>
            </Magnetic>
            <Magnetic>
            <motion.a
              href="#projects"
              className={`${ctaMotion} bg-accent-lavender`}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
            >
              projects
            </motion.a>
            </Magnetic>
            <Magnetic>
            <motion.a
              href="#contact"
              className={`${ctaMotion} bg-accent-coral`}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
            >
              contact
            </motion.a>
            </Magnetic>
            <Magnetic>
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
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex shrink-0 justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.18 }}
          style={{ y: avatarY }}
        >
          <motion.div
            className="relative h-32 w-32 [perspective:800px] sm:h-40 sm:w-40"
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            onPointerMove={onAvatarMove}
            onPointerLeave={onAvatarLeave}
          >
            {/* soft glow halo */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-gradient-to-tr from-teal-400/40 via-accent-mint/30 to-accent-lavender/40 blur-2xl motion-safe:animate-pulse"
            />
            <motion.div
              className="relative h-full w-full rounded-full"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {/* rotating teal ring (keeps the original teal ring look) */}
              <div
                aria-hidden
                className="absolute -inset-[6px] rounded-full bg-[conic-gradient(from_0deg,#2dd4bf,#6ee7b7,#a5b4fc,#2dd4bf)] motion-safe:animate-[spin_6s_linear_infinite]"
              />
              <div
                aria-hidden
                className="absolute -inset-[2px] rounded-full bg-[var(--background)]"
              />
              <Image
                src={avatarSrc}
                alt={`${siteConfig.name} portrait`}
                width={160}
                height={160}
                priority
                sizes="(max-width: 768px) 128px, 160px"
                onError={() => setAvatarSrc("/avatar.svg")}
                className="relative h-32 w-32 rounded-full object-cover shadow-xl sm:h-40 sm:w-40"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
