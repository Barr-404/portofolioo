"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { profile } from "@/data/profile";
import type { Project } from "@/lib/project";
import { FeaturedProjectCard } from "@/components/ui/FeaturedProjectCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects({ projects }: { projects: Project[] }) {
  const { t } = useLang();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-y relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container-x">
        <SectionHeading label={t.projects.label} title={t.projects.title} subtitle={t.projects.subtitle} />

        {projects.length === 0 && <p className="text-center text-muted">{t.projects.empty}</p>}

        {featured.length > 0 && (
          <div className="mb-14 space-y-8">
            {featured.map((project, i) => (
              <FeaturedProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {others.length > 0 && (
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {others.map((project) => (
              <StaggerItem key={project.id} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <Reveal className="mt-12 text-center" delay={0.1}>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-all hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
          >
            {t.projects.viewAll}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
