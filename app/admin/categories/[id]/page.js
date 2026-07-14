import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryById } from "@/lib/queries";
import { updateCategory } from "@/lib/actions";

export default async function EditCategoryPage({ params }) {
  const category = await getCategoryById(params.id);
  if (!category) return notFound();

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/admin/categories" className="text-gray-400 hover:text-brand-teal">
          مدیریت دسته‌بندی‌ها
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700">ویرایش دسته‌بندی</span>
      </div>

      <h1 className="mb-6 text-xl font-bold text-gray-800">ویرایش «{category.name}»</h1>

      <div className="card max-w-lg p-5">
        <form action={updateCategory} className="grid grid-cols-1 gap-3">
          <input type="hidden" name="id" value={category.id} />

          <label className="text-xs text-gray-500">
            نام دسته‌بندی
            <input
              name="name"
              required
              defaultValue={category.name}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
          </label>

          <label className="text-xs text-gray-500">
            ایموجی (مثلاً 🧹)
            <input
              name="icon"
              defaultValue={category.icon || ""}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
          </label>

          <label className="text-xs text-gray-500">
            لینک عکس (اختیاری — اگه خالی بذاری، همون ایموجی نمایش داده می‌شه)
            <input
              name="image"
              defaultValue={category.image || ""}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
          </label>

          {category.image && (
            <img src={category.image} alt={category.name} className="h-20 w-20 rounded-full object-cover" />
          )}

          <button type="submit" className="btn-primary mt-2">ذخیره تغییرات</button>
        </form>

        <p className="mt-4 text-xs text-gray-400">
          نکته: نشانی (slug) دسته‌بندی با این فرم تغییر نمی‌کنه، تا لینک‌هایی که قبلاً به این دسته اشاره
          کردن (مثلاً توی منو یا صفحات محصولات) خراب نشن.
        </p>
      </div>
    </div>
  );
}
