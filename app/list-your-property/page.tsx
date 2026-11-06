import { Check } from "lucide-react";
import type { Metadata } from "next";

import { OwnerApplicationForm } from "@/components/forms/owner-application-form";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mülkünüzü Listeleyin",
  description:
    "Kısa dönem kiralık mülkünüzü profesyonel yönetime geçirin. Formu doldurun, mülkünüzü değerlendirip size özel önerimizi paylaşalım. Başvuru ücretsizdir.",
  path: "/list-your-property",
});

const benefits = [
  "Airbnb ve Booking.com'da tek elden yönetim",
  "Talebe göre düzenli fiyat güncellemesi",
  "Misafir iletişimi, temizlik ve bakım bizden",
  "Her ay anlaşılır gelir ve gider raporu",
];

const nextSteps = [
  { title: "Başvurunuzu inceleriz", text: "Mülkünüzü, konumunu ve bölgedeki talebi değerlendiririz." },
  { title: "Sizi arayıp konuşuruz", text: "Beklentilerinizi dinler, gerçekçi bir gelir tablosu paylaşırız." },
  { title: "Birlikte karar veririz", text: "Sizin için uygunsa hazırlık sürecini planlar, mülkünüzü yayına alırız." },
];

export default function ListYourPropertyPage() {
  const { phoneDisplay, phoneHref } = siteConfig.contact;

  return (
    <section className="pb-24 pt-36 md:pb-32 md:pt-44">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6 text-clay">Mülk sahipleri için</p>
            <h1 className="text-display-lg">Mülkünüzü bize anlatın, gerisini konuşalım.</h1>
            <p className="mt-6 text-lg text-ink-soft">
              Formu doldurmanız birkaç dakikanızı alır. Başvuru ücretsizdir ve sizi hiçbir şeye bağlamaz.
            </p>

            <ul className="mt-9 border-t border-ink/80">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 border-b border-line py-3.5">
                  <Check aria-hidden size={19} strokeWidth={1.5} className="mt-1 shrink-0 text-clay" />
                  {benefit}
                </li>
              ))}
            </ul>

            <Photo
              src="/images/site/list-property.jpg"
              alt="Akşam ışığında ahşap detaylı çağdaş bir ev"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="mt-12 hidden aspect-[4/3] lg:block"
            />
          </div>

          <div className="lg:col-span-7">
            <div className="bg-paper-deep p-6 sm:p-10 md:p-12">
              <h2 className="mb-8 text-display-md">Başvuru formu</h2>
              <OwnerApplicationForm />
            </div>

            <div className="mt-14">
              <h2 className="text-display-sm">Başvurudan sonra ne oluyor?</h2>
              <ol className="mt-6 grid gap-8 border-t border-ink/80 pt-7 sm:grid-cols-3">
                {nextSteps.map((step, index) => (
                  <li key={step.title}>
                    <span aria-hidden className="font-display text-3xl text-clay">{index + 1}</span>
                    <h3 className="mt-2 font-sans text-base font-medium tracking-normal">{step.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{step.text}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-10 text-ink-soft">
                Önce konuşmak isterseniz:{" "}
                <a href={phoneHref} className="text-ink underline underline-offset-4">{phoneDisplay}</a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
