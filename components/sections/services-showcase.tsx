"use client";

import { useState } from "react";

import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Service } from "@/lib/data/services";
import { cn } from "@/lib/utils/cn";

/** Service list beside a photograph that follows the row being read. */
export function ServicesShowcase({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-paper-deep py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Hizmetlerimiz" title="Mülkünüzle ilgili her şey tek ekipte." />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-panel shadow-card">
              {services.map((service, index) => (
                <Photo
                  key={service.id}
                  src={service.image.src}
                  alt={index === active ? service.image.alt : ""}
                  sizes="40vw"
                  className={cn(
                    "!absolute inset-0 transition-opacity duration-700 ease-soft",
                    index === active ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="space-y-3">
              {services.map((service, index) => (
                <li
                  key={service.id}
                  onMouseEnter={() => setActive(index)}
                  className={cn("reveal rounded-card border bg-card px-6 py-6 transition-all duration-300 ease-soft lg:px-7", index === active ? "border-line-strong shadow-card" : "border-line")}
                >
                  <div className="grid gap-x-6 sm:grid-cols-[3.5rem_1fr]">
                    <span aria-hidden className={cn("mb-3 flex size-11 items-center justify-center rounded-xl font-display text-lg font-semibold transition-colors duration-300 sm:mb-0", index === active ? "bg-clay text-white" : "bg-clay-tint text-clay-deep")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-display-sm">{service.title}</h3>
                      <p className="mt-2 max-w-xl text-[0.98rem] text-ink-soft">{service.summary}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <TextLink href="/management-plans" className="mt-10">Yönetim planlarımızı inceleyin</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
