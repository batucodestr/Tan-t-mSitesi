import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/data/blog";
import { legalDocuments } from "@/lib/data/legal";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/list-your-property", priority: 0.9 },
    { path: "/management-plans", priority: 0.9 },
    { path: "/pricing", priority: 0.8 },
    { path: "/blog", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];

  return [
    ...staticPaths.map(({ path, priority }) => ({ url: `${siteConfig.url}${path}`, priority })),
    ...blogPosts.map((post) => ({ url: `${siteConfig.url}/blog/${post.slug}`, priority: 0.6 })),
    ...legalDocuments.map((doc) => ({ url: `${siteConfig.url}/legal/${doc.slug}`, priority: 0.2 })),
  ];
}
