import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/queries";
import ProductCard from "@/components/ProductCard";
import HomeProductTabs from "@/components/HomeProductTabs";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const saleProducts = products.filter((p) => p.oldPrice && p.oldPrice > p.price);

  return (
    <div className="bg-brand-sage">
      {/* هیرو تمام‌عرض با عکس */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
          alt="رامش‌کالا"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/25 to-transparent" />
        <div className="container-app relative flex h-full flex-col items-start justify-center text-white">
          <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            فروشگاه اینترنتی رامش‌کالا
          </span>
          <h1 className="mb-3 text-3xl font-bold leading-relaxed sm:text-5xl">
            رامش‌کالا
          </h1>
          <p className="mb-6 max-w-md text-sm text-white/90 sm:text-base">
            بورس لوازم خانه و نظم‌دهنده‌ها — هر خانه‌ای، شایسته آرامش و نظم است.
          </p>
          <div className="flex gap-3">
            <Link href="/products" className="btn-primary">
              مشاهده محصولات
            </Link>
            <Link href="/about" className="rounded-xl border border-white/70 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
              درباره ما
            </Link>
          </div>
        </div>
      </section>

      {/* دسته‌بندی‌ها با عکس */}
      <section className="container-app py-12">
        <h2 className="mb-6 text-lg font-bold text-gray-800">دسته‌بندی محصولات</h2>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-400">هنوز دسته‌بندی‌ای ثبت نشده. از پنل مدیریت اضافه کن.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
              >
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl">
                    {c.icon}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-sm font-medium text-white">{c.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ترین‌های فروشگاه - تب‌دار */}
      <section className="container-app py-12">
        <h2 className="mb-6 text-lg font-bold text-gray-800">ترین‌های رامش‌کالا</h2>
        <HomeProductTabs products={JSON.parse(JSON.stringify(products))} />
      </section>

      {/* فروش ویژه */}
      {saleProducts.length > 0 && (
        <section className="bg-white py-12">
          <div className="container-app">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">فروش ویژه رامش‌کالا</h2>
              <Link href="/products" className="text-sm text-brand-teal hover:underline">
                مشاهده همه
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {saleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
