"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { HeadingAccent } from "@/components/HeadingAccent";
import { RevealText } from "@/components/RevealText";
import { SectionLabel } from "@/components/SectionLabel";
import type { SiteConfig } from "@/data/portfolio";
import { scrollLiftProps } from "@/lib/motion";

/** Username = last path segment of a profile URL. */
function handleFrom(url: string) {
  return url.replace(/\/+$/, "").split("/").pop() ?? "";
}

/**
 * Live image card from a free stats service. Shows a shimmer while loading and
 * a tidy link fallback if the service is down, so the section never looks broken.
 */
function LiveImage({
  srcLight,
  srcDark,
  alt,
  fallbackHref,
  fallbackLabel,
  className,
}: {
  srcLight: string;
  srcDark: string;
  alt: string;
  fallbackHref: string;
  fallbackLabel: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <a
        href={fallbackHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-32 items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 text-sm font-medium text-slate-600 hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-300"
      >
        {fallbackLabel}
        <ExternalLink className="h-4 w-4" />
      </a>
    );
  }

  return (
    <div className="relative">
      {loaded < 1 && (
        <div className="absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r from-slate-100 via-slate-200/70 to-slate-100 dark:from-slate-800 dark:via-slate-700/60 dark:to-slate-800" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={srcLight}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded((n) => n + 1)}
        onError={() => setFailed(true)}
        className={`block dark:hidden ${className ?? ""}`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={srcDark}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded((n) => n + 1)}
        onError={() => setFailed(true)}
        className={`hidden dark:block ${className ?? ""}`}
      />
    </div>
  );
}

export function Activity({ siteConfig }: { siteConfig: SiteConfig }) {
  const gh = handleFrom(siteConfig.social.github);
  const lc = handleFrom(siteConfig.social.leetcode);

  return (
    <section id="activity" className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-content">
        <SectionLabel index={9} label="Activity" />
        <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          <RevealText text="Shipping & solving, live" />
        </h2>
        <HeadingAccent />

        <div className="mt-10 grid gap-6">
          <motion.div
            {...scrollLiftProps(0)}
            className="spotlight rounded-xl border border-slate-200/80 bg-white/60 p-5 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/40 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-slate-900 dark:text-white">
                <FaGithub className="h-5 w-5" /> GitHub contributions
              </h3>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline dark:text-teal-300"
              >
                @{gh} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="overflow-x-auto [scrollbar-width:thin]">
              <LiveImage
                srcLight={`https://ghchart.rshah.org/0d9488/${gh}`}
                srcDark={`https://ghchart.rshah.org/0d9488/${gh}`}
                alt={`GitHub contribution chart for ${gh}`}
                fallbackHref={siteConfig.social.github}
                fallbackLabel="See my contributions on GitHub"
                className="min-w-[640px] w-full dark:opacity-90 dark:[filter:invert(0.9)_hue-rotate(180deg)]"
              />
            </div>
          </motion.div>

          <motion.div
            {...scrollLiftProps(1)}
            className="spotlight rounded-xl border border-slate-200/80 bg-white/60 p-5 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/40 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-slate-900 dark:text-white">
                <SiLeetcode className="h-5 w-5 text-amber-500" /> LeetCode
              </h3>
              <a
                href={siteConfig.social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline dark:text-teal-300"
              >
                @{lc} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <LiveImage
              srcLight={`https://leetcard.jacoblin.cool/${lc}?theme=light&font=Inter&ext=heatmap&border=0&radius=12`}
              srcDark={`https://leetcard.jacoblin.cool/${lc}?theme=dark&font=Inter&ext=heatmap&border=0&radius=12`}
              alt={`LeetCode stats for ${lc}`}
              fallbackHref={siteConfig.social.leetcode}
              fallbackLabel="See my LeetCode profile"
              className="mx-auto w-full max-w-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
