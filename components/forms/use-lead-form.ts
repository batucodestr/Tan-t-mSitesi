"use client";

import { useActionState, useState, type FocusEvent, type FormEvent } from "react";

import type { FieldErrors, LeadFormState } from "@/lib/types/lead";

type Action<Field extends string> = (
  previous: LeadFormState<Field>,
  data: FormData,
) => Promise<LeadFormState<Field>>;

/**
 * Connects a form to its Server Action and adds validation in the browser. Without
 * JavaScript the form still posts, and the Server Action validates it the same way.
 */
export function useLeadForm<Field extends string>(
  action: Action<Field>,
  validate: (data: FormData) => FieldErrors<Field>,
) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" } as LeadFormState<Field>);
  const [clientErrors, setClientErrors] = useState<FieldErrors<Field>>({});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const errors = validate(new FormData(form));
    setClientErrors(errors);

    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      event.preventDefault();
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    }
  };

  // Re-check a field on blur once it has content or already shows an error, so
  // tabbing through an empty form does not fill it with error messages.
  const onBlur = (event: FocusEvent<HTMLFormElement>) => {
    const target = event.target as unknown as HTMLInputElement;
    const name = target.name as Field;
    if (!name) return;

    const showing = Boolean(clientErrors[name] ?? state.fieldErrors?.[name]);
    if (!target.value && !showing) return;

    const errors = validate(new FormData(event.currentTarget));
    setClientErrors((current) => ({ ...current, [name]: errors[name] }));
  };

  return {
    state,
    formAction,
    pending,
    onSubmit,
    onBlur,
    errors: { ...state.fieldErrors, ...clientErrors } as FieldErrors<Field>,
    values: state.values ?? ({} as Partial<Record<Field, string>>),
  };
}
