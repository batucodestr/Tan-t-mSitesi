import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";

const reasons = [
  {
    title: "Operasyonel uzmanlık",
    text: "Giriş ve çıkıştan temizliğe, her adımı yazılı süreçler ve kontrol listeleriyle yürütürüz. Kalite kişiye değil, sisteme bağlıdır.",
  },
  {
    title: "Şeffaf süreçler",
    text: "Neyin ne kadara mal olduğunu, hangi kararın neden alındığını bilirsiniz. Belirlenen tutarın üzerindeki harcamalar size sorulmadan yapılmaz.",
  },
  {
    title: "Gelir odaklı yaklaşım",
    text: "Başarıyı yalnızca dolulukla değil, mülkünüzün yılın sonunda bıraktığı net gelirle ölçeriz.",
  },
  {
    title: "Profesyonel misafirperverlik",
    text: "Misafire otelde beklediği özeni, evin sıcaklığıyla sunarız. Mülkünüzün itibarı her yorumda yeniden yazılır.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Photo
              src="/images/site/why.jpg"
              alt="Doğal dokularla döşenmiş, bitkilerle çevrili sıcak bir oturma odası"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="reveal aspect-[4/3] rounded-panel lg:sticky lg:top-28 lg:aspect-[4/5]"
            />
          </div>

          <div className="lg:col-span-6 lg:pt-10">
            <p className="eyebrow mb-4 text-clay-deep">Neden Avlu</p>
            <h2 className="text-display-lg">Mülkünüz bize bir emanettir.</h2>
            <dl className="mt-10 space-y-3">
              {reasons.map((reason) => (
                <div key={reason.title} className="reveal rounded-card border border-line bg-card px-6 py-6 lg:px-7">
                  <dt className="font-display text-[1.35rem] font-semibold">{reason.title}</dt>
                  <dd className="mt-2 text-[0.98rem] text-ink-soft">{reason.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
