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
    <section className="grid bg-clay text-paper lg:grid-cols-2">
      <div className="flex flex-col justify-center px-5 py-20 md:px-10 lg:px-16 lg:py-32">
        <div className="reveal max-w-xl">
          <h2 className="text-display-lg">{title}</h2>
          <p className="mt-6 text-lg text-paper/90">{text}</p>
          <ul className="mt-8 space-y-3">
            {assurances.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check aria-hidden size={20} strokeWidth={1.5} className="mt-1 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href={ownerCta.href} variant="paper" className="mt-10">
            {ownerCta.label}
          </ButtonLink>
        </div>
      </div>
      <Photo
        src="/images/site/cta.jpg"
        alt="Ağaçlar arasında, bahçeli çağdaş bir ev"
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="aspect-[4/3] lg:aspect-auto lg:min-h-full"
      />
    </section>
  );
}
