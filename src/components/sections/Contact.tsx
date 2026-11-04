"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Send, XCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { useLang } from "@/context/LangContext";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Status = "idle" | "sending" | "success" | "error" | "mailto";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

export function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const whatsappUrl = profile.phone ? `https://wa.me/${profile.phone.replace(/\D/g, "")}` : null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Tanpa Web3Forms key: buka aplikasi email pengunjung dengan pesan yang sudah terisi
    if (!accessKey) {
      const name = String(data.get("name") ?? "");
      const email = String(data.get("email") ?? "");
      const message = String(data.get("message") ?? "");
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    data.append("access_key", accessKey);
    data.append("subject", `Portfolio contact from ${data.get("name")}`);

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as { success: boolean };
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const socials = [
    { label: "Email", href: `mailto:${profile.email}`, icon: Mail, text: profile.email },
    { label: "GitHub", href: profile.links.github, icon: SiGithub, text: `@${profile.githubUsername}` },
    { label: "LinkedIn", href: profile.links.linkedin, icon: FaLinkedin, text: "LinkedIn" },
    ...(whatsappUrl ? [{ label: "WhatsApp", href: whatsappUrl, icon: SiWhatsapp, text: t.contact.whatsapp }] : []),
  ];

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading label={t.contact.label} title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <Reveal direction="right">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">{t.contact.orReach}</p>
              <ul className="space-y-3">
                {socials.map(({ label, href, icon: Icon, text }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand-500/60 hover:shadow-lg hover:shadow-brand-500/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 transition-transform group-hover:scale-110 dark:text-brand-400">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs text-muted">{label}</span>
                        <span className="block text-sm font-medium">{text}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 text-brand-600 dark:text-brand-400" /> {profile.location}
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6 md:p-8">
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" type="text" required placeholder={t.contact.name} className={inputClass} />
                <input name="email" type="email" required placeholder={t.contact.email} className={inputClass} />
              </div>
              <textarea
                name="message"
                required
                rows={6}
                placeholder={t.contact.message}
                className={`${inputClass} resize-none`}
              />

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-500/30 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {t.contact.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> {t.contact.send}
                  </>
                )}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400"
                  role="status"
                >
                  <CheckCircle2 className="h-4 w-4" /> {t.contact.success}
                </motion.p>
              )}
              {status === "mailto" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-muted"
                  role="status"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>
                    {t.contact.mailto}{" "}
                    <a href={`mailto:${profile.email}`} className="font-medium text-brand-600 hover:underline dark:text-brand-400">
                      {profile.email}
                    </a>
                  </span>
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                  role="alert"
                >
                  <XCircle className="h-4 w-4" /> {t.contact.error}
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
