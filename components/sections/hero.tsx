import { BadgeCheck, Calculator, Headphones, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";

import { HeroSlideshow } from "@/components/sections/hero-slideshow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { estimate, roomLabelOf, type EstimateInput } from "@/lib/data/earnings";

const chips = [
  { icon: Headphones, label: "7/24 misafir iletişimi" },
  { icon: ShieldCheck, label: "Kurulum ücreti yok" },
  { icon: BadgeCheck, label: "Aylık şeffaf rapor" },
];

/** The floating card shows the calculator's own estimate for a sample home. */
const SAMPLE: EstimateInput = { city: "Muğla", district: "Bodrum", rooms: 2, features: ["Deniz Manzarası"] };

const money = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });

export function Hero() {
  const sample = estimate(SAMPLE);

  return (
    <section className="relative flex min-h-[700px] items-center overflow-hidden bg-ink pb-16 pt-32 text-white h-svh">
      <HeroSlideshow />
      {/* Keeps the copy legible on every photograph. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(28_20_16/0.5)_0%,rgb(28_20_16/0.8)_100%)] md:bg-[linear-gradient(105deg,rgb(28_20_16/0.82)_0%,rgb(28_20_16/0.55)_42%,rgb(28_20_16/0.12)_80%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgb(33_28_24/0.55),transparent)]" />

      <Container className="relative">
        <div className="hero-copy max-w-[660px]">
          <p className="eyebrow mb-5 text-white">Kısa Dönem Kiralama Yönetimi</p>
          <h1 className="text-display-xl text-white">
            Evinizi emanet edin, <em className="font-medium italic text-clay-light">kazancınızı</em> izleyin.
          </h1>
          <p className="mt-6 max-w-[540px] text-lg leading-relaxed text-white/85 md:text-xl">
            Airbnb ve Booking.com&apos;daki evinizi ilan hazırlığından misafir iletişimine, dinamik fiyatlandırmadan temizliğe
            kadar baştan sona biz yönetelim. Siz yalnızca aylık raporunuzu okuyun.
          </p>
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <ButtonLink href="/#kazanc" arrow={false} className="!min-h-14 !px-8 !text-[1.05rem]">
              <Calculator aria-hidden size={19} strokeWidth={2.2} />
              Ne Kadar Kazanırım?
            </ButtonLink>
            <ButtonLink href="/evlerim" variant="outline-light">
              Evleri Keşfet
            </ButtonLink>
          </div>
          <ul className="mt-9 flex flex-wrap gap-2.5">
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

      <Link
        href="/#kazanc"
        aria-label={`Örnek kazanç tahmini: aylık ${money.format(sample.monthly)}. Kendi evinizi hesaplayın.`}
        className="float-card absolute bottom-[9%] right-[5%] hidden w-[330px] rounded-card bg-white p-5.5 text-ink shadow-lift transition-shadow hover:shadow-[0_34px_80px_rgb(33_28_24/0.24)] xl:block"
      >
        <div className="flex items-center justify-between">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted">Aylık tahmini gelir</p>
          <span className="flex size-8 items-center justify-center rounded-full bg-sage-soft">
            <TrendingUp aria-hidden size={16} strokeWidth={2.4} className="text-sage" />
          </span>
        </div>
        <p className="mt-1.5 font-display text-[2.3rem] font-semibold leading-none">{money.format(sample.monthly)}</p>
        <p className="mt-2 text-[0.86rem] text-ink-soft">
          {roomLabelOf(SAMPLE.rooms)} · {SAMPLE.district} · Deniz manzaralı
        </p>
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-paper-dark">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-clay),var(--color-sun))]" style={{ width: `${sample.occupancy}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-[0.8rem]">
            <span className="font-bold text-ink">%{sample.occupancy} doluluk</span>
            <span className="font-bold text-clay-deep">Sizinkini hesaplayın →</span>
          </div>
        </div>
      </Link>
    </section>
  );
}
