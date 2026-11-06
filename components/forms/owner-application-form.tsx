"use client";

import Link from "next/link";

import { ConsentField, Honeypot, SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { FormDeliveryError, FormSuccess } from "@/components/forms/form-status";
import { useLeadForm } from "@/components/forms/use-lead-form";
import { Button } from "@/components/ui/button";
import { submitOwnerApplication } from "@/lib/actions/leads";
import { PROPERTY_COUNT_OPTIONS, PROPERTY_TYPE_OPTIONS } from "@/lib/types/lead";
import { validateOwnerApplication } from "@/lib/validation/leads";

export function OwnerApplicationForm() {
  const { state, formAction, pending, onSubmit, onBlur, errors, values } = useLeadForm(
    submitOwnerApplication,
    validateOwnerApplication,
  );

  if (state.status === "success") {
    return (
      <FormSuccess title="Başvurunuzu aldık.">
        <p>Teşekkür ederiz. Ekibimiz mülkünüzü inceleyip verdiğiniz telefon numarası üzerinden sizinle iletişime geçecek.</p>
        <p className="mt-4">
          Bu arada ev sahipleri için hazırladığımız{" "}
          <Link href="/blog" className="text-ink underline underline-offset-4">yazılara</Link> göz atabilirsiniz.
        </p>
      </FormSuccess>
    );
  }

  return (
    <form action={formAction} onSubmit={onSubmit} onBlur={onBlur} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <Honeypot />

      <TextField name="fullName" label="Ad Soyad" autoComplete="name" defaultValue={values.fullName} error={errors.fullName} wrapperClassName="sm:col-span-2" />
      <TextField name="email" label="E-posta" type="email" inputMode="email" autoComplete="email" defaultValue={values.email} error={errors.email} />
      <TextField name="phone" label="Telefon" type="tel" inputMode="tel" autoComplete="tel" placeholder="05XX XXX XX XX" defaultValue={values.phone} error={errors.phone} />
      <TextField name="propertyLocation" label="Mülkün Konumu" placeholder="Örn. Bodrum, Yalıkavak" defaultValue={values.propertyLocation} error={errors.propertyLocation} wrapperClassName="sm:col-span-2" />
      <SelectField name="propertyType" label="Mülk Türü" placeholder="Seçin" options={PROPERTY_TYPE_OPTIONS} defaultValue={values.propertyType ?? ""} key={`type-${values.propertyType}`} error={errors.propertyType} />
      <SelectField name="propertyCount" label="Mülk Sayısı" placeholder="Seçin" options={PROPERTY_COUNT_OPTIONS} defaultValue={values.propertyCount ?? ""} key={`count-${values.propertyCount}`} error={errors.propertyCount} />
      <TextAreaField name="additionalInfo" label="Ek Bilgiler" optional placeholder="Yatak odası sayısı, mevcut ilanlar, izin belgesi durumu gibi paylaşmak istedikleriniz" defaultValue={values.additionalInfo} maxLength={2000} wrapperClassName="sm:col-span-2" />

      <div className="sm:col-span-2">
        <ConsentField error={errors.consent}>
          <Link href="/legal/kvkk-aydinlatma-metni" target="_blank" className="text-ink underline underline-offset-2">KVKK Aydınlatma Metni</Link>&apos;ni okudum, başvurum kapsamında benimle iletişime geçilmesini onaylıyorum.
        </ConsentField>
      </div>

      {state.deliveryFailed && (
        <div className="sm:col-span-2">
          <FormDeliveryError />
        </div>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Gönderiliyor..." : "Başvurumu Gönder"}
        </Button>
      </div>
    </form>
  );
}
