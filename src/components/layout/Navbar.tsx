"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import { profile } from "@/data/profile";
import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = ["home", "about", "skills", "projects", "experience", "contact"] as const;
type SectionId = (typeof sectionIds)[number];

export function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = sectionIds.map((id) => ({ id, label: t.nav[id] }));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between">
          <a href="#home" className="font-mono text-lg font-bold tracking-tight" aria-label={profile.name}>
            <span className="text-brand-600 dark:text-brand-400">&lt;</span>
            {profile.shortName}
            <span className="text-brand-600 dark:text-brand-400"> /&gt;</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                    active === id ? "text-foreground" : "text-muted"
                  }`}
                >
                  {label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand-500 to-violet-500"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              className="flex h-full flex-col items-center justify-center gap-2"
            >
              {links.map(({ id, label }) => (
                <motion.li
                  key={id}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block px-6 py-3 text-2xl font-semibold transition-colors ${
                      active === id ? "text-brand-600 dark:text-brand-400" : "text-foreground"
                    }`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
