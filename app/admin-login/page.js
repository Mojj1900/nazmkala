import { loginAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/queries";

export default async function AdminLoginPage({ searchParams }) {
  const hasError = searchParams?.error === "1";
  const settings = await getSettings();

  return (
    <div className="container-app flex min-h-screen items-center justify-center">
      <div className="card w-full max-w-sm p-6">
        <div className="mb-6 text-center">
          <div className="text-lg font-bold text-brand-teal">
            {settings.storeName}
          </div>
          <p className="mt-1 text-sm text-gray-500">ورود به پنل مدیریت</p>
        </div>

        {hasError && (
          <div className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-center text-sm text-red-500">
            نام کاربری یا رمز عبور اشتباه است.
          </div>
        )}

        <form action={loginAdmin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-600">نام کاربری</label>
            <input
              name="username"
              required
              dir="ltr"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">رمز عبور</label>
            <input
              name="password"
              type="password"
              required
              dir="ltr"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
