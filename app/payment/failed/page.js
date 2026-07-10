import Link from "next/link";

export default function PaymentFailedPage({ searchParams }) {
  const orderId = searchParams?.orderId;

  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
        ❌
      </div>
      <h1 className="mb-2 text-xl font-bold text-gray-800">پرداخت انجام نشد</h1>
      <p className="mb-6 text-gray-500">
        تراکنش لغو شد یا با خطا مواجه شد. سبد خرید شما دست‌نخورده باقی مانده، می‌توانید دوباره تلاش کنید.
      </p>
      {orderId && (
        <p className="mb-4 text-sm text-gray-400">شماره سفارش: {orderId.slice(0, 8)}</p>
      )}
      <div className="flex gap-3">
        <Link href="/checkout" className="btn-primary">
          تلاش مجدد
        </Link>
        <Link href="/cart" className="btn-outline">
          بازگشت به سبد خرید
        </Link>
      </div>
    </div>
  );
}
