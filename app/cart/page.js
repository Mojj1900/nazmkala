"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatToman } from "@/lib/data";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-app py-16 text-center">
        <p className="mb-4 text-gray-500">سبد خرید شما خالی است.</p>
        <Link href="/products" className="btn-primary">
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <h1 className="mb-6 text-xl font-bold text-gray-800">سبد خرید</h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card flex items-center gap-4 p-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-mint">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="mb-1 text-sm font-medium text-gray-800">{item.title}</div>
                <div className="text-sm text-brand-tealDark">{formatToman(item.price)}</div>
              </div>
              <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="px-3 py-1.5 text-gray-500 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="px-3 py-1.5 text-gray-500 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-400 hover:text-red-600"
              >
                حذف
              </button>
            </div>
          ))}
        </div>

        <div className="card h-fit p-5">
          <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
            <span>جمع کل</span>
            <span className="font-bold text-brand-tealDark">{formatToman(subtotal)}</span>
          </div>
          <Link href="/checkout" className="btn-primary w-full">
            ادامه فرآیند خرید
          </Link>
        </div>
      </div>
    </div>
  );
}
