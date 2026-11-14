/**
 * Serves PMS property photographs from this site's origin, so the PMS host
 * (often only reachable on the server's network) never has to be public.
 * Only files under media/property_images/ are reachable through it.
 */

const SAFE_SEGMENT = /^[\p{L}\p{N}_.\- ()]+$/u;
const ONE_DAY = 60 * 60 * 24;

function mediaBaseUrl(): string | null {
  const explicit = process.env.PMS_MEDIA_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const api = process.env.PMS_API_URL;
  if (!api) return null;
  try {
    // Default: same host as the API, where the PMS nginx serves /media/.
    return `${new URL(api).origin}/media`;
  } catch {
    return null;
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const base = mediaBaseUrl();

  const valid =
    path.length >= 2 &&
    path[0] === "property_images" &&
    path.every((segment) => segment !== "." && segment !== ".." && SAFE_SEGMENT.test(segment));

  if (!base || !valid) return new Response("Not found", { status: 404 });

  try {
    const upstream = await fetch(`${base}/${path.map(encodeURIComponent).join("/")}`, {
      signal: AbortSignal.timeout(10_000),
      // Images can exceed the data cache's size limit; browsers cache them via the header below.
      cache: "no-store",
    });
    const contentType = upstream.headers.get("content-type") ?? "";
    if (!upstream.ok || !contentType.startsWith("image/")) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": `public, max-age=${ONE_DAY}, stale-while-revalidate=${ONE_DAY * 7}`,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Bad gateway", { status: 502 });
  }
}
