"use client";

import { ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";

/**
 * Uses a plain <section> and static cards (no opacity-0 + whileInView) so project
 * cards are always visible. Nested Framer “in view” animations were leaving cards
 * stuck invisible in some layouts/browsers.
 */
export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-4 md:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-content">
        <span className="inline-block rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white dark:bg-slate-100 dark:text-slate-900">
          Projects
        </span>
        <h2
          id="projects-heading"
          className="font-heading mt-6 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl"
        >
          Check out my latest work
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <article
              key={`${project.title}-${i}`}
              className="flex flex-col rounded-xl border border-slate-200/80 bg-white/60 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/40"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
