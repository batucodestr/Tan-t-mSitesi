import Image from "next/image";

import { cn } from "@/lib/utils/cn";

interface PhotoProps {
  src: string;
  alt: string;
  /** Tells the browser how wide the image renders, which decides the file it downloads. */
  sizes: string;
  /** Sizing classes for the frame, for example an aspect ratio. */
  className?: string;
  imageClassName?: string;
  /** Set for the largest image in the first viewport. */
  preload?: boolean;
}

/** A photograph that fills a sized frame. */
export function Photo({ src, alt, sizes, className, imageClassName, preload }: PhotoProps) {
  return (
    <div className={cn("photo relative overflow-hidden bg-paper-deep", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={cn("object-cover", imageClassName)} />
    </div>
  );
}
