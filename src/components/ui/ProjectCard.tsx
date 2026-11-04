"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork, Lock, Star } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLang } from "@/context/LangContext";
import { languageColors, type Project } from "@/lib/project";

export function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLang();
  const description = project.description?.[lang] ?? t.projects.noDescription;
  const langColor = project.language ? languageColors[project.language] ?? "#8b949e" : null;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group card-surface flex h-full flex-col p-6 transition-shadow hover:shadow-xl hover:shadow-brand-500/10 dark:hover:shadow-brand-500/5"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
          <SiGithub className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.projects.live}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.projects.code}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400"
            >
              <SiGithub className="h-4 w-4" />
            </a>
          ) : (
            <span aria-label={t.projects.private} title={t.projects.private} className="rounded-lg p-2 text-muted">
              <Lock className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold leading-snug transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{description}</p>

      {project.tech.length > 0 && (
        <ul className="mb-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center gap-4 text-xs text-muted">
        {project.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: langColor ?? undefined }} />
            {project.language}
          </span>
        )}
        <span className="flex items-center gap-1" title={t.projects.stars}>
          <Star className="h-3.5 w-3.5" /> {project.stars}
        </span>
        <span className="flex items-center gap-1" title={t.projects.forks}>
          <GitFork className="h-3.5 w-3.5" /> {project.forks}
        </span>
      </div>
    </motion.article>
  );
}
