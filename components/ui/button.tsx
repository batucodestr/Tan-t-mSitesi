import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "dark" | "ghost" | "outline" | "outline-light" | "paper";

const base =
  "group inline-flex min-h-13 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 py-3 text-[0.98rem] font-bold tracking-[-0.01em] transition-all duration-300 ease-soft hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-clay text-white shadow-coral hover:bg-clay-deep hover:shadow-[0_16px_34px_rgb(232_103_79/0.42)]",
  dark: "bg-ink text-white hover:bg-black",
  ghost: "border-[1.5px] border-line-strong bg-card text-ink hover:border-ink",
  outline: "border-[1.5px] border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-light": "border-[1.5px] border-white/60 text-white hover:border-white hover:bg-white hover:text-clay-deep",
  paper: "bg-white text-clay-deep shadow-[0_12px_30px_rgb(0_0_0/0.18)] hover:bg-ink hover:text-white",
};

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      size={18}
      strokeWidth={2}
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
        "group inline-flex items-center gap-2 text-[0.98rem] font-bold text-clay-deep transition-colors duration-300 hover:text-ink",
        className,
      )}
    >
      {children}
      <Arrow />
    </Link>
  );
}
