import { CalendarCheck, Camera, ClipboardList, KeyRound } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    icon: ClipboardList,
    title: "Mülkünüzü iletin",
    text: "Kısa formu doldurun ve mülkünüzü birkaç satırla anlatın.",
  },
  {
    icon: CalendarCheck,
    title: "Mülk değerlendirmesi",
    text: "Konumu, talebi ve benzer mülkleri inceler, gerçekçi bir gelir beklentisini sizinle paylaşırız.",
  },
  {
    icon: Camera,
    title: "Hazırlık ve yayın",
    text: "Sözleşme, izin süreci, fotoğraf çekimi ve ilan hazırlığını tamamlar, mülkünüzü yayına alırız.",
  },
  {
    icon: KeyRound,
    title: "Profesyonel yönetim",
    text: "Misafirden temizliğe her şeyi biz yönetiriz. Siz her ay raporunuzu ve kazancınızı alırsınız.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Nasıl çalışıyoruz" title="Dört adımda, zahmetsiz gelir" align="center">
          Siz anahtarı verin, gerisini biz halledelim. Kurulumdan misafir ağırlamaya kadar tüm süreç bizde.
        </SectionHeading>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="reveal relative overflow-hidden rounded-card border border-line bg-card px-7 py-8 transition-all duration-400 ease-soft hover:-translate-y-1 hover:shadow-card"
            >
              <span aria-hidden className="absolute right-6 top-5 font-display text-[3.4rem] font-semibold leading-[0.8] text-clay-soft">
                {index + 1}
              </span>
              <span aria-hidden className="mb-5 flex size-13.5 items-center justify-center rounded-2xl bg-ink">
                <Icon size={26} strokeWidth={1.8} className="text-white" />
              </span>
              <h3 className="text-[1.35rem]">{title}</h3>
              <p className="mt-2.5 text-[0.98rem] text-ink-soft">{text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
