/** A property as exposed by the PMS public endpoint `/public/properties/`. */
export interface PmsProperty {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  max_guests: number;
  bedroom_count: number;
  bed_count: number;
  bathroom_count: number;
  /** DRF serialises decimals as strings, for example "120.50". */
  area: string;
  base_price: string;
  /** Path on the PMS host, for example "/media/property_images/<id>/a.jpg", or null. */
  image: string | null;
  image_alt: string;
  created_at: string;
  updated_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
