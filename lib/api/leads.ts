import "server-only";

import { isPmsConfigured, pmsFetch } from "@/lib/api/client";
import type { ContactMessage, OwnerApplication } from "@/lib/types/lead";

/**
 * Delivers form submissions to the PMS. The endpoint paths are proposals to
 * agree with the Django API.
 *
 * With no PMS configured, development logs the payload so the forms can be
 * exercised. Production throws, which shows the user the error state with
 * alternative contact options rather than a success message for a lead that
 * nobody will receive.
 */
async function deliver(path: string, payload: unknown): Promise<void> {
  if (!isPmsConfigured() && process.env.NODE_ENV !== "production") {
    console.info(`[leads] PMS_API_URL is not set, would POST ${path}:`, payload);
    return;
  }

  await pmsFetch(path, { method: "POST", body: JSON.stringify(payload) });
}

export function sendOwnerApplication(application: OwnerApplication): Promise<void> {
  return deliver("/leads/owner-applications/", application);
}

export function sendContactMessage(message: ContactMessage): Promise<void> {
  return deliver("/leads/contact-messages/", message);
}
