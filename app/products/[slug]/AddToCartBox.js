"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function AddToCartBox({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-gray-500 hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-10 text-center text-sm">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-3 py-2 text-gray-500 hover:bg-gray-50"
        >
          +
        </button>
      </div>
      <button onClick={handleAdd} className="btn-primary">
        {added ? "به سبد اضافه شد ✓" : "افزودن به سبد خرید"}
      </button>
    </div>
  );
}
