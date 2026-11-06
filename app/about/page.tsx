import type { Metadata } from "next";

import { OwnerCta } from "@/components/sections/owner-cta";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hakkımızda",
  description:
    "Hikâyemiz, misyonumuz ve değerlerimiz. Kısa dönem kiralık mülkleri ev sahipleri adına şeffaf süreçlerle ve otel titizliğiyle yönetiyoruz.",
  path: "/about",
});

const values = [
  {
    title: "Emanet bilinci",
    text: "Bize teslim edilen her anahtarın arkasında birinin emeği, birikimi ve anıları vardır. Her mülke bu bilinçle yaklaşırız.",
  },
  {
    title: "Açıklık",
    text: "İyi haberi de kötü haberi de zamanında ve olduğu gibi paylaşırız. Rakamları saklamayız, kararlarımızı gerekçesiyle anlatırız.",
  },
  {
    title: "Özen",
    text: "Misafirin hatırladığı şey çoğu zaman küçük bir ayrıntıdır: temiz bir havlu, zamanında gelen bir mesaj, yerli yerinde bir ev.",
  },
  {
    title: "Ölçülebilirlik",
    text: "Sezgilerimize değil, verilere güveniriz. Ne yaptığımızı ölçer, işe yaramayanı değiştiririz.",
  },
];

const approach = [
  {
    title: "Önce dinleriz",
    text: "Mülkünüzden ve kiralamadan beklentinizi anlamadan öneri sunmayız. Her ev sahibinin hedefi aynı değildir.",
  },
  {
    title: "Süreçle çalışırız",
    text: "Temizlikten misafir karşılamaya kadar her iş yazılı bir sürece bağlıdır. Böylece kalite, kimin görevli olduğuna göre değişmez.",
  },
  {
    title: "Düzenli hesap veririz",
    text: "Her ay rakamları önünüze koyar, neyin iyi gittiğini ve neyi değiştirmemiz gerektiğini birlikte konuşuruz.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="Hakkımızda" title="Evinize bir ev sahibi gibi, işinize bir işletmeci gibi bakıyoruz." />

      <Photo
        src="/images/site/about-istanbul.jpg"
        alt="Galata Kulesi ve çevresindeki tarihî binalarla İstanbul manzarası"
        sizes="100vw"
        preload
        className="aspect-[4/3] md:aspect-[21/9]"
        imageClassName="object-[center_60%]"
      />

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5 text-clay">Hikâyemiz</p>
              <h2 className="text-display-lg">Adımız, evin kalbinden geliyor.</h2>
            </div>
            <div className="reveal space-y-6 text-lg text-ink-soft lg:col-span-7 lg:pt-10">
              <p>
                Avlu, geleneksel Anadolu ve Ege evlerinde her şeyin etrafında döndüğü yerdir. Misafir orada karşılanır, sofra
                orada kurulur, ev sahibi kapısını orada açar. Biz de işimizi tam bu noktada görüyoruz: ev sahibi ile misafirin
                buluştuğu yerde.
              </p>
              <p>
                Bu işe basit bir gözlemle başladık. Güzel evlerin birçoğu, yalnızca işletilme biçimi yüzünden potansiyelinin
                altında kalıyordu. Geç yanıtlanan mesajlar, sezona uymayan fiyatlar, zamanı iyi planlanmamış temizlikler. Ev
                sahipleri ise bu işi bir yan uğraş olarak sürdürmekten yoruluyordu.
              </p>
              <p>
                Bir otelin disiplinini, bir evin sıcaklığıyla birleştiren bir yönetim anlayışı kurduk. Bugün ev sahiplerinin
                mülklerini güvenle bize bırakabilmesi ve misafirlerin bir sonraki seyahatlerinde yine aynı özeni araması için
                çalışıyoruz.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-espresso py-24 text-paper md:py-36">
        <Container>
          <p className="eyebrow mb-8 text-clay-light">Misyonumuz</p>
          <p className="reveal max-w-5xl font-display text-display-lg">
            Ev sahiplerinin mülklerinden zahmetsizce ve sürdürülebilir biçimde gelir elde etmesini, misafirlerin ise her
            konaklamada kendilerini iyi ağırlanmış hissetmesini sağlamak.
          </p>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <SectionHeading eyebrow="Değerlerimiz" title="Bizi yönlendiren dört ilke." />
          <dl className="mt-14 grid border-t border-ink/80 md:grid-cols-2">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`reveal border-b border-line py-9 md:py-12 ${index % 2 === 0 ? "md:pr-14" : "md:border-l md:pl-14"}`}
              >
                <dt className="text-display-md font-display">{value.title}</dt>
                <dd className="mt-4 max-w-lg text-ink-soft">{value.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-paper-deep py-24 md:py-36">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Photo
              src="/images/site/about-home.jpg"
              alt="Alacakaranlıkta ışıkları yanan çağdaş bir ev"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="reveal aspect-[4/3] lg:col-span-6 lg:aspect-[5/6]"
            />
            <div className="lg:col-span-6">
              <p className="eyebrow mb-5 text-clay">Profesyonel yaklaşımımız</p>
              <h2 className="text-display-lg">Nasıl çalıştığımız, ne yaptığımız kadar önemli.</h2>
              <ol className="mt-12 border-t border-ink/80">
                {approach.map((item, index) => (
                  <li key={item.title} className="reveal grid gap-x-6 border-b border-ink/15 py-7 sm:grid-cols-[3rem_1fr]">
                    <span aria-hidden className="font-display text-2xl text-clay">{index + 1}</span>
                    <div>
                      <h3 className="text-display-sm">{item.title}</h3>
                      <p className="mt-2 text-ink-soft">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <OwnerCta title="Mülkünüzü tanımak isteriz." />
    </>
  );
}
