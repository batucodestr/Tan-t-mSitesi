import { Check, Plus } from "lucide-react";
import type { Metadata } from "next";

import { Faq } from "@/components/sections/faq";
import { OwnerCta } from "@/components/sections/owner-cta";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { plans, pricingFaqs } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Fiyatlandırma",
  description:
    "Sabit ücret yok: komisyon, mülkünüzün elde ettiği gelir üzerinden hesaplanır. Komisyona nelerin dahil olduğunu ve aylık raporda neleri göreceğinizi inceleyin.",
  path: "/pricing",
});

const included = [
  "İlan hazırlığı ve platform yönetimi",
  "Fiyatlandırma ve takvim yönetimi",
  "Misafir iletişimi",
  "Aylık gelir ve gider raporu",
];

const separateCosts = [
  "Platform kesintileri",
  "Temizlik ve çamaşır",
  "Sarf malzemeleri",
  "Onarım ve bakım harcamaları",
];

const sampleReport = [
  { label: "Brüt konaklama geliri", value: "₺ 148.500", detail: "23 gece" },
  { label: "Platform kesintileri", value: "– ₺ 4.455" },
  { label: "Temizlik ve çamaşır", value: "– ₺ 9.600", detail: "6 çıkış" },
  { label: "Bakım", value: "– ₺ 1.850", detail: "Musluk değişimi" },
  { label: "Yönetim komisyonu", value: "– ₺ 22.275" },
];

export default function PricingPage() {
  return (
    <>
      <PageIntro eyebrow="Fiyatlandırma" title="Sabit ücret yok. Mülkünüz kazandığında biz de kazanırız.">
        <p>
          Komisyonumuzu mülkünüzün elde ettiği gelir üzerinden alıyoruz. Bu yüzden hedefimiz sizinkiyle aynı: mülkünüzden
          sürdürülebilir biçimde daha fazla gelir elde etmek.
        </p>
      </PageIntro>

      <section className="pb-24 md:pb-32">
        <Container>
          <h2 className="sr-only">Plan komisyonları</h2>
          <ul className="border-t border-ink/80">
            {plans.map((plan) => (
              <li key={plan.id} className="reveal grid gap-x-8 gap-y-3 border-b border-line py-8 md:grid-cols-12 md:items-center md:py-10">
                <h3 className="text-display-md md:col-span-4">{plan.name}</h3>
                <div className="md:col-span-5">
                  <p className="text-sm text-ink-soft">Komisyon oranı</p>
                  <p className="mt-1 text-lg">{plan.commission}</p>
                </div>
                <TextLink href={`/management-plans#${plan.id}`} className="justify-self-start md:col-span-3 md:justify-self-end">
                  Planı inceleyin
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-paper-deep py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="Şeffaflık" title="Neyin karşılığında ne ödüyorsunuz?" />
          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <h3 className="text-display-sm">Komisyona dahil olanlar</h3>
              <ul className="mt-6 border-t border-ink/80">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-ink/15 py-3.5">
                    <Check aria-hidden size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-clay" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 className="text-display-sm">Ayrıca hesaplanan giderler</h3>
              <ul className="mt-6 border-t border-ink/80">
                {separateCosts.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-ink/15 py-3.5">
                    <Plus aria-hidden size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-clay" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-espresso py-24 text-paper md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Aylık rapor" title="Her ay, her kuruşu görün." tone="light">
                Rezervasyonları, platform kesintilerini, operasyon giderlerini ve size kalan net tutarı tek bir raporda
                görürsünüz.
              </SectionHeading>
            </div>

            <figure className="reveal bg-paper p-6 text-ink md:p-10 lg:col-span-7">
              <figcaption className="flex items-baseline justify-between gap-4 border-b border-ink/80 pb-5">
                <span className="font-display text-display-sm">Aylık Sahip Raporu</span>
                <span className="eyebrow shrink-0 text-clay">Örnek görünüm</span>
              </figcaption>
              <table className="w-full text-left text-[0.9375rem]">
                <caption className="sr-only">Temsilî rakamlarla örnek aylık sahip raporu</caption>
                <tbody>
                  {sampleReport.map((row) => (
                    <tr key={row.label} className="border-b border-line">
                      <th scope="row" className="py-4 pr-4 font-normal">
                        {row.label}
                        {row.detail && <span className="block text-sm text-ink-soft">{row.detail}</span>}
                      </th>
                      <td className="whitespace-nowrap py-4 text-right tabular-nums">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" className="pr-4 pt-6 font-display text-display-sm font-medium">Size kalan net tutar</th>
                    <td className="whitespace-nowrap pt-6 text-right font-display text-display-sm lining-nums tabular-nums text-clay">₺ 110.320</td>
                  </tr>
                </tfoot>
              </table>
              <p className="mt-6 text-sm text-ink-soft">
                Rakamlar ve komisyon tutarı yalnızca raporun biçimini göstermek içindir. Fiyat teklifi, gelir taahhüdü veya tahmini değildir.
              </p>
            </figure>
          </div>
        </Container>
      </section>

      <Faq items={pricingFaqs} />

      <OwnerCta title="Mülkünüz için net rakamları konuşalım." />
    </>
  );
}
