import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { updateProduct, addProductImage, deleteProductImage } from "@/lib/actions";

export default async function EditProductPage({ params }) {
  const [product, categories] = await Promise.all([
    getProductById(params.id),
    prisma.category.findMany(),
  ]);

  if (!product) return notFound();

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/admin/products" className="text-gray-400 hover:text-brand-teal">
          مدیریت محصولات
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700">ویرایش محصول</span>
      </div>

      <h1 className="mb-6 text-xl font-bold text-gray-800">ویرایش «{product.title}»</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* فرم اطلاعات محصول */}
        <div className="card p-5">
          <div className="mb-4 text-sm font-semibold text-gray-700">اطلاعات محصول</div>
          <form action={updateProduct} className="grid grid-cols-1 gap-3">
            <input type="hidden" name="id" value={product.id} />

            <label className="text-xs text-gray-500">
              نام محصول
              <input
                name="title"
                required
                defaultValue={product.title}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs text-gray-500">
                قیمت (تومان)
                <input
                  name="price"
                  type="number"
                  required
                  defaultValue={product.price}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
                />
              </label>
              <label className="text-xs text-gray-500">
                قیمت قبل از تخفیف (اختیاری)
                <input
                  name="oldPrice"
                  type="number"
                  defaultValue={product.oldPrice || ""}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs text-gray-500">
                موجودی
                <input
                  name="stock"
                  type="number"
                  defaultValue={product.stock}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
                />
              </label>
              <label className="text-xs text-gray-500">
                دسته‌بندی
                <select
                  name="categoryId"
                  required
                  defaultValue={product.categoryId}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="text-xs text-gray-500">
              عکس اصلی (کاور) — همون عکسی که توی لیست محصولات نشون داده می‌شه
              <input
                name="image"
                required
                defaultValue={product.image}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
              />
            </label>

            <label className="text-xs text-gray-500">
              توضیحات
              <textarea
                name="description"
                rows={3}
                defaultValue={product.description}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
              />
            </label>

            <button type="submit" className="btn-primary mt-2">ذخیره تغییرات</button>
          </form>
        </div>

        {/* گالری عکس‌ها */}
        <div className="card p-5">
          <div className="mb-4 text-sm font-semibold text-gray-700">
            گالری عکس‌های محصول ({product.images.length})
          </div>

          <form action={addProductImage} className="mb-5 flex gap-2">
            <input type="hidden" name="productId" value={product.id} />
            <input
              name="url"
              required
              placeholder="لینک مستقیم عکس جدید..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
            />
            <button type="submit" className="btn-outline shrink-0 px-4">افزودن</button>
          </form>

          {product.images.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
              هنوز عکسی به گالری اضافه نشده.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img) => (
                <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-brand-mint">
                  <Image src={img.url} alt="" fill className="object-cover" />
                  <form action={deleteProductImage} className="absolute left-1 top-1">
                    <input type="hidden" name="id" value={img.id} />
                    <input type="hidden" name="productId" value={product.id} />
                    <button
                      type="submit"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
                      title="حذف عکس"
                    >
                      ✕
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}

          <p className="mt-4 text-xs text-gray-400">
            نکته: لینک باید آدرس مستقیم فایل عکس باشه (نه لینک صفحه). روی عکس مورد نظر راست‌کلیک کن و
            «Copy Image Address» رو بزن، بعد همینجا پیستش کن.
          </p>
        </div>
      </div>
    </div>
  );
}
