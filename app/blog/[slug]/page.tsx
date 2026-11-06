import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OwnerCta } from "@/components/sections/owner-cta";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { blogPosts, formatBlogDate, getBlogPost } from "@/lib/data/blog";
import { pageMetadata } from "@/lib/utils/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.image.src });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header className="pb-10 pt-32 md:pb-14 md:pt-40">
          <Container className="max-w-3xl!">
            <nav aria-label="Sayfa konumu" className="text-sm text-ink-soft">
              <Link href="/blog" className="transition-colors duration-300 hover:text-clay">Blog</Link>
            </nav>
            <p className="eyebrow mb-5 mt-8 text-clay">{post.category}</p>
            <h1 className="text-display-lg">{post.title}</h1>
            <p className="mt-6 text-lg text-ink-soft md:text-xl md:leading-relaxed">{post.excerpt}</p>
            <time dateTime={post.publishedAt} className="mt-5 block text-sm text-ink-soft">
              {formatBlogDate(post.publishedAt)}
            </time>
          </Container>
        </header>

        <Container className="max-w-6xl!">
          <Photo src={post.image.src} alt={post.image.alt} sizes="(min-width: 1152px) 1152px, 100vw" preload className="aspect-[4/3] md:aspect-[21/9]" />
        </Container>

        <Container className="max-w-3xl! py-14 md:py-20">
          <div className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-display-md">{section.heading}</h2>
                <div className="mt-5 space-y-5 text-lg text-ink-soft">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </article>

      <OwnerCta />
    </>
  );
}
