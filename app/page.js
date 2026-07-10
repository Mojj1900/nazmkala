import Link from "next/link";
import { getCategories, getProducts } from "@/lib/queries";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-mint to-white">
        <div className="container-app grid grid-cols-1 items-center gap-8 py-14 sm:grid-cols-2 sm:py-20">
          <div>
            <span className="mb-3 inline-block rounded-full bg-brand-greenLight px-3 py-1 text-xs font-medium text-brand-tealDark">
              فروشگاه اینترنتی رامش‌کالا
            </span>
            <h1 className="mb-4 text-3xl font-bold leading-relaxed text-gray-800 sm:text-4xl">
              هر خانه‌ای، شایسته
              <span className="text-brand-teal"> آرامش </span>
              و
              <span className="text-brand-green"> نظم </span>
              است
            </h1>
            <p className="mb-6 text-gray-500">
              مجموعه‌ای منتخب از لوازم خانگی و نظم‌دهنده‌ها برای ساده‌تر کردن زندگی روزمره شما.
            </p>
            <div className="flex gap-3">
              <Link href="/products" className="btn-primary">
                مشاهده محصولات
              </Link>
              <Link href="/about" className="btn-outline">
                درباره ما
              </Link>
            </div>
          </div>
          <div className="mx-auto h-56 w-56 rounded-full bg-brand-teal/10 sm:h-72 sm:w-72" />
        </div>
      </section>

      <section className="container-app py-10">
        <h2 className="mb-5 text-lg font-bold text-gray-800">دسته‌بندی‌ها</h2>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-400">هنوز دسته‌بندی‌ای ثبت نشده. از پنل مدیریت اضافه کن.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className="card flex flex-col items-center gap-2 p-5 text-center"
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-sm font-medium text-gray-700">{c.name}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="container-app py-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">محصولات پیشنهادی</h2>
          <Link href="/products" className="text-sm text-brand-teal hover:underline">
            مشاهده همه
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="text-sm text-gray-400">هنوز محصولی ثبت نشده. از پنل مدیریت اضافه کن.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
