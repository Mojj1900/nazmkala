"use client";

import { useCart } from "@/components/CartProvider";
import { formatToman } from "@/lib/data";
import { startCheckout } from "@/lib/actions";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-gray-500">سبد خرید شما خالی است.</p>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <h1 className="mb-6 text-xl font-bold text-gray-800">تسویه حساب</h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_320px]">
        <form action={startCheckout} className="card space-y-4 p-6">
          <input type="hidden" name="items" value={JSON.stringify(items)} />

          <div>
            <label className="mb-1 block text-sm text-gray-600">نام و نام خانوادگی</label>
            <input name="name" required className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">شماره موبایل</label>
            <input name="phone" required type="tel" dir="ltr" placeholder="09xxxxxxxxx" className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">آدرس کامل</label>
            <textarea name="address" required rows={3} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">کد پستی</label>
            <input name="postalCode" required className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
          </div>
          <button type="submit" className="btn-primary w-full">
            پرداخت و ثبت سفارش
          </button>
          <p className="text-center text-xs text-gray-400">
            با کلیک روی این دکمه به درگاه پرداخت امن زرین‌پال منتقل می‌شوید.
          </p>
        </form>

        <div className="card h-fit p-5">
          <div className="mb-3 text-sm font-semibold text-gray-700">خلاصه سفارش</div>
          <ul className="mb-3 space-y-2 text-sm text-gray-500">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between">
                <span>{i.title} × {i.qty}</span>
                <span>{formatToman(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm font-bold text-brand-tealDark">
            <span>جمع کل</span>
            <span>{formatToman(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
