import Link from "next/link";
import { logoutAdmin } from "@/lib/auth";

const links = [
  { href: "/admin", label: "داشبورد", icon: "📊" },
  { href: "/admin/products", label: "محصولات", icon: "📦" },
  { href: "/admin/categories", label: "دسته‌بندی‌ها", icon: "🗂️" },
  { href: "/admin/orders", label: "سفارش‌ها", icon: "🧾" },
  { href: "/admin/users", label: "کاربران", icon: "👥" },
  { href: "/admin/settings", label: "تنظیمات و بنرها", icon: "⚙️" },
];

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-app grid grid-cols-1 gap-6 py-8 sm:grid-cols-[220px_1fr]">
        <aside className="card h-fit p-3">
          <div className="mb-3 px-2 text-sm font-bold text-brand-teal">پنل مدیریت رامش‌کالا</div>
          <nav className="space-y-1 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-brand-greenLight hover:text-brand-tealDark"
              >
                <span>{l.icon}</span>
                <span>{l.label}</span>
              </Link>
            ))}
          </nav>
          <form action={logoutAdmin} className="mt-3 border-t border-gray-100 pt-3">
            <button type="submit" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-50">
              <span>🚪</span>
              <span>خروج</span>
            </button>
          </form>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
