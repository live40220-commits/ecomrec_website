// src/components/ui/ImageCarousel.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[]; // array of image URLs
  alt?: string;
}

export default function ImageCarousel({ images, alt = "Carousel image" }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  // Cycle images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Image
      src={images[index]}
      alt={alt}
      fill
      priority
      sizes="100vw"
      className="animate-[floatSlow_9s_ease-in-out_infinite] scale-105 object-cover object-[50%_18%]"
    />
  );
}
