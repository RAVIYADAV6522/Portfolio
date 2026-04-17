"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionMotion } from "@/components/SectionMotion";
import { DrummingMonkey } from "@/components/DrummingMonkey";
import { workExperience } from "@/data/portfolio";
import { scrollLiftProps } from "@/lib/motion";

export function WorkExperience() {
  const internshipsHeaderRef = useRef<HTMLDivElement>(null);
  const internshipsInView = useInView(internshipsHeaderRef, {
    amount: 0.55,
    margin: "0px 0px -12% 0px",
    once: false,
  });

  return (
    <SectionMotion
      id="work-experience"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-content">
        <div
          ref={internshipsHeaderRef}
          className="flex flex-col items-start gap-1"
        >
          <DrummingMonkey drumActive={internshipsInView} />
          <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            Internships
          </h2>
        </div>
        <ul className="mt-12 space-y-10">
          {workExperience.map((job, idx) => (
            <motion.li
              key={job.company}
              {...scrollLiftProps(idx)}
              className="rounded-xl border border-slate-200/80 bg-white/50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/40"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary ring-2 ring-primary/30"
                    aria-hidden
                  >
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">
                      {job.company}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">{job.role}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right text-sm text-gray-text">
                  <p>{job.dates}</p>
                  {job.location && (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {job.location}
                    </p>
                  )}
                </div>
              </div>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {job.bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionMotion>
  );
}
