"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/data/profile";

const options: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "id", label: "ID" },
];

export function LangToggle() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.lang.toggle}
      className="relative flex h-9 items-center rounded-lg border border-border bg-card p-0.5 text-xs font-semibold"
    >
      {options.map((opt) => {
        const active = opt.value === lang;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={active}
            className={`relative z-10 rounded-md px-2.5 py-1.5 transition-colors ${
              active ? "text-white" : "text-muted hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-md bg-brand-600"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
