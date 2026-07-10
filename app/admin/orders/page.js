import { getOrders } from "@/lib/queries";
import { formatToman } from "@/lib/data";
import { updateOrderStatus } from "@/lib/actions";

const statusLabel = {
  PENDING: "در انتظار پرداخت",
  PAID: "پرداخت‌شده",
  SHIPPED: "ارسال‌شده",
  DELIVERED: "تحویل‌داده‌شده",
  CANCELLED: "لغوشده",
};

const statusColor = {
  PENDING: "bg-amber-50 text-amber-600",
  PAID: "bg-brand-greenLight text-brand-tealDark",
  SHIPPED: "bg-blue-50 text-blue-600",
  DELIVERED: "bg-green-50 text-green-600",
  CANCELLED: "bg-red-50 text-red-500",
};

const statusOptions = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-800">مدیریت سفارش‌ها</h1>

      {orders.length === 0 ? (
        <div className="card p-8 text-center text-gray-400">
          هنوز سفارشی ثبت نشده است. وقتی کسی از سایت خرید کند، سفارشش اینجا نمایش داده می‌شود.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="card p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-50 pb-4">
                <div>
                  <div className="text-sm font-bold text-gray-800">
                    سفارش #{o.id.slice(0, 8)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(o.createdAt).toLocaleString("fa-IR")}
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[o.status] || "bg-gray-50 text-gray-500"}`}>
                  {statusLabel[o.status] || o.status}
                </span>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div>
                  <div className="mb-1 text-xs font-semibold text-gray-500">اطلاعات مشتری</div>
                  <div className="text-gray-700">{o.user?.name || "—"}</div>
                  <div dir="ltr" className="text-left text-gray-700">{o.user?.phone}</div>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold text-gray-500">آدرس ارسال</div>
                  <div className="text-gray-600">{o.address}</div>
                  <div className="text-gray-400">کد پستی: {o.postalCode}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 text-xs font-semibold text-gray-500">اقلام سفارش</div>
                <ul className="space-y-1 text-sm text-gray-600">
                  {o.items.map((it) => (
                    <li key={it.id} className="flex justify-between">
                      <span>{it.product?.title || "محصول حذف‌شده"} × {it.qty}</span>
                      <span>{formatToman(it.price * it.qty)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-50 pt-4">
                <div className="text-sm font-bold text-brand-tealDark">
                  جمع کل: {formatToman(o.totalPrice)}
                </div>
                <form action={updateOrderStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={o.id} />
                  <select
                    name="status"
                    defaultValue={o.status}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{statusLabel[s]}</option>
                    ))}
                  </select>
                  <button type="submit" className="btn-outline !px-4 !py-2 text-sm">
                    بروزرسانی وضعیت
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
