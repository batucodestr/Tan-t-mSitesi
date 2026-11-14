/**
 * Earnings estimator for the homepage calculator.
 *
 * A transparent rule-based model, not market data: nightly rate = city base
 * × district factor × room factor × feature factors, and occupancy depends on
 * whether the area is seasonal (coast) or year-round (city). Every number
 * below is a placeholder to calibrate against your own portfolio before launch.
 */

export const CITIES = ["İstanbul", "İzmir", "Muğla", "Antalya", "Diğer"] as const;
export type City = (typeof CITIES)[number];

/** Average nightly rate in TRY for a 1+1 in an average district. */
const CITY_BASE: Record<City, number> = {
  İstanbul: 3600,
  İzmir: 3000,
  Muğla: 4200,
  Antalya: 3600,
  Diğer: 2500,
};

/** District price factor and whether demand is seasonal there. */
interface District {
  name: string;
  factor: number;
  seasonal: boolean;
}

const OTHER_DISTRICT = "Diğer";

export const DISTRICTS: Record<Exclude<City, "Diğer">, District[]> = {
  İstanbul: [
    { name: "Beşiktaş", factor: 1.1, seasonal: false },
    { name: "Bebek", factor: 1.3, seasonal: false },
    { name: "Nişantaşı", factor: 1.15, seasonal: false },
    { name: "Şişli", factor: 1.0, seasonal: false },
    { name: "Beyoğlu", factor: 1.05, seasonal: false },
    { name: "Cihangir", factor: 1.1, seasonal: false },
    { name: "Galata", factor: 1.1, seasonal: false },
    { name: "Kadıköy", factor: 1.02, seasonal: false },
    { name: "Moda", factor: 1.08, seasonal: false },
    { name: "Üsküdar", factor: 0.98, seasonal: false },
    { name: "Sarıyer", factor: 1.08, seasonal: false },
    { name: "Fatih", factor: 0.92, seasonal: false },
    { name: OTHER_DISTRICT, factor: 0.85, seasonal: false },
  ],
  İzmir: [
    { name: "Alsancak", factor: 1.05, seasonal: false },
    { name: "Konak", factor: 0.95, seasonal: false },
    { name: "Karşıyaka", factor: 0.95, seasonal: false },
    { name: "Bornova", factor: 0.88, seasonal: false },
    { name: "Çeşme", factor: 1.25, seasonal: true },
    { name: "Alaçatı", factor: 1.32, seasonal: true },
    { name: "Urla", factor: 1.15, seasonal: true },
    { name: "Seferihisar", factor: 0.95, seasonal: true },
    { name: "Foça", factor: 1.0, seasonal: true },
    { name: OTHER_DISTRICT, factor: 0.85, seasonal: false },
  ],
  Muğla: [
    { name: "Bodrum", factor: 1.25, seasonal: true },
    { name: "Yalıkavak", factor: 1.4, seasonal: true },
    { name: "Türkbükü", factor: 1.45, seasonal: true },
    { name: "Göcek", factor: 1.3, seasonal: true },
    { name: "Fethiye", factor: 1.0, seasonal: true },
    { name: "Ölüdeniz", factor: 1.08, seasonal: true },
    { name: "Marmaris", factor: 0.95, seasonal: true },
    { name: "Datça", factor: 1.05, seasonal: true },
    { name: "Dalyan", factor: 0.95, seasonal: true },
    { name: "Akyaka", factor: 1.0, seasonal: true },
    { name: OTHER_DISTRICT, factor: 0.85, seasonal: true },
  ],
  Antalya: [
    { name: "Kaleiçi", factor: 1.05, seasonal: true },
    { name: "Konyaaltı", factor: 1.0, seasonal: true },
    { name: "Lara", factor: 1.05, seasonal: true },
    { name: "Kaş", factor: 1.2, seasonal: true },
    { name: "Kalkan", factor: 1.3, seasonal: true },
    { name: "Belek", factor: 1.1, seasonal: true },
    { name: "Side", factor: 0.98, seasonal: true },
    { name: "Alanya", factor: 0.9, seasonal: true },
    { name: "Kemer", factor: 0.95, seasonal: true },
    { name: OTHER_DISTRICT, factor: 0.85, seasonal: true },
  ],
};

export const ROOMS = [
  { value: 0, label: "Stüdyo", factor: 0.75 },
  { value: 1, label: "1+1", factor: 1 },
  { value: 2, label: "2+1", factor: 1.3 },
  { value: 3, label: "3+1", factor: 1.6 },
  { value: 4, label: "4+1", factor: 1.9 },
] as const;

export const FEATURES = [
  { value: "Boğaz Manzarası", factor: 1.15, onlyIn: "İstanbul" as City },
  { value: "Deniz Manzarası", factor: 1.1 },
  { value: "Bahçe", factor: 1.04 },
  { value: "Asansör", factor: 1.02 },
  { value: "Havuz", factor: 1.15 },
] as const;

/** Features never add more than this much on top of the base rate. */
const MAX_FEATURE_FACTOR = 1.4;

export interface EstimateInput {
  city: City;
  district: string;
  rooms: number;
  features: readonly string[];
}

export interface Estimate {
  nightly: number;
  /** Average yearly occupancy, 0–100. */
  occupancy: number;
  /** Average monthly gross rental income, before commission and costs. */
  monthly: number;
  seasonal: boolean;
}

export function districtsOf(city: City): string[] {
  return city === "Diğer" ? [] : DISTRICTS[city].map((district) => district.name);
}

export function featuresFor(city: City) {
  return FEATURES.filter((feature) => !("onlyIn" in feature) || feature.onlyIn === city);
}

function findDistrict(city: City, name: string): District | undefined {
  return city === "Diğer" ? undefined : DISTRICTS[city].find((district) => district.name === name);
}

export function estimate({ city, district, rooms, features }: EstimateInput): Estimate {
  const area = findDistrict(city, district);
  const room = ROOMS.find((option) => option.value === rooms) ?? ROOMS[1];
  const available = featuresFor(city);
  const picked = available.filter((feature) => features.includes(feature.value));

  const featureFactor = Math.min(
    MAX_FEATURE_FACTOR,
    picked.reduce((total, feature) => total * feature.factor, 1),
  );
  const nightly = CITY_BASE[city] * (area?.factor ?? 1) * room.factor * featureFactor;

  // Coastal homes fill up in summer and empty out in winter; city homes are steadier.
  // Larger homes fill a little less often than small ones.
  const seasonal = area?.seasonal ?? (city === "Muğla" || city === "Antalya");
  const extras = Math.min(picked.length, 3) * 0.01;
  const occupancy = seasonal
    ? clamp(0.55 + extras - Math.max(0, rooms - 2) * 0.01, 0.5, 0.62)
    : clamp(0.72 + extras - Math.max(0, rooms - 1) * 0.015, 0.62, 0.78);

  const roundedNightly = Math.round(nightly / 10) * 10;
  return {
    nightly: roundedNightly,
    occupancy: Math.round(occupancy * 100),
    monthly: Math.round((roundedNightly * occupancy * 30) / 100) * 100,
    seasonal,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function roomLabelOf(rooms: number): string {
  return ROOMS.find((option) => option.value === rooms)?.label ?? `${rooms}+1`;
}
