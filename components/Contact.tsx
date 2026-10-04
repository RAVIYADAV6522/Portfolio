"use client";

import { SectionLabel } from "@/components/SectionLabel";

import { RevealText } from "@/components/RevealText";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import type { ContactContent, SiteConfig } from "@/data/portfolio";
import { SectionMotion } from "@/components/SectionMotion";
import { springSnappy } from "@/lib/motion";
import { HeadingAccent } from "@/components/HeadingAccent";
import { Magnetic } from "@/components/Magnetic";
import { ContactBird } from "@/components/ContactBird";
import { copyText } from "@/lib/events";
import { Copy } from "lucide-react";

export function Contact({ contact, siteConfig }: { contact: ContactContent; siteConfig: SiteConfig }) {
  return (
    <SectionMotion
      id="contact"
      className="px-4 py-16 text-center sm:px-6 sm:py-20 md:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel index={11} label="Contact" />
          <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
            <RevealText text={contact.heading} />
          </h2>
          <HeadingAccent className="mx-auto origin-center" />
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-gray-text">
            {contact.subheading}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Magnetic className="border-orbit group relative inline-flex rounded-full">
          <ContactBird />
          <motion.a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex rounded-full bg-accent-mint px-8 py-3 text-sm font-bold lowercase text-slate-900 shadow-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={springSnappy}
          >
            {contact.cta}
          </motion.a>
          </Magnetic>
          <motion.button
            type="button"
            onClick={() => copyText(siteConfig.email, "Email copied")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:border-primary hover:text-primary dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:text-teal-300"
          >
            <Copy className="h-4 w-4 transition-transform group-hover:-rotate-6" />
            <span className="font-mono text-xs sm:text-sm">{siteConfig.email}</span>
          </motion.button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg px-2 transition-all duration-300 hover:-translate-y-0.5 hover:text-primary sm:min-h-0 sm:min-w-0"
            >
              <FaGithub className="h-5 w-5 shrink-0" />
              GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg px-2 transition-all duration-300 hover:-translate-y-0.5 hover:text-primary sm:min-h-0 sm:min-w-0"
            >
              <FaLinkedin className="h-5 w-5 shrink-0" />
              LinkedIn
            </a>
            <a
              href={siteConfig.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg px-2 transition-all duration-300 hover:-translate-y-0.5 hover:text-primary sm:min-h-0 sm:min-w-0"
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
