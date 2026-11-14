"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";

const slides = [
  {
    src: "/images/site/hero.jpg",
    alt: "Gün batımında tepelere bakan, özel havuzlu modern bir villanın terası",
    position: "object-[35%_center] md:object-center",
  },
  { src: "/images/gallery/havuzlu-villa.jpg", alt: "İki katlı beyaz villa ve önündeki yansımalı havuz", position: "object-center" },
  { src: "/images/site/services-villa.jpg", alt: "Havuzu ve geniş terasıyla beyaz, modern bir villa", position: "object-center" },
  { src: "/images/gallery/kemerli-salon.jpg", alt: "Kemerli pencereli, ahşap kirişli ve şömineli aydınlık salon", position: "object-center" },
];

const INTERVAL_MS = 6500;

/** Slow cross-fading background photographs. Stays on the first one for reduced motion. */
export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((current) => (current + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="photo absolute inset-0 overflow-hidden bg-ink">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={index === active ? slide.alt : ""}
          aria-hidden={index !== active}
          fill
          preload={index === 0}
          sizes="100vw"
          className={cn(
            "object-cover transition-[opacity,transform] ease-out [transition-duration:1600ms,11000ms]",
            slide.position,
            index === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
          )}
        />
      ))}
    </div>
  );
}
