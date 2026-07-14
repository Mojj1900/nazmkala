import { getCategories, getProducts } from "@/lib/queries";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function ProductsPage({ searchParams }) {
  const activeCategory = searchParams?.category;
  const q = searchParams?.q || "";

  const [categories, list] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: activeCategory, q }),
  ]);

  const activeCategoryObj = categories.find((c) => c.slug === activeCategory);

  return (
    <div className="bg-brand-cream">
      <div className="container-app py-10">
        {/* مسیر صفحه */}
        <nav className="mb-4 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-brand-teal">خانه</Link>
          <span>/</span>
          <Link
            href="/products"
            className={!activeCategoryObj ? "text-brand-tealDark" : "hover:text-brand-teal"}
          >
            محصولات
          </Link>
          {activeCategoryObj && (
            <>
              <span>/</span>
              <span className="text-brand-tealDark">{activeCategoryObj.name}</span>
            </>
          )}
        </nav>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              {activeCategoryObj ? activeCategoryObj.name : "همه محصولات"}
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              {list.length.toLocaleString("fa-IR")} محصول
              {q ? ` برای «${q}»` : ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[240px_1fr]">
          {/* فیلتر موبایل: چیپ‌های افقی قابل اسکرول */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:hidden">
            <Link
              href="/products"
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition ${
                !activeCategory
                  ? "border-brand-teal bg-brand-teal text-white"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              همه
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition ${
                  activeCategory === c.slug
                    ? "border-brand-teal bg-brand-teal text-white"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>

          {/* نوار کناری: دسکتاپ */}
          <aside className="hidden space-y-5 sm:block">
            <div className="sticky top-24 space-y-5">
              <form className="relative">
                <input
                  type="text"
                  name="q"
                  defaultValue={searchParams?.q || ""}
                  placeholder="جستجوی محصول..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pe-9 ps-3 text-sm outline-none transition focus:border-brand-teal"
                />
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                </svg>
              </form>

              <div className="card p-4">
                <div className="mb-3 text-sm font-semibold text-gray-700">دسته‌بندی‌ها</div>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/products"
                      className={`flex items-center rounded-lg px-3 py-2 transition ${
                        !activeCategory
                          ? "bg-brand-greenLight font-medium text-brand-tealDark"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      همه محصولات
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/products?category=${c.slug}`}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${
                          activeCategory === c.slug
                            ? "bg-brand-greenLight font-medium text-brand-tealDark"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div>
            {list.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
                <span className="text-4xl">🔍</span>
                <p className="text-gray-400">محصولی با این مشخصات پیدا نشد.</p>
                <Link href="/products" className="text-sm font-medium text-brand-teal hover:underline">
                  مشاهده همه محصولات
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {list.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
