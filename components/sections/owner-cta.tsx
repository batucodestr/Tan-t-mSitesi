import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { ownerCta } from "@/lib/site-config";

const assurances = [
  "Başvuru ve ilk değerlendirme ücretsizdir",
  "Başvurmak sizi hiçbir şeye bağlamaz",
  "Tüm koşulları sözleşmede açıkça görürsünüz",
];

export function OwnerCta({
  title = "Mülkünüzün potansiyelini birlikte değerlendirelim.",
  text = "Kısa formu doldurun. Mülkünüzü inceleyelim, neler yapabileceğimizi ve sizin için anlamlı olup olmadığını açıkça konuşalım.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div className="relative mx-auto grid max-w-[1240px] overflow-hidden rounded-panel bg-[linear-gradient(120deg,var(--color-clay),var(--color-clay-deep))] text-white shadow-lift lg:grid-cols-2">
        <span aria-hidden className="pointer-events-none absolute -left-20 -top-30 size-85 rounded-full bg-white/8" />
        <div className="relative flex flex-col justify-center px-7 py-14 sm:px-12 lg:py-20">
          <div className="reveal max-w-xl">
            <h2 className="text-display-lg text-white">{title}</h2>
            <p className="mt-5 text-lg text-white/90">{text}</p>
            <ul className="mt-7 space-y-3">
              {assurances.map((item) => (
                <li key={item} className="flex items-start gap-3 font-semibold">
                  <span aria-hidden className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check size={15} strokeWidth={2.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={ownerCta.href} variant="paper" className="mt-9">
              {ownerCta.label}
            </ButtonLink>
          </div>
        </div>
        <Photo
          src="/images/site/cta.jpg"
          alt="Ağaçlar arasında, bahçeli çağdaş bir ev"
          sizes="(min-width: 1024px) 620px, 100vw"
          className="aspect-[4/3] lg:aspect-auto lg:min-h-full"
        />
      </div>
    </section>
  );
}
