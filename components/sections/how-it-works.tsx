import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    title: "Mülkünüzü iletin",
    text: "Kısa formu doldurun ve mülkünüzü birkaç satırla anlatın.",
  },
  {
    title: "Mülk değerlendirmesi",
    text: "Konumu, talebi ve benzer mülkleri inceler, gerçekçi bir gelir beklentisini sizinle paylaşırız.",
  },
  {
    title: "Hazırlık ve yayın",
    text: "Sözleşme, izin süreci, fotoğraf çekimi ve ilan hazırlığını tamamlar, mülkünüzü yayına alırız.",
  },
  {
    title: "Profesyonel yönetim",
    text: "Misafirden temizliğe her şeyi biz yönetiriz. Siz her ay raporunuzu ve kazancınızı alırsınız.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-espresso py-24 text-paper md:py-36">
      <Container>
        <SectionHeading eyebrow="Nasıl çalışıyoruz" title="Dört adımda profesyonel yönetime geçin." tone="light" />

        <ol className="mt-16 grid gap-y-12 border-t border-espresso-line md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="reveal relative pt-8 md:pr-10">
              <span aria-hidden className="absolute -top-px left-0 h-px w-12 bg-clay-light" />
              <span aria-hidden className="block font-display text-7xl leading-none text-clay-light md:text-8xl">
                {index + 1}
              </span>
              <h3 className="mt-8 text-[1.75rem]">{step.title}</h3>
              <p className="mt-3 text-sand">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
