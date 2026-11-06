import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

/** Opening block of every inner page. Leaves room for the fixed header. */
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="pb-14 pt-36 md:pb-20 md:pt-44">
      <Container>
        <p className="eyebrow mb-6 text-clay">{eyebrow}</p>
        <h1 className="text-display-xl max-w-5xl">{title}</h1>
        {children && <div className="mt-8 max-w-2xl text-lg text-ink-soft md:text-xl md:leading-relaxed">{children}</div>}
      </Container>
    </section>
  );
}
