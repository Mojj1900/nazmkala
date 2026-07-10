"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requestZarinpalPayment, getStartPayUrl } from "./payment";

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .concat("-", Math.random().toString(36).slice(2, 6));
}

export async function createProduct(formData) {
  const title = formData.get("title");
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock") || 0);
  const image =
    formData.get("image") ||
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=800&auto=format&fit=crop";
  const description = formData.get("description") || "";
  const categoryId = formData.get("categoryId");

  await prisma.product.create({
    data: {
      title,
      slug: slugify(title),
      price,
      stock,
      image,
      description,
      categoryId,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function deleteProduct(formData) {
  const id = formData.get("id");
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function createCategory(formData) {
  const name = formData.get("name");
  const icon = formData.get("icon") || "📦";

  await prisma.category.create({
    data: { name, slug: slugify(name), icon },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function deleteCategory(formData) {
  const id = formData.get("id");
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function startCheckout(formData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const postalCode = formData.get("postalCode");
  const itemsRaw = formData.get("items");

  let items = [];
  try {
    items = JSON.parse(itemsRaw || "[]");
  } catch (e) {
    items = [];
  }

  if (!items.length) {
    redirect("/cart");
  }

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  // ساخت یا پیدا کردن کاربر بر اساس شماره موبایل
  const user = await prisma.user.upsert({
    where: { phone },
    update: { name },
    create: { phone, name },
  });

  // ثبت سفارش با وضعیت «در انتظار پرداخت»
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalPrice,
      address,
      postalCode,
      status: "PENDING",
      items: {
        create: items.map((i) => ({
          productId: i.id,
          qty: i.qty,
          price: i.price,
        })),
      },
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const callbackUrl = `${baseUrl}/api/payment/callback?orderId=${order.id}`;

  const result = await requestZarinpalPayment({
    amountToman: totalPrice,
    description: `پرداخت سفارش ${order.id.slice(0, 8)} - رامش‌کالا`,
    mobile: phone,
    callbackUrl,
  });

  if (result?.data?.code === 100 && result.data.authority) {
    await prisma.order.update({
      where: { id: order.id },
      data: { authority: result.data.authority },
    });
    redirect(getStartPayUrl(result.data.authority));
  }

  // اگر درخواست پرداخت با خطا مواجه شد
  await prisma.order.update({ where: { id: order.id }, data: { status: "CANCELLED" } });
  redirect(`/payment/failed?orderId=${order.id}`);
}

export async function updateOrderStatus(formData) {
  const id = formData.get("id");
  const status = formData.get("status");
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
}
