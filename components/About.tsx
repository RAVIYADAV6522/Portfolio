import { SectionMotion } from "@/components/SectionMotion";
import { about } from "@/data/portfolio";

export function About() {
  return (
    <SectionMotion
      id="about"
      className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:px-8 md:pb-24 md:pt-12 lg:pb-28"
    >
      <div className="mx-auto max-w-content">
        <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
          About
        </h2>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-text">
          {about.introParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              {about.journeyHeading}
            </p>
            <ul className="mt-4 list-none space-y-3 pl-0">
              {about.journeyItems.map((item) => (
                <li key={item.title} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </strong>
                    {item.description ? (
                      <span className="text-slate-600 dark:text-slate-400">
                        {" "}
                        — {item.description}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {about.closingParagraphs.map((p, i) => (
            <p key={`close-${i}`}>{p}</p>
          ))}
        </div>
      </div>
    </SectionMotion>
  );
}
