import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}

export function SectionHeading({ eyebrow, title, children, className, tone = "dark" }: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <div className={cn("reveal max-w-3xl", className)}>
      {eyebrow && <p className={cn("eyebrow mb-5", light ? "text-clay-light" : "text-clay")}>{eyebrow}</p>}
      <h2 className="text-display-lg">{title}</h2>
      {children && <div className={cn("mt-6 max-w-2xl text-lg", light ? "text-sand" : "text-ink-soft")}>{children}</div>}
    </div>
  );
}
