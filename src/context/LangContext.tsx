"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { en, type Dictionary } from "@/dictionaries/en";
import { id } from "@/dictionaries/id";
import type { Lang } from "@/data/profile";

const dictionaries: Record<Lang, Dictionary> = { en, id };
const STORAGE_KEY = "portfolio-lang";
const DEFAULT_LANG: Lang = "en";

// Tiny external store backed by localStorage so hydration stays mismatch-free.
const listeners = new Set<() => void>();

function readLang(): Lang {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "id" ? "id" : DEFAULT_LANG;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function writeLang(next: Lang) {
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((cb) => cb());
}

interface LangContextValue {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => DEFAULT_LANG);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => writeLang(next), []);
  const toggleLang = useCallback(() => writeLang(lang === "en" ? "id" : "en"), [lang]);

  const value = useMemo(
    () => ({ lang, t: dictionaries[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
