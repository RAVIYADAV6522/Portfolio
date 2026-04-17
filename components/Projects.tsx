"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import {
  scrollLiftProps,
  springSnappy,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";

/**
 * Header uses stagger; cards use scroll “lift” with opacity 1 so they never stick invisible.
 */
export function Projects() {
  return (
    <section
      id="projects"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-content">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span
            variants={staggerItem}
            className="inline-block rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white dark:bg-slate-100 dark:text-slate-900"
          >
            Projects
          </motion.span>
          <motion.h2
            variants={staggerItem}
            id="projects-heading"
            className="font-heading mt-6 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl md:text-4xl"
          >
            Check out my latest work
          </motion.h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={`${project.title}-${i}`}
              {...scrollLiftProps(i)}
              whileHover={{ y: -4, transition: springSnappy }}
              className="flex flex-col rounded-xl border border-slate-200/80 bg-white/60 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800/40"
            >
              <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white">
                {project.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
                  >
                    GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {project.reportUrl && (
                  <a
                    href={project.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
                  >
                    Report
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag, ti) => (
                  <span
                    key={`${i}-${ti}-${tag}`}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-700/80 dark:text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
