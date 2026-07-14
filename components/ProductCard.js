"use client";

import Image from "next/image";
import Link from "next/link";
import { formatToman } from "@/lib/data";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

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
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-sm ring-2 ring-white/70">
            {discountPercent}٪
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/products/${product.slug}`} className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-800 transition hover:text-brand-teal">
          {product.title}
        </Link>

        <div className="flex items-center gap-1 text-xs">
          <span className="tracking-tight text-amber-400">
            {"★".repeat(Math.round(product.rating))}
            <span className="text-gray-200">{"★".repeat(5 - Math.round(product.rating))}</span>
          </span>
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
            className="flex items-center gap-1 rounded-xl bg-brand-teal px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-brand-tealDark hover:shadow active:scale-95"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6" />
            </svg>
            افزودن
          </button>
        </div>
      </div>
    </div>
  );
}
