import { getProducts } from "@/lib/queries";
import { formatToman } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { createProduct, deleteProduct } from "@/lib/actions";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    prisma.category.findMany(),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-800">مدیریت محصولات</h1>

      <div className="card mb-6 p-5">
        <div className="mb-3 text-sm font-semibold text-gray-700">افزودن محصول جدید</div>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-400">
            اول باید حداقل یک دسته‌بندی بسازی (از صفحه «دسته‌بندی‌ها»).
          </p>
        ) : (
          <form action={createProduct} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input name="title" required placeholder="نام محصول" className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
            <input name="price" required type="number" placeholder="قیمت (تومان)" className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
            <input name="stock" type="number" placeholder="موجودی" className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
            <select name="categoryId" required className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal">
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input name="image" placeholder="لینک تصویر (اختیاری)" className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal sm:col-span-2" />
            <textarea name="description" placeholder="توضیحات" rows={2} className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal sm:col-span-2" />
            <button type="submit" className="btn-primary sm:col-span-2">افزودن محصول</button>
          </form>
        )}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 text-right">محصول</th>
              <th className="p-3 text-right">قیمت</th>
              <th className="p-3 text-right">موجودی</th>
              <th className="p-3 text-right">دسته‌بندی</th>
              <th className="p-3 text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">هنوز محصولی ثبت نشده.</td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 last:border-0">
                <td className="p-3 text-gray-800">{p.title}</td>
                <td className="p-3 text-brand-tealDark">{formatToman(p.price)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">{p.category?.name}</td>
                <td className="p-3">
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="text-red-400 hover:underline">حذف</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
