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
    <section className="bg-paper-deep py-24 md:py-36">
      <Container>
        <SectionHeading eyebrow="Hizmetlerimiz" title="Mülkünüzle ilgili her şey tek ekipte." />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5]">
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
            <ol className="border-t border-ink/80">
              {services.map((service, index) => (
                <li
                  key={service.id}
                  onMouseEnter={() => setActive(index)}
                  className="reveal border-b border-ink/15 py-8 lg:py-10"
                >
                  <div className="grid gap-x-6 sm:grid-cols-[3.5rem_1fr]">
                    <span aria-hidden className={cn("font-display text-2xl transition-colors duration-300 sm:pt-1", index === active ? "text-clay" : "text-ink-soft")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-display-md">{service.title}</h3>
                      <p className="mt-3 max-w-xl text-ink-soft">{service.summary}</p>
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
