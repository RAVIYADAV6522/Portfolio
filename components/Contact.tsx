"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { contact, siteConfig } from "@/data/portfolio";
import { SectionMotion } from "@/components/SectionMotion";

export function Contact() {
  return (
    <SectionMotion
      id="contact"
      className="px-4 py-16 text-center sm:px-6 sm:py-20 md:px-8 lg:py-24 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:pb-36"
    >
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
            {contact.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-gray-text">
            {contact.subheading}
          </p>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex rounded-full bg-accent-mint px-8 py-3 text-sm font-bold lowercase text-slate-900 shadow-sm transition hover:scale-105"
          >
            {contact.cta}
          </a>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg px-2 hover:text-primary sm:min-h-0 sm:min-w-0"
            >
              <FaGithub className="h-5 w-5 shrink-0" />
              GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg px-2 hover:text-primary sm:min-h-0 sm:min-w-0"
            >
              <FaLinkedin className="h-5 w-5 shrink-0" />
              LinkedIn
            </a>
            <a
              href={siteConfig.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg px-2 hover:text-primary sm:min-h-0 sm:min-w-0"
            >
              <SiLeetcode className="h-5 w-5 shrink-0" />
              LeetCode
            </a>
          </div>
        </motion.div>
      </div>
    </SectionMotion>
  );
}
