import type { PmsProperty } from "@/lib/types/property";

export const roomOptions = [
  { value: "", label: "Tüm odalar" },
  { value: "0", label: "Stüdyo" },
  { value: "1", label: "1+1" },
  { value: "2", label: "2+1" },
  { value: "3", label: "3+1 ve üzeri" },
] as const;

export const sortOptions = [
  { value: "", label: "En yeniler" },
  { value: "price-asc", label: "Fiyat: artan" },
  { value: "price-desc", label: "Fiyat: azalan" },
  { value: "guests-desc", label: "Kapasite: en geniş" },
] as const;

export const guestOptions = [1, 2, 3, 4, 5, 6, 8, 10] as const;

export interface PropertyFilters {
  city: string;
  rooms: string;
  guests: number;
  sort: string;
}

type RawParams = { [key: string]: string | string[] | undefined };

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

/** Reads the query string, ignoring anything unexpected. */
export function parseFilters(params: RawParams): PropertyFilters {
  const rooms = first(params.oda);
  const sort = first(params.sirala);
  const guests = Number.parseInt(first(params.misafir), 10);

  return {
    city: first(params.sehir).slice(0, 100),
    rooms: roomOptions.some((option) => option.value === rooms) ? rooms : "",
    guests: Number.isFinite(guests) && guests > 0 && guests <= 50 ? guests : 0,
    sort: sortOptions.some((option) => option.value === sort) ? sort : "",
  };
}

export function hasActiveFilters(filters: PropertyFilters): boolean {
  return Boolean(filters.city || filters.rooms || filters.guests);
}

/** Cities always offered in the filter, even before any home is listed there. */
export const FIXED_CITIES = ["İstanbul", "Muğla", "İzmir", "Antalya", "Aydın"] as const;

/**
 * The fixed cities first, then any other city a PMS home is in (sorted the
 * Turkish way). Matching ignores case, so "izmir" in the PMS does not add a
 * second İzmir.
 */
export function citiesOf(properties: PmsProperty[]): string[] {
  const key = (city: string) => city.trim().toLocaleLowerCase("tr");
  const fixed = new Set(FIXED_CITIES.map(key));
  const extra = new Map<string, string>();
  for (const property of properties) {
    const city = property.city.trim();
    if (city && !fixed.has(key(city)) && !extra.has(key(city))) extra.set(key(city), city);
  }
  return [...FIXED_CITIES, ...[...extra.values()].sort((a, b) => a.localeCompare(b, "tr"))];
}

export function applyFilters(properties: PmsProperty[], filters: PropertyFilters): PmsProperty[] {
  const city = filters.city.toLocaleLowerCase("tr");

  const result = properties.filter((property) => {
    if (city && property.city.trim().toLocaleLowerCase("tr") !== city) return false;
    if (filters.rooms) {
      const wanted = Number(filters.rooms);
      if (wanted === 3 ? property.bedroom_count < 3 : property.bedroom_count !== wanted) return false;
    }
    if (filters.guests && property.max_guests < filters.guests) return false;
    return true;
  });

  const price = (property: PmsProperty) => Number(property.base_price) || 0;
  switch (filters.sort) {
    case "price-asc":
      return result.sort((a, b) => price(a) - price(b));
    case "price-desc":
      return result.sort((a, b) => price(b) - price(a));
    case "guests-desc":
      return result.sort((a, b) => b.max_guests - a.max_guests);
    default:
      // The PMS already returns newest first.
      return result;
  }
}
