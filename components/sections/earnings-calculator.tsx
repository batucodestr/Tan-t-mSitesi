"use client";

import { ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import {
  CITIES,
  districtsOf,
  estimate,
  featuresFor,
  ROOMS,
  roomLabelOf,
  type City,
  type Estimate,
} from "@/lib/data/earnings";
import { cn } from "@/lib/utils/cn";

const money = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });

/** Counts from the previous value to the new one; jumps straight there for reduced motion. */
function useCountUp(target: number | null, duration = 900): number | null {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target ?? 0);

  useEffect(() => {
    if (target === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = fromRef.current;
    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const progress = reduce ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = from + (target - from) * eased;
      setValue(next);
      fromRef.current = next;
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return target === null ? null : value;
}

function Pill({
  type,
  name,
  checked,
  onChange,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="cursor-pointer">
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={cn(
          "inline-flex min-h-10 items-center rounded-full border-[1.5px] px-4 text-[0.92rem] font-bold transition-all duration-200",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay",
          checked
            ? "border-clay bg-clay text-white shadow-[0_6px_18px_rgb(232_103_79/0.35)]"
            : "border-white/18 text-white/90 hover:border-white/45 hover:text-white",
        )}
      >
        {children}
      </span>
    </label>
  );
}

const legendClass = "mb-2.5 text-[0.74rem] font-bold uppercase tracking-[0.1em] text-white/60";
const controlClass =
  "h-12.5 w-full rounded-xl border-[1.5px] border-white/15 bg-white/6 px-4 text-base font-bold text-white outline-none transition-colors placeholder:font-medium placeholder:text-white/35 hover:border-white/30 focus:border-clay";

export function EarningsCalculator() {
  const uid = useId();
  const [city, setCity] = useState<City>("İstanbul");
  const [district, setDistrict] = useState(districtsOf("İstanbul")[0]);
  const [customDistrict, setCustomDistrict] = useState("");
  const [rooms, setRooms] = useState(1);
  const [features, setFeatures] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [result, setResult] = useState<Estimate | null>(null);
  const [calculating, setCalculating] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const resultRef = useRef<HTMLDivElement>(null);

  const districts = districtsOf(city);
  const availableFeatures = featuresFor(city);
  const input = { city, district: city === "Diğer" ? "" : district, rooms, features };

  // After the first calculation, the result follows every change live.
  const live = result ? estimate(input) : null;
  const monthly = useCountUp(live?.monthly ?? null);
  const nightly = useCountUp(live?.nightly ?? null);
  const occupancy = useCountUp(live?.occupancy ?? null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const chooseCity = (next: City) => {
    setCity(next);
    setDistrict(districtsOf(next)[0] ?? "");
    // Drop features that do not apply to the new city (Bosphorus view outside İstanbul).
    const allowed = new Set<string>(featuresFor(next).map((feature) => feature.value));
    setFeatures((current) => current.filter((feature) => allowed.has(feature)));
  };

  const toggleFeature = (value: string) =>
    setFeatures((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));

  const calculate = () => {
    setCalculating(true);
    window.clearTimeout(timer.current);
    // A short pause so the change of state is noticeable; the maths is instant.
    timer.current = window.setTimeout(() => {
      setResult(estimate(input));
      setCalculating(false);
      // On phones the result sits below the form; bring it into view if it is off-screen.
      const panel = resultRef.current;
      if (panel && panel.getBoundingClientRect().top > window.innerHeight * 0.6) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        panel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    }, 700);
  };

  const place = city === "Diğer" ? customDistrict.trim() || "Diğer şehir" : district === "Diğer" ? `${city}` : `${district}`;
  const summary = `${place} ${roomLabelOf(rooms)}`;
  const location = city === "Diğer" ? customDistrict.trim() : district === "Diğer" ? city : `${district}, ${city}`;
  const details = [
    `Kazanç hesaplayıcı: ${roomLabelOf(rooms)}`,
    features.length ? features.join(", ") : "",
    live ? `tahmini aylık gelir ${money.format(live.monthly)}` : "",
    note.trim(),
  ]
    .filter(Boolean)
    .join(" · ");
  const offerHref = `/list-your-property?${new URLSearchParams({ konum: location, bilgi: details }).toString()}`;

  return (
    <section id="kazanc" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-[1240px] overflow-hidden rounded-panel shadow-lift lg:grid-cols-[1.05fr_1fr]">
        {/* Form */}
        <div className="bg-[linear-gradient(135deg,#26201b,#3a2e25)] px-6 py-10 sm:px-10 md:px-13 md:py-13">
          <p className="eyebrow text-white">Kazanç hesaplayıcı</p>
          <h2 className="mt-3.5 text-display-lg text-white">Eviniz ne kadar kazandırır?</h2>
          <p className="mt-3 max-w-lg text-[0.97rem] leading-relaxed text-white/70">
            Konum, oda sayısı ve özelliklere göre evinizin kısa dönem kiralamadaki aylık gelir potansiyelini anında tahmin
            edin.
          </p>

          <div className="mt-8 space-y-6">
            <fieldset>
              <legend className={legendClass}>Şehir</legend>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((option) => (
                  <Pill key={option} type="radio" name={`${uid}-city`} checked={city === option} onChange={() => chooseCity(option)}>
                    {option}
                  </Pill>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor={`${uid}-district`} className={cn(legendClass, "block")}>İlçe</label>
              {city === "Diğer" ? (
                <input
                  id={`${uid}-district`}
                  value={customDistrict}
                  onChange={(event) => setCustomDistrict(event.target.value)}
                  maxLength={80}
                  placeholder="Örn. Ayvalık, Balıkesir"
                  className={controlClass}
                />
              ) : (
                <select
                  id={`${uid}-district`}
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                  className={cn(
                    controlClass,
                    "cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20fill=%22none%22%20stroke=%22%23ffffff%22%20stroke-width=%222%22%20viewBox=%220%200%2024%2024%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-11",
                  )}
                >
                  {districts.map((option) => (
                    <option key={option} value={option} className="bg-ink text-white">
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <fieldset>
              <legend className={legendClass}>Oda sayısı</legend>
              <div className="flex flex-wrap gap-2">
                {ROOMS.map((option) => (
                  <Pill key={option.value} type="radio" name={`${uid}-rooms`} checked={rooms === option.value} onChange={() => setRooms(option.value)}>
                    {option.label}
                  </Pill>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={legendClass}>Özellikler</legend>
              <div className="flex flex-wrap gap-2">
                {availableFeatures.map((feature) => (
                  <Pill
                    key={feature.value}
                    type="checkbox"
                    name={`${uid}-features`}
                    checked={features.includes(feature.value)}
                    onChange={() => toggleFeature(feature.value)}
                  >
                    {feature.value}
                  </Pill>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor={`${uid}-note`} className={cn(legendClass, "block")}>Eklemek istedikleriniz (isteğe bağlı)</label>
              <input
                id={`${uid}-note`}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength={300}
                placeholder="Örn. yeni tadilat, teras, merkezi konum…"
                className={controlClass}
              />
            </div>

            <button
              type="button"
              onClick={calculate}
              disabled={calculating}
              className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-clay px-7 text-[1.02rem] font-extrabold text-white shadow-[0_14px_34px_rgb(232_103_79/0.4)] transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-clay-deep disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
            >
              <Calculator aria-hidden size={19} strokeWidth={2.4} />
              {calculating ? "Hesaplanıyor…" : result ? "Yeniden Hesapla" : "Kazancımı Hesapla"}
            </button>
          </div>
        </div>

        {/* Result */}
        <div ref={resultRef} className="relative flex scroll-mt-24 flex-col justify-center overflow-hidden bg-clay px-6 py-12 text-white sm:px-10 md:px-13">
          <span aria-hidden className="pointer-events-none absolute -right-18 -top-22 size-70 rounded-full bg-white/10" />
          <span aria-hidden className="pointer-events-none absolute -bottom-28 -left-16 size-56 rounded-full bg-black/5" />

          <div aria-live="polite" className={cn("relative transition-opacity duration-300", calculating && "opacity-40")}>
            <p className="text-[0.82rem] font-bold uppercase tracking-[0.06em] text-white/85">Aylık tahmini geliriniz</p>
            <p className="mt-2 font-display text-[clamp(2.8rem,5.4vw,4.2rem)] font-semibold leading-none tabular-nums">
              {monthly === null ? "₺—" : money.format(monthly)}
            </p>
            <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-white/90">
              {live
                ? live.seasonal
                  ? `${summary} için yıllık ortalama tahmin; yazın talep yükselir, sezon dışında düşer.`
                  : `${summary} için yıllık ortalama tahmin; şehirde talep yıl boyunca daha dengelidir.`
                : "Bilgileri seçip “Kazancımı Hesapla”ya dokunun, tahmini aylık geliriniz burada görünsün."}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="sr-only">Ortalama doluluk oranı</dt>
                <dd className="font-display text-[1.9rem] font-semibold leading-none tabular-nums">
                  {occupancy === null ? "%—" : `%${Math.round(occupancy)}`}
                </dd>
                <dd aria-hidden className="mt-2 text-[0.82rem] text-white/80">Ortalama doluluk oranı</dd>
              </div>
              <div>
                <dt className="sr-only">Ortalama gecelik fiyat</dt>
                <dd className="font-display text-[1.9rem] font-semibold leading-none tabular-nums">
                  {nightly === null ? "₺—" : money.format(nightly)}
                </dd>
                <dd aria-hidden className="mt-2 text-[0.82rem] text-white/80">Ortalama gecelik fiyat</dd>
              </div>
            </dl>

            <Link
              href={offerHref}
              className="mt-9 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-white px-7 font-extrabold text-clay-deep shadow-[0_12px_30px_rgb(0_0_0/0.14)] transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-ink hover:text-white"
            >
              Hemen Teklif Al
              <ArrowRight aria-hidden size={18} strokeWidth={2.4} />
            </Link>
            <p className="mt-4 text-[0.78rem] leading-relaxed text-white/75">
              * Brüt kira geliri tahminidir; komisyon ve işletme giderleri dahil değildir. Konum, sezon ve mülk kalitesine
              göre değişir. Kesin teklif için ekibimizle görüşün.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
