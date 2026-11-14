import { House, RefreshCw, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { PropertyCard } from "@/components/properties/property-card";
import { OwnerCta } from "@/components/sections/owner-cta";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProperties, propertyImageUrl } from "@/lib/api/properties";
import { siteConfig } from "@/lib/site-config";
import {
  applyFilters,
  citiesOf,
  guestOptions,
  hasActiveFilters,
  parseFilters,
  roomOptions,
  sortOptions,
} from "@/lib/utils/property-filters";

export const metadata: Metadata = {
  title: "Evlerim",
  description: `${siteConfig.name} tarafından yönetilen, misafire hazır kısa dönem kiralık evler.`,
  alternates: { canonical: "/evlerim" },
};

const fieldLabel = "mb-1 block text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-muted";
const chevron =
  "bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2214%22%20height=%2214%22%20fill=%22none%22%20stroke=%22%23211c18%22%20stroke-width=%222%22%20viewBox=%220%200%2024%2024%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')]";
const fieldControl = `w-full cursor-pointer appearance-none bg-transparent bg-[position:right_0_center] bg-no-repeat pr-6 text-base font-bold text-ink outline-none ${chevron}`;
const fieldCell = "border-b border-line px-5.5 py-4 focus-within:bg-clay-tint/60 md:border-b-0";

export default async function HomesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = parseFilters(await searchParams);
  const { status, properties } = await getProperties();
  const cities = citiesOf(properties);
  const results = applyFilters(properties, filters);
  const filtered = hasActiveFilters(filters);

  return (
    <>
      <section className="bg-[linear-gradient(180deg,var(--color-paper-deep),var(--color-paper))] pb-10 pt-32 md:pt-40">
        <Container>
          <p className="eyebrow mb-4 text-clay-deep">{siteConfig.name} Evleri</p>
          <h1 className="text-display-xl max-w-3xl">Size uygun evi bulun</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Yönettiğimiz, özenle hazırlanmış gerçek evler. Liste doğrudan yönetim sistemimizden gelir.
          </p>

          {/* Plain GET form: filters work without JavaScript and every result is a shareable link. */}
          <form
            action="/evlerim"
            method="get"
            role="search"
            aria-label="Ev ara"
            className="mt-9 grid overflow-hidden rounded-card border border-line bg-card shadow-card md:grid-cols-[1.3fr_1fr_1fr_1fr_auto]"
          >
            <div className={`${fieldCell} md:border-r`}>
              <label htmlFor="sehir" className={fieldLabel}>Şehir</label>
              <select id="sehir" name="sehir" defaultValue={filters.city} className={fieldControl}>
                <option value="">Tüm şehirler</option>
                {filters.city && !cities.includes(filters.city) && <option value={filters.city}>{filters.city}</option>}
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className={`${fieldCell} md:border-r`}>
              <label htmlFor="oda" className={fieldLabel}>Oda</label>
              <select id="oda" name="oda" defaultValue={filters.rooms} className={fieldControl}>
                {roomOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className={`${fieldCell} md:border-r`}>
              <label htmlFor="misafir" className={fieldLabel}>Misafir</label>
              <select id="misafir" name="misafir" defaultValue={filters.guests ? String(filters.guests) : ""} className={fieldControl}>
                <option value="">Fark etmez</option>
                {filters.guests > 0 && !guestOptions.some((count) => count === filters.guests) && (
                  <option value={filters.guests}>{filters.guests}+ kişi</option>
                )}
                {guestOptions.map((count) => (
                  <option key={count} value={count}>{count}+ kişi</option>
                ))}
              </select>
            </div>
            <div className={fieldCell}>
              <label htmlFor="sirala" className={fieldLabel}>Sırala</label>
              <select id="sirala" name="sirala" defaultValue={filters.sort} className={fieldControl}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="flex min-h-14 items-center justify-center gap-2 bg-clay px-10 text-[1.05rem] font-extrabold text-white transition-colors duration-300 hover:bg-clay-deep"
            >
              <Search aria-hidden size={20} strokeWidth={2.4} />
              Ara
            </button>
          </form>
        </Container>
      </section>

      <section className="pb-20 pt-8 md:pb-28">
        <Container>
          {status === "unavailable" ? (
            <EmptyState
              icon={<RefreshCw aria-hidden size={30} strokeWidth={1.8} className="text-clay-deep" />}
              title="Evler şu an yüklenemedi"
              text="Ev listesine şu anda ulaşılamıyor. Lütfen birkaç dakika sonra tekrar deneyin ya da bize doğrudan ulaşın."
              action={<ButtonLink href="/contact" variant="ghost">İletişime Geçin</ButtonLink>}
            />
          ) : results.length === 0 ? (
            <EmptyState
              icon={<House aria-hidden size={30} strokeWidth={1.8} className="text-clay-deep" />}
              title={filtered ? "Bu kriterlere uygun ev bulunamadı" : "Yakında burada"}
              text={
                filtered
                  ? "Filtreleri genişletmeyi deneyin. Yeni evler portföyümüze düzenli olarak ekleniyor."
                  : "Portföyümüze eklenen evler burada listelenecek."
              }
              action={
                filtered ? (
                  <ButtonLink href="/evlerim" variant="ghost" arrow={false}>
                    Filtreleri temizle
                  </ButtonLink>
                ) : null
              }
            />
          ) : (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[0.95rem] font-semibold text-ink-soft">
                  <span className="text-ink">{results.length}</span> ev listeleniyor
                  {filtered && properties.length !== results.length && <> · toplam {properties.length}</>}
                </p>
                {filtered && (
                  <Link href="/evlerim" className="text-[0.9rem] font-bold text-clay-deep hover:text-ink">
                    Filtreleri temizle
                  </Link>
                )}
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((property) => (
                  <li key={property.id}>
                    <PropertyCard property={property} imageUrl={propertyImageUrl(property)} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </section>

      <OwnerCta
        title="Eviniz de bu listede yer alsın."
        text="Mülkünüzü bize emanet edin; hazırlıktan misafir iletişimine kadar her şeyi biz yönetelim, siz kazancınızı izleyin."
      />
    </>
  );
}

function EmptyState({ icon, title, text, action }: { icon: ReactNode; title: string; text: string; action: ReactNode }) {
  return (
    <div className="mx-auto max-w-xl rounded-card border border-line bg-card px-7 py-14 text-center">
      <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-clay-tint">{icon}</span>
      <h2 className="text-display-sm">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">{text}</p>
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
