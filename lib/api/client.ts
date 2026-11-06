import "server-only";

/** Thin server-side client for the PMS REST API. */

export class PmsNotConfiguredError extends Error {
  constructor() {
    super("PMS_API_URL is not set");
    this.name = "PmsNotConfiguredError";
  }
}

export function isPmsConfigured(): boolean {
  return Boolean(process.env.PMS_API_URL);
}

export async function pmsFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.PMS_API_URL;
  if (!baseUrl) throw new PmsNotConfiguredError();

  const token = process.env.PMS_API_TOKEN;
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...init.headers,
    },
    signal: init.signal ?? AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`PMS request failed: ${response.status} ${path}`);
  }

  // Django REST Framework answers some writes with an empty body (204).
  const body = await response.text();
  return (body ? JSON.parse(body) : undefined) as T;
}
