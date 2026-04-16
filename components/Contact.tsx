"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { contact, siteConfig } from "@/data/portfolio";
import { SectionMotion } from "@/components/SectionMotion";

export function Contact() {
  return (
    <SectionMotion id="contact" className="py-24 px-4 pb-36 text-center md:px-8">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            {contact.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-text">
            {contact.subheading}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-10 inline-flex rounded-full bg-accent-mint px-8 py-3 text-sm font-bold lowercase text-slate-900 shadow-sm transition hover:scale-105"
          >
            {contact.cta}
          </a>
          <div className="mt-10 flex items-center justify-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <FaGithub className="h-5 w-5" />
              GitHub
            </a>
            <span className="text-slate-300 dark:text-slate-600" aria-hidden>
              ·
            </span>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <FaLinkedin className="h-5 w-5" />
              LinkedIn
            </a>
            <span className="text-slate-300 dark:text-slate-600" aria-hidden>
              ·
            </span>
            <a
              href={siteConfig.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <SiLeetcode className="h-5 w-5" />
              LeetCode
            </a>
          </div>
        </motion.div>
      </div>
    </SectionMotion>
  );
}
