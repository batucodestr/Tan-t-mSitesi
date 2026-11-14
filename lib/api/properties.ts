import "server-only";

import { isPmsConfigured, pmsFetch } from "@/lib/api/client";
import type { Paginated, PmsProperty } from "@/lib/types/property";

/**
 * Homes come straight from the PMS (the same Docker Postgres the PMS panel
 * writes to), through its read-only public endpoint. A home added or edited
 * in the PMS shows up here once the short cache below expires.
 */
const REVALIDATE_SECONDS = 30;
const PAGE_SIZE = 100;
/** Hard stop so a misbehaving API can never loop forever. */
const MAX_PAGES = 20;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type PropertiesResult =
  | { status: "ok"; properties: PmsProperty[] }
  | { status: "unavailable"; properties: [] };

/** Every active home, newest first. Never throws: failures return "unavailable". */
export async function getProperties(): Promise<PropertiesResult> {
  if (!isPmsConfigured()) return { status: "unavailable", properties: [] };

  try {
    const properties: PmsProperty[] = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
      const data = await pmsFetch<Paginated<PmsProperty>>(
        `/public/properties/?page=${page}&page_size=${PAGE_SIZE}`,
        { next: { revalidate: REVALIDATE_SECONDS } },
      );
      properties.push(...data.results);
      if (!data.next) break;
    }
    return { status: "ok", properties };
  } catch (error) {
    console.error("[properties] PMS list request failed:", error);
    return { status: "unavailable", properties: [] };
  }
}

/**
 * One home by id. Returns null when it does not exist or is inactive (404),
 * and "unavailable" when the PMS cannot be reached.
 */
export async function getProperty(id: string): Promise<PmsProperty | null | "unavailable"> {
  if (!UUID.test(id)) return null;
  if (!isPmsConfigured()) return "unavailable";

  try {
    return await pmsFetch<PmsProperty>(`/public/properties/${id}/`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    if (error instanceof Error && / 404 /.test(error.message)) return null;
    console.error("[properties] PMS detail request failed:", error);
    return "unavailable";
  }
}

/**
 * Turns the PMS media path into a URL on this site. Images are served by the
 * /pms-media proxy, so the PMS host never has to be reachable from browsers.
 */
export function propertyImageUrl(property: Pick<PmsProperty, "image">): string | null {
  const prefix = "/media/";
  if (!property.image?.startsWith(prefix)) return null;
  return `/pms-media/${property.image.slice(prefix.length)}`;
}
