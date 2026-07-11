'use client';

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className="group rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative h-52 bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-xs text-brand-teal mb-1">{product.category}</div>
        <h3 className="font-semibold text-lg leading-tight mb-3 line-clamp-2 min-h-[3.2em]">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {product.price.toLocaleString('fa-IR')}
          </span>
          <span className="text-sm text-gray-500">تومان</span>
          
          {product.oldPrice && (
            <span className="line-through text-sm text-gray-400">
              {product.oldPrice.toLocaleString('fa-IR')}
            </span>
          )}
        </div>

        <button className="mt-5 w-full bg-brand-teal hover:bg-teal-700 text-white py-3.5 rounded-2xl text-sm font-medium transition">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}ProductCard.tsx