import Link from "next/link";

const badges = [
  { icon: "🔄", label: "ضمانت بازگشت کالا تا ۷ روز" },
  { icon: "🚚", label: "ارسال سریع به سراسر ایران" },
  { icon: "🔒", label: "پرداخت امن" },
  { icon: "🎧", label: "پشتیبانی ۲۴/۷" },
  { icon: "✅", label: "ضمانت اصالت کالا" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100">
      <div className="bg-brand-mint">
        <div className="container-app grid grid-cols-2 gap-4 py-6 text-xs text-gray-600 sm:grid-cols-5 sm:text-sm">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-app grid grid-cols-1 gap-8 py-10 sm:grid-cols-3">
        <div>
          <div className="mb-2 text-lg font-bold text-brand-teal">
            رامش<span className="text-brand-green">کالا</span>
          </div>
          <p className="text-sm text-gray-500">
            هر خانه‌ای، شایسته آرامش و نظم است.
          </p>
        </div>

        <div className="text-sm">
          <div className="mb-3 font-semibold text-gray-700">دسترسی سریع</div>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="/products" className="hover:text-brand-teal">محصولات</Link></li>
            <li><Link href="/about" className="hover:text-brand-teal">درباره ما</Link></li>
            <li><Link href="/faq" className="hover:text-brand-teal">سوالات متداول</Link></li>
            <li><Link href="/contact" className="hover:text-brand-teal">تماس با ما</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="mb-3 font-semibold text-gray-700">تماس با ما</div>
          <ul className="space-y-2 text-gray-500">
            <li>021 1234 5678</li>
            <li>info@rameshkala.com</li>
            <li>@rameshkala</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} رامش‌کالا. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
