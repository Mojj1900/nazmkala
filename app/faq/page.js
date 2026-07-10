const faqs = [
  {
    q: "چگونه سفارش خود را پیگیری کنم؟",
    a: "از بخش «پروفایل کاربری» و سپس «سفارش‌های من» می‌توانید وضعیت سفارش خود را مشاهده کنید.",
  },
  {
    q: "زمان ارسال چقدر است؟",
    a: "سفارش‌ها معمولاً بین ۱ تا ۳ روز کاری ارسال می‌شوند.",
  },
  {
    q: "آیا امکان بازگشت کالا وجود دارد؟",
    a: "بله، تا ۷ روز پس از دریافت کالا امکان بازگشت وجود دارد.",
  },
  {
    q: "روش‌های پرداخت کدامند؟",
    a: "پرداخت آنلاین از طریق درگاه‌های معتبر بانکی امکان‌پذیر است.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-app max-w-2xl py-10">
      <h1 className="mb-6 text-xl font-bold text-gray-800">سوالات متداول</h1>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="card p-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-800">{f.q}</summary>
            <p className="mt-2 text-sm text-gray-500">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
