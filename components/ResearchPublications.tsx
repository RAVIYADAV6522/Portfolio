"use client";

import { ExternalLink } from "lucide-react";
import { publications } from "@/data/portfolio";

/**
 * Plain section + list (no opacity-0 + whileInView) so entries stay visible.
 */
export function ResearchPublications() {
  if (publications.length === 0) {
    return null;
  }

  return (
    <section
      id="research"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-24"
      aria-labelledby="research-heading"
    >
      <div className="mx-auto max-w-content">
        <span
          id="research-heading"
          className="inline-block rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white dark:bg-slate-100 dark:text-slate-900"
        >
          Research Publications
        </span>
        <ul className="mt-10 space-y-8">
          {publications.map((pub) => (
            <li
              key={pub.title}
              className="flex flex-col gap-2 border-b border-slate-200/80 pb-8 last:border-0 dark:border-slate-700"
            >
              <a
                href={pub.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 font-heading text-lg font-semibold text-primary hover:underline"
              >
                {pub.title}
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 opacity-60 group-hover:opacity-100" />
              </a>
              <span className="text-sm text-gray-text">{pub.status}</span>
              <a
                href={pub.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 text-sm font-medium text-slate-700 hover:text-primary dark:text-slate-300"
              >
                GitHub repository
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
