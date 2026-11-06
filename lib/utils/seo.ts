import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

/**
 * Per-page metadata. Next.js replaces rather than merges nested openGraph
 * objects, so each page has to state the full set.
 */
export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.legalName,
      locale: "tr_TR",
      type: "website",
      images: [{ url: image ?? siteConfig.ogImage, alt: title }],
    },
  };
}
