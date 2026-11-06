import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

/** Placeholder logo: a courtyard arch and the wordmark. Replace with the real brand asset. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label={`${siteConfig.name} ana sayfa`} className={cn("inline-flex items-center gap-2.5", className)}>
      <svg aria-hidden viewBox="0 0 24 28" className="h-7 w-6" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M4 26V11a8 8 0 0 1 16 0v15" />
        <path d="M8.5 26V12a3.5 3.5 0 0 1 7 0v14" />
        <path d="M1 26.5h22" />
      </svg>
      <span className="font-display text-[1.75rem] font-medium leading-none tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}
