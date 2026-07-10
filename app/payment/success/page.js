"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function PaymentSuccessPage({ searchParams }) {
  const { clearCart } = useCart();
  const refId = searchParams?.refId;
  const orderId = searchParams?.orderId;

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-greenLight text-3xl">
        ✅
      </div>
      <h1 className="mb-2 text-xl font-bold text-gray-800">پرداخت با موفقیت انجام شد</h1>
      <p className="mb-1 text-gray-500">سفارش شما ثبت شد و به‌زودی پردازش می‌شود.</p>
      {refId && (
        <p className="mb-1 text-sm text-gray-500">
          شماره پیگیری تراکنش: <span className="font-medium text-gray-700">{refId}</span>
        </p>
      )}
      {orderId && (
        <p className="mb-6 text-sm text-gray-400">شماره سفارش: {orderId.slice(0, 8)}</p>
      )}
      <Link href="/products" className="btn-primary">
        بازگشت به فروشگاه
      </Link>
    </div>
  );
}
