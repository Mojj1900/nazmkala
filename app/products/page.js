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

  return (
    <div className="container-app py-10">
      <h1 className="mb-6 text-xl font-bold text-gray-800">لیست محصولات</h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <form className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={searchParams?.q || ""}
              placeholder="جستجو..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
          </form>

          <div>
            <div className="mb-3 text-sm font-semibold text-gray-700">دسته‌بندی‌ها</div>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/products"
                  className={`block rounded-lg px-3 py-2 ${
                    !activeCategory ? "bg-brand-greenLight text-brand-tealDark" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  همه محصولات
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/products?category=${c.slug}`}
                    className={`block rounded-lg px-3 py-2 ${
                      activeCategory === c.slug ? "bg-brand-greenLight text-brand-tealDark" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          {list.length === 0 ? (
            <p className="py-16 text-center text-gray-400">محصولی یافت نشد.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
