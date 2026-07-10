import { getStats } from "@/lib/queries";

export default async function AdminDashboard() {
  const { productCount, categoryCount, orderCount, userCount } = await getStats();

  const stats = [
    { label: "تعداد محصولات", value: productCount, icon: "📦" },
    { label: "دسته‌بندی‌ها", value: categoryCount, icon: "🗂️" },
    { label: "کل سفارش‌ها", value: orderCount, icon: "🧾" },
    { label: "کاربران", value: userCount, icon: "👥" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-800">داشبورد</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="mb-2 text-2xl">{s.icon}</div>
            <div className="text-lg font-bold text-brand-tealDark">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card mt-6 p-5 text-sm text-gray-500">
        این آمار مستقیماً از دیتابیس واقعی خونده می‌شه. هر محصول یا دسته‌بندی که از پنل اضافه/حذف کنی، همینجا آپدیت می‌شه.
      </div>
    </div>
  );
}
