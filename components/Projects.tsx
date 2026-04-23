"use client";

import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useId, useState } from "react";
import type { Project } from "@/data/portfolio";
import {
  scrollLiftProps,
  springSnappy,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";

const INITIAL_PROJECT_COUNT = 4;

/**
 * Header uses stagger; cards use scroll “lift” with opacity 1 so they never stick invisible.
 */
export function Projects({ projects }: { projects: Project[] }) {
  const [showAll, setShowAll] = useState(false);
  const hasMore = projects.length > INITIAL_PROJECT_COUNT;
  const visibleProjects = hasMore && !showAll
    ? projects.slice(0, INITIAL_PROJECT_COUNT)
    : projects;
  const moreRegionId = useId();

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
        <div
          className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2"
          id={hasMore ? moreRegionId : undefined}
        >
          {visibleProjects.map((project, i) => (
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
                {project.demoUrl?.trim() && (
                  <a
                    href={project.demoUrl.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
                  >
                    Demo
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
              <ul className="mt-4 flex-1 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-slate-400 dark:text-slate-300 dark:marker:text-slate-500">
                {project.bullets.map((line, bi) => (
                  <li key={`${i}-b-${bi}`} className="pl-0.5 text-pretty">
                    {line}
                  </li>
                ))}
              </ul>
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
        {hasMore && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <motion.button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              aria-expanded={showAll}
              aria-controls={moreRegionId}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-primary hover:text-primary dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:text-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
            >
              {showAll ? (
                <>
                  See less
                  <ChevronUp className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                </>
              ) : (
                <>
                  See more
                  <ChevronDown className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
