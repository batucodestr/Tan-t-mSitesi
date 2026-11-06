import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const controlClass =
  "w-full border border-ink/25 bg-paper px-4 text-base transition-colors duration-200 placeholder:text-ink-soft/70 hover:border-ink/50 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay aria-[invalid=true]:border-danger";

function FieldShell({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-[0.9375rem] font-medium">
        {label}
        {optional && <span className="text-sm font-normal text-ink-soft">İsteğe bağlı</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-soft">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  return hint ? `${id}-hint` : undefined;
}

interface SharedProps {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  wrapperClassName?: string;
}

export function TextField({
  name,
  label,
  error,
  hint,
  optional,
  wrapperClassName,
  ...props
}: SharedProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={name} label={label} error={error} hint={hint} optional={optional} className={wrapperClassName}>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-required={!optional}
        aria-describedby={describedBy(name, error, hint)}
        className={cn(controlClass, "h-13")}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  name,
  label,
  error,
  hint,
  optional,
  wrapperClassName,
  ...props
}: SharedProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={name} label={label} error={error} hint={hint} optional={optional} className={wrapperClassName}>
      <textarea
        id={name}
        name={name}
        rows={5}
        aria-invalid={Boolean(error)}
        aria-required={!optional}
        aria-describedby={describedBy(name, error, hint)}
        className={cn(controlClass, "resize-y py-3")}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  name,
  label,
  error,
  hint,
  optional,
  wrapperClassName,
  options,
  placeholder,
  ...props
}: SharedProps & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder: string }) {
  return (
    <FieldShell id={name} label={label} error={error} hint={hint} optional={optional} className={wrapperClassName}>
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-required={!optional}
        aria-describedby={describedBy(name, error, hint)}
        className={cn(
          controlClass,
          "h-13 cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2214%22%20height=%2214%22%20fill=%22none%22%20stroke=%22%23241e18%22%20stroke-width=%221.5%22%20viewBox=%220%200%2024%2024%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10",
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function ConsentField({ error, children }: { error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          name="consent"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "consent-error" : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-clay"
        />
        <span>{children}</span>
      </label>
      {error && <p id="consent-error" className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}

/** Hidden field that only bots fill in. See lib/actions/leads.ts. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Web sitesi
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
