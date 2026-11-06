import { BarChart3, FileText, ShieldCheck, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

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
    <section className="py-24 md:py-36">
      <Container>
        <div className="reveal grid gap-8 lg:grid-cols-12">
          <h2 className="text-display-lg lg:col-span-8">
            Kısa dönem kiralama, her gün yeniden yapılan bir işletmecilik işidir.
          </h2>
          <p className="text-lg text-ink-soft lg:col-span-4 lg:self-end">
            Biz bu işi mülkünüz için üstleniyoruz. Siz de tüm ayrıntılarla uğraşmadan sonuçları takip ediyorsunuz.
          </p>
        </div>

        <ul className="mt-16 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className={cn(
                "reveal border-b border-line py-8 lg:border-b-0",
                index % 2 === 0 ? "sm:pr-7" : "sm:border-l sm:pl-7 lg:pr-7",
                index === 2 && "lg:border-l lg:pl-7",
                index === 3 && "lg:pr-0",
              )}
            >
              <Icon aria-hidden size={26} strokeWidth={1.1} className="text-clay" />
              <h3 className="mt-8 text-[1.75rem]">{title}</h3>
              <p className="mt-3 text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
