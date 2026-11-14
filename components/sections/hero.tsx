import { BadgeCheck, Headphones, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { PmsProperty } from "@/lib/types/property";
import { formatPrice, locationLabel, roomLabel } from "@/lib/utils/property-format";

const chips = [
  { icon: Headphones, label: "7/24 misafir iletişimi" },
  { icon: ShieldCheck, label: "Kurulum ücreti yok" },
  { icon: BadgeCheck, label: "Aylık şeffaf rapor" },
];

/** Full-bleed hero. When the PMS has homes, a floating card shows the newest one. */
export function Hero({ featured }: { featured?: PmsProperty }) {
  return (
    <section className="relative flex min-h-[680px] items-center overflow-hidden bg-ink pb-16 pt-32 text-white h-svh">
      <div className="hero-photo photo absolute inset-0">
        <Image
          src="/images/site/hero.jpg"
          alt="Gün batımında tepelere bakan, özel havuzlu modern bir villanın terası"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[35%_center] md:object-center"
        />
      </div>
      {/* Keeps the copy legible on any replacement photograph. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(28_20_16/0.55)_0%,rgb(28_20_16/0.78)_100%)] md:bg-[linear-gradient(105deg,rgb(28_20_16/0.8)_0%,rgb(28_20_16/0.52)_42%,rgb(28_20_16/0.14)_78%)]"
      />

      <Container className="relative">
        <div className="hero-copy max-w-[660px]">
          <p className="eyebrow mb-5 text-white">Kısa Dönem Kiralama Yönetimi</p>
          <h1 className="text-display-xl text-white">
            Mülkünüz kazansın, <em className="font-medium italic text-clay-light">gerisini</em> biz yönetelim.
          </h1>
          <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-white/85 md:text-xl">
            Airbnb ve Booking.com&apos;daki evinizi ilan hazırlığından misafir iletişimine, fiyatlandırmadan temizliğe kadar
            özenle yönetiyoruz. Siz yalnızca kazancınızı izleyin.
          </p>
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <ButtonLink href="/list-your-property">Ücretsiz Değerlendirme</ButtonLink>
            <ButtonLink href="/evlerim" variant="outline-light" arrow={false}>
              Evleri Keşfet
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {chips.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/13 px-4 py-2.5 text-[0.86rem] font-semibold backdrop-blur-sm"
              >
                <Icon aria-hidden size={16} strokeWidth={2.2} className="text-clay-light" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {featured && (
        <Link
          href={`/evlerim/${featured.id}`}
          className="float-card absolute bottom-[9%] right-[5%] hidden w-[330px] rounded-card bg-white p-5.5 text-ink shadow-lift transition-shadow hover:shadow-[0_34px_80px_rgb(33_28_24/0.24)] xl:block"
        >
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted">Portföyümüze yeni katıldı</p>
          <p className="mt-2 line-clamp-1 font-display text-[1.35rem] font-semibold">{featured.name}</p>
          <p className="mt-1 flex items-center gap-1.5 text-[0.86rem] text-ink-soft">
            <MapPin aria-hidden size={14} strokeWidth={2.2} className="text-clay" />
            {[roomLabel(featured.bedroom_count), locationLabel(featured)].filter(Boolean).join(" · ")}
          </p>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-clay-tint px-4 py-3">
            <span className="text-[0.84rem] font-semibold text-clay-deep">Gecelik</span>
            <span className="font-display text-[1.3rem] font-semibold">{formatPrice(featured.base_price)}</span>
          </div>
        </Link>
      )}
    </section>
  );
}
