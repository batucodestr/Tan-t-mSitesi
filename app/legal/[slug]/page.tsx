import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { legalDocuments, legalDraft } from "@/lib/data/legal";
import { pageMetadata } from "@/lib/utils/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalDocuments.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocuments.find((item) => item.slug === slug);
  if (!doc) return {};

  return pageMetadata({ title: doc.title, description: doc.description, path: `/legal/${doc.slug}` });
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = legalDocuments.find((item) => item.slug === slug);
  if (!doc) notFound();

  return (
    <section className="pb-24 pt-36 md:pb-32 md:pt-44">
      <Container className="max-w-3xl!">
        <p className="eyebrow mb-6 text-clay">Yasal</p>
        <h1 className="text-display-lg">{doc.title}</h1>

        {legalDraft && (
          <p className="mt-8 border-l-2 border-clay bg-paper-deep/60 px-4 py-3 text-[0.9375rem] text-ink-soft">
            Bu metin örnek bir taslaktır ve yayına alınmadan önce hukuk danışmanı tarafından gözden geçirilmelidir.
          </p>
        )}

        <div className="mt-12 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-display-sm">{section.heading}</h2>
              <p className="mt-3 text-ink-soft">{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
