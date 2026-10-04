"use client";

import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useId, useMemo, useState, type ReactNode } from "react";
import { HeadingAccent } from "@/components/HeadingAccent";
import { ProjectVisual } from "@/components/ProjectVisual";
import { RevealText } from "@/components/RevealText";
import { SectionLabel } from "@/components/SectionLabel";
import {
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";
import {
  scrollLiftProps,
  springSnappy,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";

/** Featured card + 4 more = two full rows of the bento grid. */
const INITIAL_PROJECT_COUNT = 5;

type Filter = "all" | ProjectCategory;

/** Card that tilts in 3D toward the pointer (mouse only, respects reduced motion). */
function TiltCard({
  index,
  animateIn,
  wide,
  children,
}: {
  index: number;
  /** true after the visitor filters / expands — cards pop in instead of scroll-lifting */
  animateIn: boolean;
  wide: boolean;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const strength = wide ? 4 : 7;
    ry.set(px * strength);
    rx.set(-py * strength);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const enter = animateIn
    ? {
        initial: { opacity: 0, y: 24, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { type: "spring" as const, stiffness: 170, damping: 20, delay: index * 0.05 },
      }
    : scrollLiftProps(index);

  return (
    <motion.div
      layout
      {...enter}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      className={cn(wide && "md:col-span-2")}
    >
      <motion.article
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        whileHover={{ y: -4, transition: springSnappy }}
        className={cn(
          "spotlight group flex h-full flex-col gap-5 rounded-xl border border-slate-200/80 bg-white/60 p-5 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/40 sm:p-6",
          wide && "md:flex-row md:items-stretch md:gap-6"
        )}
      >
        {children}
      </motion.article>
    </motion.div>
  );
}

function linkPill(href: string, label: string) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
    >
      {label}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const moreRegionId = useId();

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: projects.length, ai: 0, fullstack: 0, systems: 0 };
    projects.forEach((p) => p.categories.forEach((cat) => (c[cat] += 1)));
    return c;
  }, [projects]);

  const filtered = useMemo(() => {
    const list =
      filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));
    // featured first when showing everything
    return filter === "all"
      ? [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
      : list;
  }, [filter, projects]);

  const hasMore = filter === "all" && filtered.length > INITIAL_PROJECT_COUNT;
  const visible = hasMore && !showAll ? filtered.slice(0, INITIAL_PROJECT_COUNT) : filtered;

  const featuredOn = filter === "all";
  const restCount = visible.length - (featuredOn && visible[0]?.featured ? 1 : 0);

  const pickFilter = (f: Filter) => {
    setInteracted(true);
    setFilter(f);
  };

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
          className="flex flex-col items-start"
        >
          <SectionLabel index={8} label="Work" />
          <motion.h2
            variants={staggerItem}
            id="projects-heading"
            className="font-heading text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl md:text-4xl"
          >
            <RevealText text="Check out my latest work" />
            <HeadingAccent />
          </motion.h2>
        </motion.div>

        {/* filter chips */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects"
        >
          {projectCategories.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => pickFilter(c.id)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-white dark:text-slate-900"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-slate-900 shadow-[0_8px_24px_-10px_rgba(15,23,42,0.6)] dark:bg-teal-300"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {c.label}
                  <span className="ml-1.5 text-xs opacity-60 tabular-nums">{counts[c.id]}</span>
                </span>
              </button>
            );
          })}
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2"
            id={moreRegionId}
          >
            <AnimatePresence>
              {visible.map((project, i) => {
                const isFeatured = featuredOn && i === 0 && !!project.featured;
                const nonFeaturedIndex = i - (featuredOn && visible[0]?.featured ? 1 : 0);
                const isLastOdd = !isFeatured && restCount % 2 === 1 && nonFeaturedIndex === restCount - 1;
                const wide = isFeatured || isLastOdd;
                return (
                  <TiltCard
                    key={project.title}
                    index={i}
                    wide={wide}
                    animateIn={interacted}
                  >
                    <div className={cn("shrink-0", wide ? "h-44 md:aspect-[2/1] md:h-auto md:w-[46%] md:self-center" : "h-40")}>
                      <div className="h-full [&_.pv-frame]:h-full">
                        <ProjectVisual kind={project.visual} />
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      {isFeatured && (
                        <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/15 to-accent-lavender/25 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary dark:text-teal-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse dark:bg-teal-300" />
                          Featured research
                        </span>
                      )}
                      <h3 className="font-heading text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-teal-300">
                        {project.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.githubUrl && linkPill(project.githubUrl, "GitHub")}
                        {project.demoUrl?.trim() && linkPill(project.demoUrl.trim(), "Demo")}
                        {project.reportUrl && linkPill(project.reportUrl, "Report")}
                      </div>
                      <ul className="mt-4 flex-1 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-slate-400 dark:text-slate-300 dark:marker:text-slate-500">
                        {project.bullets.map((line, bi) => (
                          <li key={bi} className="pl-0.5 text-pretty">
                            {line}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag, ti) => (
                          <span
                            key={`${ti}-${tag}`}
                            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-teal-800 dark:bg-slate-700/80 dark:text-slate-200 dark:group-hover:bg-teal-400/10 dark:group-hover:text-teal-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {hasMore && (
          <motion.div layout className="mt-8 flex justify-center sm:mt-10">
            <motion.button
              type="button"
              onClick={() => {
                setInteracted(true);
                setShowAll((s) => !s);
              }}
              aria-expanded={showAll}
              aria-controls={moreRegionId}
              className="btn-shine inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-primary hover:text-primary dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:text-primary"
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
          </motion.div>
        )}
      </div>
    </section>
  );
}
