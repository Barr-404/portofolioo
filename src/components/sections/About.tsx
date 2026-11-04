"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function About({ projectCount, currentYear }: { projectCount: number; currentYear: number }) {
  const { lang, t } = useLang();
  const techCount = skillCategories.reduce((n, c) => n + c.skills.length, 0);
  const startYear = 2022; // TODO: tahun mulai belajar/berkarier
  const years = Math.max(1, currentYear - startYear);

  const stats = [
    { label: t.about.stats.projects, value: projectCount, suffix: "" },
    { label: t.about.stats.technologies, value: techCount, suffix: "+" },
    { label: t.about.stats.years, value: years, suffix: "+" },
  ];

  return (
    <section id="about" className="section-y">
      <div className="container-x">
        <SectionHeading label={t.about.label} title={t.about.title} />

        <div className="grid items-start gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            {profile.about[lang].map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="flex items-center gap-2 pt-2 text-sm">
                <MapPin className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                {t.about.location} <span className="font-medium text-foreground">{profile.location}</span>
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="card-surface p-5 text-center md:flex md:items-center md:justify-between md:text-left"
              >
                <div className="text-3xl font-extrabold text-gradient md:text-4xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs font-medium text-muted md:mt-0 md:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
