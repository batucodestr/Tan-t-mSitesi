"use server";

import { sendContactMessage, sendOwnerApplication } from "@/lib/api/leads";
import type {
  ContactMessageField,
  FieldErrors,
  LeadFormState,
  OwnerApplicationField,
} from "@/lib/types/lead";
import { validateContactMessage, validateOwnerApplication } from "@/lib/validation/leads";

const MAX_FIELD_LENGTH = 2000;

function readFields<Field extends string>(data: FormData, fields: readonly Field[]) {
  const values = {} as Record<Field, string>;
  for (const field of fields) {
    values[field] = String(data.get(field) ?? "").trim().slice(0, MAX_FIELD_LENGTH);
  }
  return values;
}

async function handleSubmission<Field extends string>(
  data: FormData,
  fields: readonly Field[],
  validate: (data: FormData) => FieldErrors<Field>,
  send: (values: Record<Field, string>) => Promise<void>,
): Promise<LeadFormState<Field>> {
  // Bots fill the hidden field. Report success and discard the submission.
  if (data.get("website")) return { status: "success" };

  const values = readFields(data, fields);
  const fieldErrors = validate(data);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  try {
    await send(values);
    return { status: "success" };
  } catch (error) {
    console.error("[leads] delivery failed:", error);
    return { status: "error", deliveryFailed: true, values };
  }
}

const OWNER_FIELDS = [
  "fullName",
  "email",
  "phone",
  "propertyLocation",
  "propertyType",
  "propertyCount",
  "additionalInfo",
] as const satisfies readonly OwnerApplicationField[];

export async function submitOwnerApplication(
  _previous: LeadFormState<OwnerApplicationField>,
  data: FormData,
): Promise<LeadFormState<OwnerApplicationField>> {
  return handleSubmission<OwnerApplicationField>(
    data,
    OWNER_FIELDS,
    validateOwnerApplication,
    (values) =>
      sendOwnerApplication({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        propertyLocation: values.propertyLocation,
        propertyType: values.propertyType,
        propertyCount: values.propertyCount,
        additionalInfo: values.additionalInfo,
        consent: true,
      }),
  );
}

const CONTACT_FIELDS = [
  "fullName",
  "email",
  "phone",
  "topic",
  "message",
] as const satisfies readonly ContactMessageField[];

export async function submitContactMessage(
  _previous: LeadFormState<ContactMessageField>,
  data: FormData,
): Promise<LeadFormState<ContactMessageField>> {
  return handleSubmission<ContactMessageField>(
    data,
    CONTACT_FIELDS,
    validateContactMessage,
    (values) =>
      sendContactMessage({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        topic: values.topic,
        message: values.message,
        consent: true,
      }),
  );
}
