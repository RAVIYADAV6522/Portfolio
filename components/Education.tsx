import { SectionMotion } from "@/components/SectionMotion";
import { educationEntries } from "@/data/portfolio";

export function Education() {
  return (
    <SectionMotion id="education" className="py-24 px-4 md:px-8">
      <div className="mx-auto max-w-content">
        <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Education
        </h2>
        <ul className="mt-10 space-y-6">
          {educationEntries.map((entry) => (
            <li
              key={entry.degree}
              className="rounded-xl border border-slate-200/80 bg-white/50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/40"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-slate-900 dark:text-white md:text-xl">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {entry.institution}
                  </p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-sm text-gray-text">{entry.dates}</p>
                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {entry.grade}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionMotion>
  );
}
