"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { timeline, type TimelineItem } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<TimelineItem["type"], typeof Briefcase> = {
  education: GraduationCap,
  work: Briefcase,
  organization: Users,
};

export function Experience() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="section-y relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container-x">
        <SectionHeading label={t.experience.label} title={t.experience.title} />

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-brand-500 via-border to-transparent md:left-1/2"
          />

          <ol className="space-y-10">
            {timeline.map((item, i) => {
              const Icon = icons[item.type];
              const left = i % 2 === 0;
              return (
                <li key={i} className="relative pl-14 md:pl-0">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-500 bg-background text-brand-600 shadow-md shadow-brand-500/20 dark:text-brand-400 md:left-1/2 md:-translate-x-1/2"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.span>

                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: left ? -32 : 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className={`card-surface p-6 md:w-[calc(50%-2.5rem)] ${left ? "md:mr-auto" : "md:ml-auto"}`}
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                        {t.experience.types[item.type]}
                      </span>
                      <time className="font-mono text-xs text-muted">{item.period[lang]}</time>
                    </div>
                    <h3 className="text-lg font-semibold">{item.title[lang]}</h3>
                    <p className="mb-3 text-sm text-muted">
                      {item.organization}
                      {item.location && <span className="opacity-70"> · {item.location}</span>}
                    </p>
                    <ul className="list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted marker:text-brand-500">
                      {item.description[lang].map((line, j) => (
                        <li key={j}>{line}</li>
                      ))}
                    </ul>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
