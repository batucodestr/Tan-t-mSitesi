import {
  CONTACT_TOPIC_OPTIONS,
  PROPERTY_COUNT_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  type ContactMessageField,
  type FieldErrors,
  type OwnerApplicationField,
} from "@/lib/types/lead";

/** Validation rules shared by the browser and the Server Actions. */

const MESSAGES = {
  fullName: "Lütfen adınızı ve soyadınızı yazın.",
  email: "Lütfen geçerli bir e-posta adresi yazın.",
  phone: "Lütfen geçerli bir telefon numarası yazın.",
  propertyLocation: "Lütfen mülkünüzün bulunduğu il ve ilçeyi yazın.",
  propertyType: "Lütfen mülk türünü seçin.",
  propertyCount: "Lütfen mülk sayısını seçin.",
  topic: "Lütfen bir konu seçin.",
  message: "Lütfen mesajınızı yazın.",
  consent: "Devam etmek için aydınlatma metnini onaylamanız gerekiyor.",
};

const text = (data: FormData, name: string) => String(data.get(name) ?? "").trim();

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/** Accepts Turkish and international numbers: 10 to 15 digits, common separators. */
export function isPhone(value: string): boolean {
  if (!/^[+\d][\d\s().-]*$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

const isFullName = (value: string) => value.length >= 3 && /\p{L}/u.test(value);

export function validateOwnerApplication(data: FormData): FieldErrors<OwnerApplicationField> {
  const errors: FieldErrors<OwnerApplicationField> = {};

  if (!isFullName(text(data, "fullName"))) errors.fullName = MESSAGES.fullName;
  if (!isEmail(text(data, "email"))) errors.email = MESSAGES.email;
  if (!isPhone(text(data, "phone"))) errors.phone = MESSAGES.phone;
  if (text(data, "propertyLocation").length < 2) errors.propertyLocation = MESSAGES.propertyLocation;
  if (!(PROPERTY_TYPE_OPTIONS as readonly string[]).includes(text(data, "propertyType"))) {
    errors.propertyType = MESSAGES.propertyType;
  }
  if (!(PROPERTY_COUNT_OPTIONS as readonly string[]).includes(text(data, "propertyCount"))) {
    errors.propertyCount = MESSAGES.propertyCount;
  }
  if (!data.get("consent")) errors.consent = MESSAGES.consent;

  return errors;
}

export function validateContactMessage(data: FormData): FieldErrors<ContactMessageField> {
  const errors: FieldErrors<ContactMessageField> = {};
  const phone = text(data, "phone");

  if (!isFullName(text(data, "fullName"))) errors.fullName = MESSAGES.fullName;
  if (!isEmail(text(data, "email"))) errors.email = MESSAGES.email;
  if (phone && !isPhone(phone)) errors.phone = MESSAGES.phone;
  if (!(CONTACT_TOPIC_OPTIONS as readonly string[]).includes(text(data, "topic"))) {
    errors.topic = MESSAGES.topic;
  }
  if (text(data, "message").length < 5) errors.message = MESSAGES.message;
  if (!data.get("consent")) errors.consent = MESSAGES.consent;

  return errors;
}
