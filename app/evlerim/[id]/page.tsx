import { ArrowLeft, Bath, BedDouble, House, MapPin, MessageCircle, Phone, Ruler, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProperty, propertyImageUrl } from "@/lib/api/properties";
import { siteConfig } from "@/lib/site-config";
import { formatArea, formatPrice, locationLabel, roomLabel } from "@/lib/utils/property-format";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property || property === "unavailable") return { title: "Evlerim" };

  const location = locationLabel(property);
  return {
    title: property.name,
    description:
      property.description.slice(0, 160) ||
      `${roomLabel(property.bedroom_count)}, ${property.max_guests} misafirlik ev${location ? ` · ${location}` : ""}.`,
    alternates: { canonical: `/evlerim/${property.id}` },
  };
}

export default async function HomeDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getProperty(id);

  if (property === null) notFound();

  if (property === "unavailable") {
    return (
      <section className="pb-24 pt-36 md:pt-44">
        <Container className="max-w-2xl text-center">
          <h1 className="text-display-lg">Ev bilgisi şu an yüklenemedi</h1>
          <p className="mt-4 text-lg text-ink-soft">Lütfen birkaç dakika sonra tekrar deneyin.</p>
          <ButtonLink href="/evlerim" variant="ghost" className="mt-8">Tüm Evler</ButtonLink>
        </Container>
      </section>
    );
  }

  const imageUrl = propertyImageUrl(property);
  const location = locationLabel(property);
  const whatsappText = encodeURIComponent(`Merhaba, "${property.name}" evi hakkında bilgi almak istiyorum.`);

  const facts = [
    { icon: BedDouble, label: "Oda", value: roomLabel(property.bedroom_count) },
    { icon: Users, label: "Misafir", value: `${property.max_guests} kişi` },
    { icon: BedDouble, label: "Yatak", value: String(property.bed_count) },
    { icon: Bath, label: "Banyo", value: String(property.bathroom_count) },
    { icon: Ruler, label: "Alan", value: formatArea(property.area) },
  ];

  return (
    <article className="pb-20 pt-28 md:pb-28 md:pt-32">
      <Container>
        <Link
          href="/evlerim"
          className="inline-flex items-center gap-2 rounded-full px-1 py-2 text-[0.92rem] font-bold text-ink-soft transition-colors hover:text-clay-deep"
        >
          <ArrowLeft aria-hidden size={17} strokeWidth={2.2} />
          Tüm evler
        </Link>

        <div className="photo relative mt-4 aspect-[4/3] overflow-hidden rounded-panel bg-paper-dark sm:aspect-[16/9] lg:aspect-[21/9]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={property.image_alt || property.name}
              fill
              unoptimized
              preload
              sizes="(min-width: 1240px) 1192px, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,var(--color-clay-tint),var(--color-paper-dark))]">
              <House aria-hidden size={64} strokeWidth={1.2} className="text-clay/60" />
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div>
            {location && (
              <p className="mb-3 flex items-center gap-1.5 text-[0.85rem] font-bold uppercase tracking-[0.05em] text-clay-deep">
                <MapPin aria-hidden size={16} strokeWidth={2.2} />
                {location}
              </p>
            )}
            <h1 className="text-display-lg">{property.name}</h1>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label} className="rounded-2xl border border-line bg-card px-4 py-4">
                  <Icon aria-hidden size={20} strokeWidth={2} className="text-clay-deep" />
                  <p className="mt-2.5 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-muted">{label}</p>
                  <p className="font-display text-[1.25rem] font-semibold">{value}</p>
                </li>
              ))}
            </ul>

            {property.description && (
              <section className="mt-10">
                <h2 className="text-display-sm">Ev hakkında</h2>
                <p className="mt-4 whitespace-pre-line text-[1.05rem] leading-relaxed text-ink-soft">{property.description}</p>
              </section>
            )}
          </div>

          <aside className="lg:pt-2">
            <div className="rounded-card border border-line bg-card p-7 shadow-card lg:sticky lg:top-28">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-muted">Gecelik başlangıç fiyatı</p>
              <p className="mt-1.5 font-display text-[2.2rem] font-semibold leading-tight">
                {formatPrice(property.base_price)}
                <span className="ml-1.5 font-sans text-[0.95rem] font-semibold text-muted">/ gece</span>
              </p>
              <p className="mt-3 text-[0.9rem] text-ink-soft">
                Fiyat sezona ve konaklama süresine göre değişebilir. Müsaitlik ve rezervasyon için bize yazın.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href={`${siteConfig.contact.whatsappHref}?text=${whatsappText}`} arrow={false} className="w-full">
                  <MessageCircle aria-hidden size={18} strokeWidth={2.2} />
                  WhatsApp&apos;tan Sor
                </ButtonLink>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full border-[1.5px] border-line-strong bg-card px-7 py-3 font-bold text-ink transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-ink"
                >
                  <Phone aria-hidden size={18} strokeWidth={2.2} />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
