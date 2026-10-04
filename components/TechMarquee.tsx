import type { SkillCategory } from "@/data/portfolio";

/**
 * Two slim, endlessly scrolling rows of your skills (opposite directions).
 * Pure CSS; pauses on hover; edges fade out. Server component.
 */
export function TechMarquee({ skillsByCategory }: { skillsByCategory: SkillCategory[] }) {
  const all = Array.from(
    new Set(
      skillsByCategory
        .filter((g) => !/soft skills|additional courses/i.test(g.category))
        .flatMap((g) => g.items)
    )
  );
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];

  return (
    <div
      className="relative z-10 flex flex-col gap-3 py-6 sm:py-8"
      aria-label="Technologies"
    >
      {rows.map((row, ri) => (
        <div key={ri} className="marquee overflow-hidden">
          <div
            className={`marquee-track ${ri === 1 ? "reverse" : ""}`}
            style={{ "--marquee-dur": `${38 + ri * 8}s` } as React.CSSProperties}
          >
            {/* content twice so translateX(-50%) loops seamlessly */}
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1}>
                {row.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200/80 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:text-teal-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent-mint to-accent-lavender" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
