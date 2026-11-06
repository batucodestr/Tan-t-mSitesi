import { Plus } from "lucide-react";

import { Container } from "@/components/ui/container";

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5 text-clay">Sık sorulanlar</p>
            <h2 className="text-display-lg">Aklınızdaki sorular.</h2>
          </div>
          <div className="border-t border-ink/80 lg:col-span-8">
            {items.map((item) => (
              <details key={item.question} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-display-sm transition-colors duration-300 hover:text-clay">
                  {item.question}
                  <Plus aria-hidden size={22} strokeWidth={1.25} className="shrink-0 transition-transform duration-300 ease-soft group-open:rotate-45" />
                </summary>
                <p className="max-w-2xl pb-7 text-ink-soft">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
