import type { Metadata } from "next";
import Link from "next/link";

import { OwnerCta } from "@/components/sections/owner-cta";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Photo } from "@/components/ui/photo";
import { blogPosts, formatBlogDate } from "@/lib/data/blog";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Kısa dönem kiralama, Airbnb ve Booking.com ilan yönetimi, fiyatlandırma ve mevzuat hakkında ev sahipleri için rehber yazılar.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageIntro eyebrow="Blog" title="Ev sahipleri için rehber yazılar.">
        <p>Kısa dönem kiralamada izin süreçlerinden fiyatlandırmaya, işe yarayan bilgiler.</p>
      </PageIntro>

      <section aria-labelledby="yazilar" className="pb-24 md:pb-36">
        <Container>
          <h2 id="yazilar" className="sr-only">Yazılar</h2>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group relative">
                <Photo
                  src={post.image.src}
                  alt={post.image.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="aspect-[4/3]"
                  imageClassName="transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.03]"
                />
                <p className="eyebrow mt-5 text-clay">{post.category}</p>
                <h3 className="mt-2 text-display-sm">
                  <Link href={`/blog/${post.slug}`} className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-clay">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-ink-soft">{post.excerpt}</p>
                <time dateTime={post.publishedAt} className="mt-3 block text-sm text-ink-soft">
                  {formatBlogDate(post.publishedAt)}
                </time>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <OwnerCta />
    </>
  );
}
