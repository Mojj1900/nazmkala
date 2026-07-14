import { getSettings } from "@/lib/queries";
import { updateSettings } from "@/lib/actions";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-800">تنظیمات و بنرها</h1>

      <form action={updateSettings} className="card space-y-4 p-6">
        <div>
          <label className="mb-1 block text-sm text-gray-600">نام فروشگاه</label>
          <input
            name="storeName"
            required
            defaultValue={settings.storeName}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">شعار فروشگاه</label>
          <input
            name="tagline"
            defaultValue={settings.tagline}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">بنر صفحه اصلی (لینک تصویر)</label>
          <input
            name="bannerImage"
            defaultValue={settings.bannerImage || ""}
            placeholder="https://..."
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
          />
          <p className="mt-1 text-xs text-gray-400">اگه خالی بذاری، همون بنر پیش‌فرض نمایش داده می‌شه.</p>
        </div>
        <button type="submit" className="btn-primary">ذخیره تغییرات</button>
      </form>
    </div>
  );
}
