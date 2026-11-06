"use client";

import Link from "next/link";

import { ConsentField, Honeypot, SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { FormDeliveryError, FormSuccess } from "@/components/forms/form-status";
import { useLeadForm } from "@/components/forms/use-lead-form";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/lib/actions/leads";
import { CONTACT_TOPIC_OPTIONS } from "@/lib/types/lead";
import { validateContactMessage } from "@/lib/validation/leads";

export function ContactForm() {
  const { state, formAction, pending, onSubmit, onBlur, errors, values } = useLeadForm(
    submitContactMessage,
    validateContactMessage,
  );

  if (state.status === "success") {
    return (
      <FormSuccess title="Mesajınızı aldık.">
        <p>Teşekkür ederiz. Ekibimiz en kısa sürede size dönüş yapacak.</p>
      </FormSuccess>
    );
  }

  return (
    <form action={formAction} onSubmit={onSubmit} onBlur={onBlur} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <Honeypot />

      <TextField name="fullName" label="Ad Soyad" autoComplete="name" defaultValue={values.fullName} error={errors.fullName} wrapperClassName="sm:col-span-2" />
      <TextField name="email" label="E-posta" type="email" inputMode="email" autoComplete="email" defaultValue={values.email} error={errors.email} />
      <TextField name="phone" label="Telefon" optional type="tel" inputMode="tel" autoComplete="tel" placeholder="05XX XXX XX XX" defaultValue={values.phone} error={errors.phone} />
      <SelectField name="topic" label="Konu" placeholder="Seçin" options={CONTACT_TOPIC_OPTIONS} defaultValue={values.topic ?? ""} key={`topic-${values.topic}`} error={errors.topic} wrapperClassName="sm:col-span-2" />
      <TextAreaField name="message" label="Mesajınız" defaultValue={values.message} maxLength={2000} error={errors.message} wrapperClassName="sm:col-span-2" />

      <div className="sm:col-span-2">
        <ConsentField error={errors.consent}>
          <Link href="/legal/kvkk-aydinlatma-metni" target="_blank" className="text-ink underline underline-offset-2">KVKK Aydınlatma Metni</Link>&apos;ni okudum, talebim kapsamında benimle iletişime geçilmesini onaylıyorum.
        </ConsentField>
      </div>

      {state.deliveryFailed && (
        <div className="sm:col-span-2">
          <FormDeliveryError />
        </div>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Gönderiliyor..." : "Mesajı Gönder"}
        </Button>
      </div>
    </form>
  );
}
