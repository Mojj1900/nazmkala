import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { formatToman } from "@/lib/data";
import { verifyPhoneToken, CUSTOMER_COOKIE } from "@/lib/customerAuth";
import { logoutCustomer } from "@/lib/customerActions";

const statusLabel = {
  PENDING: "در انتظار پرداخت",
  PAID: "پرداخت‌شده",
  SHIPPED: "ارسال‌شده",
  DELIVERED: "تحویل‌داده‌شده",
  CANCELLED: "لغوشده",
};

export default async function ProfilePage() {
  const token = cookies().get(CUSTOMER_COOKIE)?.value;
  const phone = verifyPhoneToken(token);

  if (!phone) {
    return (
      <div className="container-app flex min-h-[50vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-gray-500">برای مشاهده پروفایل، ابتدا وارد حساب کاربری‌ات شو.</p>
        <Link href="/login" className="btn-primary">
          ورود / ثبت‌نام
        </Link>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { phone },
    include: {
      orders: {
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return (
    <div className="container-app py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">پروفایل کاربری</h1>
        <form action={logoutCustomer}>
          <button type="submit" className="text-sm text-red-400 hover:underline">
            خروج از حساب
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[220px_1fr]">
        <aside className="card space-y-1 p-4 text-sm">
          <div className="mb-2 text-xs text-gray-400">شماره موبایل</div>
          <div dir="ltr" className="text-left font-medium text-gray-700">{user?.phone}</div>
        </aside>

        <div>
          <h2 className="mb-3 text-sm font-bold text-gray-700">سفارش‌های من</h2>
          {!user?.orders?.length ? (
            <div className="card p-8 text-center text-gray-400">هنوز سفارشی ثبت نکردی.</div>
          ) : (
            <div className="space-y-3">
              {user.orders.map((o) => (
                <div key={o.id} className="card p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      سفارش #{o.id.slice(0, 8)}
                    </span>
                    <span className="text-xs text-brand-tealDark">
                      {statusLabel[o.status] || o.status}
                    </span>
                  </div>
                  <ul className="mb-2 space-y-1 text-xs text-gray-500">
                    {o.items.map((it) => (
                      <li key={it.id}>
                        {it.product?.title || "محصول حذف‌شده"} × {it.qty}
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm font-bold text-brand-tealDark">
                    {formatToman(o.totalPrice)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
