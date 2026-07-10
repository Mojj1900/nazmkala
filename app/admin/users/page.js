import { getUsers } from "@/lib/queries";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-800">مدیریت کاربران</h1>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[500px] text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 text-right">نام</th>
              <th className="p-3 text-right">شماره موبایل</th>
              <th className="p-3 text-right">تعداد سفارش‌ها</th>
              <th className="p-3 text-right">تاریخ عضویت</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">هنوز کاربری ثبت‌نام نکرده است.</td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 last:border-0">
                <td className="p-3 text-gray-800">{u.name || "—"}</td>
                <td className="p-3" dir="ltr">{u.phone}</td>
                <td className="p-3">{u.orders.length}</td>
                <td className="p-3">{new Date(u.createdAt).toLocaleDateString("fa-IR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
