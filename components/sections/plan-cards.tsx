import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import type { Plan } from "@/lib/data/plans";
import { ownerCta } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

export function PlanCards({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {plans.map((plan) => (
        <article
          key={plan.id}
          id={plan.id}
          className={cn(
            "reveal flex flex-col p-7 md:p-12",
            plan.recommended ? "bg-espresso text-paper" : "bg-paper-deep",
          )}
        >
          <div className="flex min-h-5 items-center justify-between gap-4">
            <p className={cn("eyebrow", plan.recommended ? "text-clay-light" : "text-clay")}>Yönetim planı</p>
            {plan.recommended && <p className="eyebrow text-clay-light">Önerilen</p>}
          </div>
          <h2 className="mt-5 text-display-lg">{plan.name}</h2>
          <p className={cn("mt-4 text-lg", plan.recommended ? "text-sand" : "text-ink-soft")}>{plan.audience}</p>

          <ul className={cn("mt-8 grow border-t", plan.recommended ? "border-espresso-line" : "border-ink/20")}>
            {plan.features.map((feature) => (
              <li
                key={feature}
                className={cn("flex items-start gap-3 border-b py-3.5", plan.recommended ? "border-espresso-line" : "border-ink/15")}
              >
                <Check aria-hidden size={18} strokeWidth={1.5} className={cn("mt-1 shrink-0", plan.recommended ? "text-clay-light" : "text-clay")} />
                {feature}
              </li>
            ))}
          </ul>

          <ButtonLink href={ownerCta.href} variant={plan.recommended ? "paper" : "primary"} className="mt-9 self-start">
            Bu Plan İçin Başvurun
          </ButtonLink>
        </article>
      ))}
    </div>
  );
}
