"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

const nav = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/products", label: "فروشگاه" },
  { href: "/about", label: "درباره ما" },
  { href: "/policy", label: "قوانین و مقررات" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Header({ storeName = "نظم‌کالا" }) {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40">
      {/* نوار باریک بالا */}
      <div className="hidden bg-white text-xs text-gray-400 sm:block">
        <div className="container-app flex h-9 items-center justify-between">
          <span>ارسال به سراسر ایران 🚚</span>
          <span dir="ltr">021 1234 5678</span>
        </div>
      </div>

      {/* هدر اصلی با پس‌زمینه سبز ملایم */}
      <div className="border-b border-brand-sageDark bg-brand-sage">
        <div className="container-app flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg">
              🏠
            </span>
            <span className="text-lg font-bold text-brand-tealDark">
              {storeName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand-tealDark transition">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="hidden sm:flex items-center rounded-xl bg-white/70 px-3 py-2 text-sm text-gray-500 hover:bg-white transition"
            >
              🔍 جستجوی محصول...
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
            >
              🛒 <span className="hidden sm:inline">سبد خرید</span>
              {count > 0 && (
                <span className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
