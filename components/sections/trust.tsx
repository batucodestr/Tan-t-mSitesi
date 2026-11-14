import { BarChart3, FileText, ShieldCheck, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Profesyonel yönetim",
    text: "Operasyonun tamamını tek ekip yürütür. Size düşen, tek muhatabınızla iletişimde kalmaktır.",
  },
  {
    icon: BarChart3,
    title: "Gelir optimizasyonu",
    text: "Fiyatları talebe göre düzenli günceller, boş geceleri azaltmaya ve toplam geliri büyütmeye odaklanırız.",
  },
  {
    icon: Star,
    title: "Misafir memnuniyeti",
    text: "Hızlı iletişim ve özenli hazırlık iyi yorumları, iyi yorumlar da yeni rezervasyonları getirir.",
  },
  {
    icon: FileText,
    title: "Şeffaf raporlama",
    text: "Her ay gelirinizi, giderlerinizi ve net kazancınızı satır satır görürsünüz. Sürpriz kalem olmaz.",
  },
];

export function Trust() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Neler dahil" title="Baştan sona tam hizmet" align="center">
          Kısa dönem kiralama her gün yeniden yapılan bir işletmecilik işidir. Biz bu işi mülkünüz için üstleniyoruz; siz
          yalnızca sonuçları takip edin.
        </SectionHeading>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="reveal rounded-card border border-line bg-card p-7.5 transition-all duration-400 ease-soft hover:-translate-y-1 hover:border-line-strong hover:shadow-card"
            >
              <span aria-hidden className="mb-4.5 flex size-13 items-center justify-center rounded-[15px] bg-clay-tint">
                <Icon size={26} strokeWidth={1.8} className="text-clay-deep" />
              </span>
              <h3 className="text-[1.28rem]">{title}</h3>
              <p className="mt-2.5 text-[0.97rem] text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
