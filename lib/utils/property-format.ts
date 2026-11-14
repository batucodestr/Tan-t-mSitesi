import type { PmsProperty } from "@/lib/types/property";

const priceFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

const areaFormatter = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });

export function formatPrice(value: string): string {
  const amount = Number(value);
  return Number.isFinite(amount) ? priceFormatter.format(amount) : "—";
}

export function formatArea(value: string): string {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? `${areaFormatter.format(amount)} m²` : "—";
}

/** Turkish room notation: 0 bedrooms is a studio, 3 bedrooms is "3+1". */
export function roomLabel(bedrooms: number): string {
  return bedrooms <= 0 ? "Stüdyo" : `${bedrooms}+1`;
}

export function locationLabel(property: Pick<PmsProperty, "city" | "country">): string {
  return [property.city, property.country].filter(Boolean).join(", ");
}
