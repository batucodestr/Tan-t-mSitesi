import { ArrowRight } from "lucide-react";

import { PropertyCard } from "@/components/properties/property-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { propertyImageUrl } from "@/lib/api/properties";
import type { PmsProperty } from "@/lib/types/property";

/** Newest homes from the PMS. Renders nothing when there are none to show. */
export function FeaturedHomes({ properties }: { properties: PmsProperty[] }) {
  if (properties.length === 0) return null;

  return (
    <section className="bg-paper-deep py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Evlerimiz" title="Portföyümüzden seçkiler">
            Yönettiğimiz, misafire hazır gerçek evler. Liste doğrudan yönetim sistemimizden gelir.
          </SectionHeading>
          <ButtonLink href="/evlerim" variant="ghost" arrow={false} className="self-start md:self-end">
            Tüm Evleri Gör <ArrowRight aria-hidden size={18} strokeWidth={2} />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <li key={property.id} className="reveal flex">
              <div className="w-full">
                <PropertyCard property={property} imageUrl={propertyImageUrl(property)} />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
