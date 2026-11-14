import { Container } from "@/components/ui/container";

/**
 * Dark band under the hero. The home count is read live from the PMS; the
 * other items describe the service and contain no invented figures.
 */
export function StatsBar({ homeCount }: { homeCount: number | null }) {
  const stats = [
    ...(homeCount && homeCount > 0 ? [{ value: String(homeCount), unit: "", label: "Yönetilen ev" }] : []),
    { value: "7/24", unit: "", label: "Misafir iletişimi" },
    { value: "0", unit: "₺", label: "Kurulum ücreti" },
    { value: "2", unit: "+", label: "Satış kanalı" },
    { value: "1", unit: "", label: "Tek muhatap" },
  ];

  return (
    <section aria-label="Kısaca biz" className="bg-ink text-white">
      <Container>
        <dl className={`grid grid-cols-2 gap-y-8 py-10 md:py-11 ${stats.length === 5 ? "sm:grid-cols-3 lg:grid-cols-5" : "sm:grid-cols-4"}`}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-2 text-center ${index > 0 ? (stats.length === 5 ? "border-white/10 lg:border-l" : "border-white/10 sm:border-l") : ""}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-none">
                  {stat.value}
                  <span className="text-clay">{stat.unit}</span>
                </span>
                <span aria-hidden className="mt-2.5 block text-[0.82rem] font-medium leading-snug text-white/60">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
