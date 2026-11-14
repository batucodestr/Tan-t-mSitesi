import { ArrowRight, Bath, BedDouble, House, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { PmsProperty } from "@/lib/types/property";
import { formatPrice, locationLabel, roomLabel } from "@/lib/utils/property-format";

/** Card for one PMS home, used on the homepage and on /evlerim. */
export function PropertyCard({ property, imageUrl }: { property: PmsProperty; imageUrl: string | null }) {
  const location = locationLabel(property);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-card transition-all duration-400 ease-soft hover:-translate-y-1.5 hover:shadow-card">
      <div className="photo relative aspect-[4/3] overflow-hidden bg-paper-dark">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={property.image_alt || property.name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,var(--color-clay-tint),var(--color-paper-dark))]">
            <House aria-hidden size={44} strokeWidth={1.4} className="text-clay/60" />
          </div>
        )}
        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.78rem] font-bold text-ink backdrop-blur">
          <BedDouble aria-hidden size={13} strokeWidth={2.2} className="text-clay" />
          {roomLabel(property.bedroom_count)}
        </span>
      </div>

      <div className="flex grow flex-col px-5.5 pb-6 pt-5">
        {location && (
          <p className="mb-1.5 flex items-center gap-1.5 text-[0.8rem] font-bold uppercase tracking-[0.04em] text-clay-deep">
            <MapPin aria-hidden size={14} strokeWidth={2.2} className="shrink-0" />
            {location}
          </p>
        )}
        <h3 className="mb-3.5 line-clamp-2 min-h-[2.5em] font-display text-[1.2rem] font-semibold leading-tight">
          <Link href={`/evlerim/${property.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {property.name}
          </Link>
        </h3>
        <ul className="mb-4 flex flex-wrap gap-x-3.5 gap-y-1 text-[0.85rem] text-muted">
          <li className="flex items-center gap-1.5">
            <Users aria-hidden size={15} strokeWidth={2} /> {property.max_guests} misafir
          </li>
          <li className="flex items-center gap-1.5">
            <BedDouble aria-hidden size={15} strokeWidth={2} /> {property.bed_count} yatak
          </li>
          <li className="flex items-center gap-1.5">
            <Bath aria-hidden size={15} strokeWidth={2} /> {property.bathroom_count} banyo
          </li>
        </ul>
        <div className="mt-auto flex items-baseline justify-between border-t border-line pt-4">
          <p className="font-display text-[1.4rem] font-semibold">
            {formatPrice(property.base_price)}
            <span className="ml-1 font-sans text-[0.8rem] font-semibold text-muted">/ gece</span>
          </p>
          <span className="flex items-center gap-1 text-[0.85rem] font-bold text-clay-deep">
            İncele
            <ArrowRight aria-hidden size={15} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
