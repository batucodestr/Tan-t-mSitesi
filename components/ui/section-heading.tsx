import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, children, className, tone = "dark", align = "left" }: SectionHeadingProps) {
  const light = tone === "light";
  const center = align === "center";

  return (
    <div className={cn("reveal max-w-3xl", center && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", light ? "text-clay-light" : "text-clay-deep", center && "before:hidden")}>{eyebrow}</p>
      )}
      <h2 className={cn("text-display-lg", light && "text-white")}>{title}</h2>
      {children && (
        <div className={cn("mt-4 max-w-2xl text-lg leading-relaxed", light ? "text-white/70" : "text-ink-soft", center && "mx-auto")}>
          {children}
        </div>
      )}
    </div>
  );
}
