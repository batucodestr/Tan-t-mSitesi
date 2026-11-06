import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "outline" | "outline-light" | "paper";

const base =
  "group inline-flex min-h-13 items-center justify-center gap-3 px-7 py-3 text-[0.9375rem] font-medium tracking-wide transition-colors duration-300 ease-soft disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-clay text-paper hover:bg-clay-deep",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/50 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  paper: "bg-paper text-ink hover:bg-paper-deep",
};

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      size={17}
      strokeWidth={1.5}
      className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
    />
  );
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
}

export function ButtonLink({ href, children, variant = "primary", className, arrow = true, onClick }: ButtonLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={cn(base, variants[variant], className)}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

/** Quiet inline link with an underline, for secondary actions. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 border-b border-current pb-1 text-[0.9375rem] font-medium transition-colors duration-300 hover:text-clay",
        className,
      )}
    >
      {children}
      <Arrow />
    </Link>
  );
}
