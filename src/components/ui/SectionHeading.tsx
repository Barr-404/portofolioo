import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ label, title, subtitle, align = "center" }: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl mb-12 md:mb-16 ${alignClass}`}>
      <Reveal>
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand-600 dark:text-brand-400 mb-3">
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-muted leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
