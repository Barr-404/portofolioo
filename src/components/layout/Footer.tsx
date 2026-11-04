"use client";

import { ArrowUp } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { useLang } from "@/context/LangContext";
import { profile } from "@/data/profile";

export function Footer({ year }: { year: number }) {
  const { t } = useLang();

  return (
    <footer className="border-t border-border">
      <div className="container-x flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted md:flex-row">
        <p>
          © {year} {profile.name}. {t.footer.rights}
        </p>
        <p className="text-xs">{t.footer.builtWith}</p>
        <div className="flex items-center gap-2">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 transition-colors hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400"
          >
            <SiGithub className="h-4 w-4" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg p-2 transition-colors hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400"
          >
            <FaLinkedin className="h-4 w-4" />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
