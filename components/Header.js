"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

const nav = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "محصولات" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/faq", label: "سوالات متداول" },
];

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold text-brand-teal">
            رامش<span className="text-brand-green">کالا</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-teal transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="hidden sm:flex items-center rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:border-brand-teal hover:text-brand-teal transition"
          >
            جستجوی محصول...
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center justify-center rounded-xl border border-gray-200 p-2.5 hover:border-brand-teal transition"
            aria-label="سبد خرید"
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <Link href="/login" className="hidden sm:inline-flex btn-outline !px-3 !py-2 text-sm">
            ورود
          </Link>
        </div>
      </div>
    </header>
  );
}
