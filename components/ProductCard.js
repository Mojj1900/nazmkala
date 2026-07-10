"use client";

import Image from "next/image";
import Link from "next/link";
import { formatToman } from "@/lib/data";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  return (
    <div className="card group flex flex-col overflow-hidden">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-brand-mint">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-lg bg-brand-green px-2 py-1 text-xs font-bold text-white">
            تخفیف
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/products/${product.slug}`} className="line-clamp-2 text-sm font-medium text-gray-800 hover:text-brand-teal">
          {product.title}
        </Link>

        <div className="flex items-center gap-1 text-xs text-amber-500">
          {"★".repeat(Math.round(product.rating))}
          <span className="text-gray-400">({product.rating})</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">{formatToman(product.oldPrice)}</span>
            )}
            <span className="font-bold text-brand-tealDark">{formatToman(product.price)}</span>
          </div>
          <button
            onClick={() => addItem(product, 1)}
            className="rounded-xl bg-brand-teal px-3 py-2 text-xs font-medium text-white transition hover:bg-brand-tealDark"
          >
            افزودن
          </button>
        </div>
      </div>
    </div>
  );
}
