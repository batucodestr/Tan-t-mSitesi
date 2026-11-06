export const PROPERTY_TYPE_OPTIONS = [
  "Daire",
  "Villa",
  "Müstakil ev",
  "Rezidans",
  "Taş ev",
  "Apart / butik otel",
  "Diğer",
] as const;

export const PROPERTY_COUNT_OPTIONS = ["1", "2 – 5", "6 – 10", "10'dan fazla"] as const;

export const CONTACT_TOPIC_OPTIONS = [
  "Mülk yönetimi",
  "Fiyatlandırma",
  "İş birliği",
  "Diğer",
] as const;

export interface OwnerApplication {
  fullName: string;
  email: string;
  phone: string;
  propertyLocation: string;
  propertyType: string;
  propertyCount: string;
  additionalInfo: string;
  consent: boolean;
}

export interface ContactMessage {
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
}

export type FieldErrors<Field extends string> = Partial<Record<Field, string>>;

export type OwnerApplicationField = keyof OwnerApplication;
export type ContactMessageField = keyof ContactMessage;

/** Result of a form Server Action, also used as the form's useActionState state. */
export interface LeadFormState<Field extends string> {
  status: "idle" | "success" | "error";
  /** Set when a valid submission could not be delivered. */
  deliveryFailed?: boolean;
  fieldErrors?: FieldErrors<Field>;
  /** Submitted values, returned so that fields can be restored after a failure. */
  values?: Partial<Record<Field, string>>;
}
