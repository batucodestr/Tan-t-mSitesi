import type { Metadata } from "next";

import { FeaturedHomes } from "@/components/sections/featured-homes";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { OwnerCta } from "@/components/sections/owner-cta";
import { PhotoGallery } from "@/components/sections/photo-gallery";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { StatsBar } from "@/components/sections/stats-bar";
import { Trust } from "@/components/sections/trust";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { getProperties } from "@/lib/api/properties";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.legalName} | ${siteConfig.tagline}` },
  alternates: { canonical: "/" },
};

// Homes come from the PMS; refresh the page at most every 30 seconds.
export const revalidate = 30;

export default async function HomePage() {
  const { status, properties } = await getProperties();

  return (
    <>
      <Hero featured={properties[0]} />
      <StatsBar homeCount={status === "ok" ? properties.length : null} />
      <HowItWorks />
      <FeaturedHomes properties={properties.slice(0, 3)} />
      <Trust />
      <ServicesShowcase services={services} />
      <PhotoGallery />
      <WhyChooseUs />
      <OwnerCta />
    </>
  );
}
