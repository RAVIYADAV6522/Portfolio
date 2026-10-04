"use client";

import { SectionLabel } from "@/components/SectionLabel";

import { RevealText } from "@/components/RevealText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CountUpText } from "@/components/CountUpText";
import { EatingPanda } from "@/components/EatingPanda";
import { HeadingAccent } from "@/components/HeadingAccent";
import { SectionMotion } from "@/components/SectionMotion";
import { Sparkles } from "@/components/Sparkles";
import type { Award } from "@/data/portfolio";
import { scrollLiftProps } from "@/lib/motion";

export function HonorsAwards({ honorsAwards }: { honorsAwards: Award[] }) {
  const honorsHeaderRef = useRef<HTMLDivElement>(null);
  const honorsInView = useInView(honorsHeaderRef, {
    amount: 0.55,
    margin: "0px 0px -12% 0px",
    once: false,
  });

  return (
    <SectionMotion
      id="honors"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-content">
        <div
          ref={honorsHeaderRef}
          className={`flex flex-col items-start gap-1 ${honorsInView ? "is-active" : ""}`}
        >
          <SectionLabel index={4} label="Recognition" />
          <EatingPanda eatingActive={honorsInView} />
          <h2 className="relative inline-block font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            <RevealText text="Honors & Awards" />
            <Sparkles />
          </h2>
          <HeadingAccent />
        </div>
        <ul className="mt-12 space-y-8">
          {honorsAwards.map((award, i) => (
            <motion.li
              key={award.title}
              {...scrollLiftProps(i)}
              className="group relative border-b border-slate-200/80 pb-8 pl-5 last:border-0 dark:border-slate-700"
            >
              <span
                aria-hidden
                className="absolute left-0 top-1 h-[calc(100%-2.5rem)] w-[3px] origin-top scale-y-50 rounded-full bg-gradient-to-b from-primary to-accent-lavender opacity-40 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100"
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white">
                  {/AIR \d+/.test(award.title) ? (
                    <CountUpText text={award.title} />
                  ) : (
                    award.title
                  )}
                </h3>
                <span className="shrink-0 text-sm text-gray-text sm:text-right">{award.year}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{award.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {award.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionMotion>
  );
}
