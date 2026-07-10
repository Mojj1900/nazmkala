export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-800">تنظیمات و بنرها</h1>

      <div className="card space-y-4 p-6">
        <div>
          <label className="mb-1 block text-sm text-gray-600">نام فروشگاه</label>
          <input
            defaultValue="رامش‌کالا"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">شعار فروشگاه</label>
          <input
            defaultValue="هر خانه‌ای، شایسته آرامش و نظم است."
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">بنر صفحه اصلی (لینک تصویر)</label>
          <input
            placeholder="https://..."
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
          />
        </div>
        <button className="btn-primary">ذخیره تغییرات</button>
      </div>
    </div>
  );
}
