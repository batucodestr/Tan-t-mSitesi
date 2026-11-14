import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

/** Placeholder logo: a courtyard arch and the wordmark. Replace with the real brand asset. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label={`${siteConfig.name} ana sayfa`} className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className="flex size-10 items-center justify-center rounded-[13px] bg-clay text-white shadow-coral">
        <svg viewBox="0 0 24 28" className="h-6 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 26V11a8 8 0 0 1 16 0v15" />
          <path d="M8.5 26V12a3.5 3.5 0 0 1 7 0v14" />
        </svg>
      </span>
      <span className="font-display text-[1.7rem] font-semibold leading-none tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}
