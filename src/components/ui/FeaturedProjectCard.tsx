"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useLang } from "@/context/LangContext";
import type { Project } from "@/lib/project";

export function FeaturedProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { lang, t } = useLang();
  const [imgFailed, setImgFailed] = useState(false);
  const description = project.description?.[lang] ?? t.projects.noDescription;
  const reversed = index % 2 === 1;
  const showImage = project.image && !imgFailed;
  const coverHref = project.liveUrl ?? project.url;
  const Cover = coverHref ? "a" : "div";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group card-surface grid overflow-hidden md:grid-cols-2 ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <Cover
        {...(coverHref ? { href: coverHref, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-500 via-indigo-500 to-violet-600 md:aspect-auto md:min-h-[320px]"
      >
        {showImage ? (
          <Image
            src={project.image as string}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-grid">
            <span className="select-none text-6xl font-black tracking-tight text-white/90 drop-shadow-lg md:text-7xl">
              {project.title
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </Cover>

      <div className="flex flex-col p-7 md:p-10">
        <span className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" /> {t.projects.featured}
          </span>
          {!project.url && (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <Lock className="h-3.5 w-3.5" /> {t.projects.private}
            </span>
          )}
        </span>
        <h3 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">{project.title}</h3>
        <p className="mb-6 leading-relaxed text-muted">{description}</p>

        {project.tech.length > 0 && (
          <ul className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/25"
            >
              {t.projects.live} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
            >
              <SiGithub className="h-4 w-4" /> {t.projects.code}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
