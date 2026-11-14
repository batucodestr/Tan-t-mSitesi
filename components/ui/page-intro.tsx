import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

/** Opening block of every inner page. Leaves room for the fixed header. */
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-[linear-gradient(180deg,var(--color-paper-deep),var(--color-paper))] pb-12 pt-32 md:pb-16 md:pt-40">
      <Container>
        <p className="eyebrow mb-5 text-clay-deep">{eyebrow}</p>
        <h1 className="text-display-xl max-w-4xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">{children}</div>}
      </Container>
    </section>
  );
}
