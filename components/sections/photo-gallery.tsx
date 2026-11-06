import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";

/** Staggered pairs: a wide photograph beside a narrower, offset one. */
const photos = [
  {
    src: "/images/gallery/havuzlu-villa.jpg",
    alt: "İki katlı beyaz villa ve önündeki yansımalı havuz",
    caption: "Havuz ve teras",
    className: "lg:col-span-7",
    aspect: "aspect-[4/3]",
    sizes: "(min-width: 1024px) 56vw, 100vw",
  },
  {
    src: "/images/gallery/kemerli-salon.jpg",
    alt: "Kemerli pencereli, ahşap kirişli ve şömineli aydınlık salon",
    caption: "Yaşam alanı",
    className: "lg:col-span-5 lg:mt-32",
    aspect: "aspect-[4/3] lg:aspect-[5/6]",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
  {
    src: "/images/gallery/yatak-odasi.jpg",
    alt: "Loş ışıklı, uzun perdeli, özenle hazırlanmış yatak odası",
    caption: "Misafire hazır yatak odası",
    className: "lg:col-span-5",
    aspect: "aspect-[4/3] lg:aspect-[5/6]",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
  {
    src: "/images/gallery/sehir-dairesi.jpg",
    alt: "Şehre bakan pencereli, kırmızı koltuklu aydınlık bir daire",
    caption: "Şehir dairesi",
    className: "lg:col-span-7 lg:mt-32",
    aspect: "aspect-[4/3]",
    sizes: "(min-width: 1024px) 56vw, 100vw",
  },
];

export function PhotoGallery() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Misafirin gördüğü" title="İlk izlenim bizim işimiz.">
            Fotoğraf çekiminden son kontrole, mülkünüzün misafirin gözünde nasıl göründüğüyle biz ilgileniyoruz.
          </SectionHeading>
          <TextLink href="/management-plans" className="self-start lg:self-end">Planlarımızı inceleyin</TextLink>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 lg:mt-20 lg:grid-cols-12 lg:gap-y-24">
          {photos.map((photo) => (
            <figure key={photo.src} className={`reveal ${photo.className}`}>
              <Photo src={photo.src} alt={photo.alt} sizes={photo.sizes} className={photo.aspect} />
              <figcaption className="mt-3 text-[0.9375rem] text-ink-soft">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
