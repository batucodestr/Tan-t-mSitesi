import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ownerCta } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex min-h-[640px] items-end overflow-hidden bg-espresso text-paper h-svh">
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
      {/* Keeps the copy and the clear header legible on any replacement photograph. */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(30_24_19/0.9)_0%,rgb(30_24_19/0.72)_50%,rgb(30_24_19/0)_85%)] md:bg-[linear-gradient(to_top,rgb(30_24_19/0.82)_0%,rgb(30_24_19/0.45)_38%,rgb(30_24_19/0)_65%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(to_bottom,rgb(30_24_19/0.5),rgb(30_24_19/0))]" />

      <Container className="hero-copy relative pb-10 md:pb-14">
        <div className="max-w-5xl">
          <p className="eyebrow mb-5 text-paper/85">Profesyonel kısa dönem kiralama yönetimi</p>
          <h1 className="text-display-xl">Mülkünüz kazansın, gerisini biz yönetelim.</h1>
        </div>

        <div className="mt-7 md:mt-9">
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-paper/90">
              Airbnb ve Booking.com&apos;daki mülkünüzü ilan hazırlığından misafir iletişimine, fiyatlandırmadan temizliğe
              kadar özenle yönetiyoruz. Siz yalnızca aylık raporunuzu okuyorsunuz.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={ownerCta.href}>{ownerCta.label}</ButtonLink>
              <ButtonLink href="/management-plans" variant="outline-light" arrow={false}>
                Yönetim Planlarımız
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
