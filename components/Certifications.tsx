"use client";

import { SectionLabel } from "@/components/SectionLabel";

import { RevealText } from "@/components/RevealText";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { HeadingAccent } from "@/components/HeadingAccent";
import { SectionMotion } from "@/components/SectionMotion";
import type { Certification } from "@/data/portfolio";
import { scrollLiftProps } from "@/lib/motion";

export function Certifications({ certifications }: { certifications: Certification[] }) {
  return (
    <SectionMotion
      id="certifications"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-content">
        <SectionLabel index={8} label="Learning" />
        <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          <RevealText text="Certifications" />
        </h2>
        <HeadingAccent />
        <ul className="mt-12 space-y-10">
          {certifications.map((cert, i) => (
            <motion.li
              key={cert.title}
              {...scrollLiftProps(i)}
              className="spotlight rounded-xl border border-slate-200/80 bg-white/60 p-6 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/40"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white">
                    {cert.title}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      {" "}
                      · {cert.provider}
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Link
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </h3>
                </div>
                <p className="shrink-0 text-sm text-gray-text sm:text-right">{cert.date}</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {cert.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionMotion>
  );
}
