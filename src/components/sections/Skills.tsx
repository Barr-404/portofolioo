"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { skillCategories } from "@/data/skills";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  const { lang, t } = useLang();

  return (
    <section id="skills" className="section-y relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container-x">
        <SectionHeading label={t.skills.label} title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="space-y-10">
          {skillCategories.map((category, ci) => (
            <div key={category.id}>
              <Reveal delay={ci * 0.05}>
                <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted">
                  <span className="h-px w-6 bg-brand-500" />
                  {category.title[lang]}
                </h3>
              </Reveal>
              <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" stagger={0.05}>
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  const isDarkBrand = skill.color === "#000000" || skill.color === "#181717" || skill.color === "#150458" || skill.color === "#013243";
                  return (
                    <StaggerItem key={skill.name}>
                      <motion.div
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group card-surface flex items-center gap-3 p-3.5 transition-colors hover:border-brand-500/50"
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${skill.color}1a` }}
                        >
                          <Icon
                            className={`h-5 w-5 ${isDarkBrand ? "text-foreground" : ""}`}
                            style={isDarkBrand ? undefined : { color: skill.color }}
                          />
                        </span>
                        <span className="truncate text-sm font-medium">{skill.name}</span>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
