"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ mainImage, images, title }) {
  const allImages = [mainImage, ...images.map((i) => i.url)];
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-mint">
        <Image src={activeImage} alt={title} fill className="object-cover" />
      </div>

      {allImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(src)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-brand-mint transition ${
                activeImage === src ? "border-brand-teal" : "border-transparent"
              }`}
            >
              <Image src={src} alt={`${title} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
