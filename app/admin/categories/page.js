import { getCategories } from "@/lib/queries";
import { createCategory, deleteCategory } from "@/lib/actions";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-800">مدیریت دسته‌بندی‌ها</h1>

      <div className="card mb-6 p-5">
        <div className="mb-3 text-sm font-semibold text-gray-700">افزودن دسته‌بندی جدید</div>
        <form action={createCategory} className="flex flex-wrap gap-3">
          <input name="name" required placeholder="نام دسته‌بندی" className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
          <input name="icon" placeholder="ایموجی (مثلاً 🧹)" className="w-40 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
          <button type="submit" className="btn-primary">افزودن</button>
        </form>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-gray-400">هنوز دسته‌بندی‌ای ثبت نشده.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => (
            <div key={c.id} className="card flex flex-col items-center gap-2 p-5 text-center">
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm font-medium text-gray-700">{c.name}</span>
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={c.id} />
                <button type="submit" className="text-xs text-red-400 hover:underline">حذف</button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
