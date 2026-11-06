"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

import { siteConfig } from "@/lib/site-config";

export function FormSuccess({ title, children }: { title: string; children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);

  // The panel is much shorter than the form it replaces, so it can land above the
  // viewport. Bring it into view and move focus to it for screen readers.
  useEffect(() => {
    panelRef.current?.focus({ preventScroll: true });
    panelRef.current?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div ref={panelRef} role="status" tabIndex={-1} className="border border-line bg-paper p-8 outline-none md:p-12">
      <CheckCircle2 aria-hidden size={36} strokeWidth={1.25} className="text-olive" />
      <h2 className="mt-6 text-display-md">{title}</h2>
      <div className="mt-4 text-lg text-ink-soft">{children}</div>
    </div>
  );
}

/** Shown when a valid submission could not be delivered. */
export function FormDeliveryError() {
  const { email, phoneDisplay, phoneHref, whatsappHref } = siteConfig.contact;

  return (
    <div role="alert" className="flex gap-3 border border-danger/40 bg-danger/5 p-5 text-[0.9375rem]">
      <AlertCircle aria-hidden size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-danger" />
      <div>
        <p className="font-medium">Mesajınızı şu anda iletemedik.</p>
        <p className="mt-1 text-ink-soft">
          Lütfen birazdan yeniden deneyin. Bilgileriniz formda duruyor. Dilerseniz bize{" "}
          <a href={`mailto:${email}`} className="underline underline-offset-2">e-posta</a>,{" "}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">WhatsApp</a>{" "}
          veya <a href={phoneHref} className="underline underline-offset-2">{phoneDisplay}</a> üzerinden de ulaşabilirsiniz.
        </p>
      </div>
    </div>
  );
}
