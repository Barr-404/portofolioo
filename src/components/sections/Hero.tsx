"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download, FolderGit2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { useLang } from "@/context/LangContext";
import { profile } from "@/data/profile";
import { TypingText } from "@/components/ui/TypingText";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl dark:bg-brand-500/10" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl dark:bg-violet-500/10" />

      <div className="container-x relative grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          {profile.availableForWork && (
            <motion.span
              {...fadeUp(0)}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t.hero.available}
            </motion.span>
          )}

          <motion.p {...fadeUp(0.1)} className="mb-2 text-lg text-muted">
            {t.hero.greeting}
          </motion.p>
          <motion.h1
            {...fadeUp(0.2)}
            className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>
          <motion.p {...fadeUp(0.3)} className="mb-6 h-9 text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
            <span className="text-muted">{t.hero.iAm} </span>
            <TypingText key={lang} words={profile.roles[lang]} className="text-brand-600 dark:text-brand-400" />
          </motion.p>
          <motion.p {...fadeUp(0.4)} className="mb-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {profile.tagline[lang]}
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-500/30"
            >
              <FolderGit2 className="h-4 w-4" /> {t.hero.viewProjects}
            </a>
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
              >
                <Download className="h-4 w-4" /> {t.hero.downloadCv}
              </a>
            )}
            <div className="ml-1 flex items-center gap-1">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-lg p-2.5 text-muted transition-colors hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400"
              >
                <SiGithub className="h-5 w-5" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg p-2.5 text-muted transition-colors hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative mx-auto hidden w-64 md:block lg:w-80"
        >
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,var(--color-brand-500),#8b5cf6,transparent_60%)] opacity-70 blur-sm" />
          <div className="relative aspect-square animate-float overflow-hidden rounded-full border-4 border-background bg-card shadow-2xl">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="320px"
              preload
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label={t.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted md:flex"
      >
        <span>{t.hero.scroll}</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
