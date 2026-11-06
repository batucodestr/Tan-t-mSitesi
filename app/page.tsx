import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { OwnerCta } from "@/components/sections/owner-cta";
import { PhotoGallery } from "@/components/sections/photo-gallery";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { Trust } from "@/components/sections/trust";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.legalName} | ${siteConfig.tagline}` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <ServicesShowcase services={services} />
      <PhotoGallery />
      <HowItWorks />
      <div className="pt-24 md:pt-36">
        <WhyChooseUs />
      </div>
      <OwnerCta />
    </>
  );
}
