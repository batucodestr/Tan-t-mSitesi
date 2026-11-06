import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";

import { Faq } from "@/components/sections/faq";
import { OwnerCta } from "@/components/sections/owner-cta";
import { PlanCards } from "@/components/sections/plan-cards";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { planComparison, plans } from "@/lib/data/plans";
import { faqs, services } from "@/lib/data/services";
import { cn } from "@/lib/utils/cn";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Yönetim Planlarımız",
  description:
    "Dijital Yönetim ve Tam Yönetim planlarını karşılaştırın. Airbnb ve Booking.com yönetimi, misafir iletişimi, fiyat optimizasyonu, temizlik ve bakım koordinasyonu.",
  path: "/management-plans",
});

function Included({ value }: { value: boolean }) {
  return value ? (
    <>
      <Check aria-hidden size={20} strokeWidth={1.5} className="mx-auto text-clay" />
      <span className="sr-only">Dahil</span>
    </>
  ) : (
    <>
      <Minus aria-hidden size={16} strokeWidth={1.25} className="mx-auto text-ink-soft/60" />
      <span className="sr-only">Dahil değil</span>
    </>
  );
}

export default function ManagementPlansPage() {
  return (
    <>
      <PageIntro eyebrow="Yönetim Planlarımız" title="İhtiyacınıza uygun yönetim planını seçin.">
        <p>
          İster yalnızca ilan ve misafir tarafını bize bırakın, ister mülkünüzün tüm işlerini. Her iki planda da aynı özen
          ve aynı şeffaf raporlama geçerli.
        </p>
      </PageIntro>

      <section aria-label="Planlar" className="pb-24 md:pb-32">
        <Container>
          <PlanCards plans={plans} />
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <SectionHeading eyebrow="Karşılaştırma" title="Hangi planda neler var?" />
          <div className="reveal mt-14">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-ink/80">
                  <th scope="col" className="eyebrow py-4 font-medium text-ink-soft">Hizmet</th>
                  <th scope="col" className="eyebrow w-20 py-4 text-center font-medium text-ink-soft md:w-44">Dijital</th>
                  <th scope="col" className="eyebrow w-16 py-4 text-center font-medium text-ink-soft md:w-44">Tam</th>
                </tr>
              </thead>
              <tbody>
                {planComparison.map((row) => (
                  <tr key={row.task} className="border-b border-line">
                    <th scope="row" className="py-4 pr-4 font-normal">{row.task}</th>
                    <td className="py-4 text-center"><Included value={row.digital} /></td>
                    <td className="py-4 text-center"><Included value={row.full} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <Photo
        src="/images/site/services-villa.jpg"
        alt="Havuzu ve geniş terasıyla beyaz, modern bir villa"
        sizes="100vw"
        className="aspect-[4/3] md:aspect-[21/9]"
      />

      <div className="py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="Hizmetlerimiz" title="Planların içinde neler yapıyoruz?" />
          <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
            {services.map((service, index) => (
              <section key={service.id} id={service.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Photo
                  src={service.image.src}
                  alt={service.image.alt}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className={cn("reveal aspect-[4/3] lg:col-span-6", index % 2 === 1 && "lg:order-2")}
                />
                <div className={cn("reveal lg:col-span-6", index % 2 === 1 ? "lg:order-1 lg:pr-8" : "lg:pl-8")}>
                  <p className="font-display text-2xl text-clay">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-display-md">{service.title}</h3>
                  <p className="mt-5 text-lg text-ink-soft">{service.detail}</p>
                  <ul className="mt-8 border-t border-line">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 border-b border-line py-3">
                        <Check aria-hidden size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-clay" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-paper-deep">
        <Faq items={faqs} />
      </div>

      <OwnerCta />
    </>
  );
}
