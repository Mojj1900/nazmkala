"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const tabs = [
  { key: "newest", label: "جدیدترین‌ها" },
  { key: "popular", label: "پرطرفدارترین‌ها" },
  { key: "special", label: "ویژه‌ترین‌ها" },
];

export default function HomeProductTabs({ products }) {
  const [active, setActive] = useState("newest");

  const list = useMemo(() => {
    const copy = [...products];
    if (active === "newest") {
      return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (active === "popular") {
      return copy.sort((a, b) => b.rating - a.rating);
    }
    // ویژه‌ترین‌ها: محصولاتی که تخفیف دارن اول نمایش داده بشن
    return copy.sort((a, b) => (b.oldPrice ? 1 : 0) - (a.oldPrice ? 1 : 0));
  }, [products, active]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === t.key
                ? "bg-brand-teal text-white"
                : "bg-white text-gray-500 hover:bg-brand-greenLight"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-gray-400">هنوز محصولی ثبت نشده.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
