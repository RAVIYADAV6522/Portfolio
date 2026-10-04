"use client";

import { HeadingAccent } from "@/components/HeadingAccent";
import { RevealText } from "@/components/RevealText";
import { SectionLabel } from "@/components/SectionLabel";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig, type Publication } from "@/data/portfolio";
import { scrollLiftProps, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function ResearchPublications({ publications }: { publications: Publication[] }) {
  if (publications.length === 0) {
    return null;
  }

  return (
    <section
      id="research"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24"
      aria-labelledby="research-heading"
    >
      <motion.div
        className="mx-auto max-w-content"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <SectionLabel index={7} label="Research" />
        <motion.h2
          variants={staggerItem}
          id="research-heading"
          className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
        >
          <RevealText text="Research Publications" />
          <HeadingAccent />
        </motion.h2>
        <ul className="mt-10 list-none space-y-8 p-0">
          {publications.map((pub, i) => (
            <motion.li
              key={pub.title}
              {...scrollLiftProps(i)}
              className="group/pub flex flex-col gap-2 border-b border-slate-200/80 pb-8 last:border-0 dark:border-slate-700"
            >
              <a
                href={pub.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 font-heading text-lg font-semibold text-primary hover:underline"
              >
                {pub.title}
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
              {pub.authors && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {pub.authors.map((name, ai) => (
                    <span key={name}>
                      {name === siteConfig.name ? (
                        <strong className="font-semibold text-slate-900 dark:text-white">
                          {name}
                        </strong>
                      ) : (
                        name
                      )}
                      {ai < pub.authors!.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              )}
              <span className="text-sm italic text-gray-text">{pub.status}</span>
              {pub.bullets && (
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {pub.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              <a
                href={pub.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-300"
              >
                {pub.githubLabel ?? "GitHub repository"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
