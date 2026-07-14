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

export async function updateProduct(formData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const price = Number(formData.get("price"));
  const oldPriceRaw = formData.get("oldPrice");
  const oldPrice = oldPriceRaw ? Number(oldPriceRaw) : null;
  const stock = Number(formData.get("stock") || 0);
  const image = formData.get("image");
  const description = formData.get("description") || "";
  const categoryId = formData.get("categoryId");

  await prisma.product.update({
    where: { id },
    data: { title, price, oldPrice, stock, image, description, categoryId },
  });

  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function addProductImage(formData) {
  const productId = formData.get("productId");
  const url = formData.get("url");

  if (url) {
    await prisma.productImage.create({ data: { productId, url } });
  }

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/products");
}

export async function deleteProductImage(formData) {
  const id = formData.get("id");
  const productId = formData.get("productId");

  await prisma.productImage.delete({ where: { id } });

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/products");
}

export async function updateSettings(formData) {
  const storeName = formData.get("storeName") || "نظم‌کالا";
  const tagline = formData.get("tagline") || "";
  const bannerImage = formData.get("bannerImage") || null;

  await prisma.settings.upsert({
    where: { id: "main" },
    update: { storeName, tagline, bannerImage },
    create: { id: "main", storeName, tagline, bannerImage },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/", "layout");
}

export async function createCategory(formData) {
  const name = formData.get("name");
  const icon = formData.get("icon") || "📦";
  const image = formData.get("image") || null;

  await prisma.category.create({
    data: { name, slug: slugify(name), icon, image },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function updateCategory(formData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const icon = formData.get("icon") || "📦";
  const image = formData.get("image") || null;

  await prisma.category.update({
    where: { id },
    data: { name, icon, image },
  });

  revalidatePath(`/admin/categories/${id}`);
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

  let rawItems = [];
  try {
    rawItems = JSON.parse(itemsRaw || "[]");
  } catch (e) {
    rawItems = [];
  }

  if (!rawItems.length) {
    redirect("/cart");
  }

  // نکته امنیتی: هرگز به قیمت ارسالی از کلاینت اعتماد نمی‌کنیم.
  // قیمت و موجودی واقعی هر محصول را از دیتابیس می‌خوانیم تا کاربر
  // نتواند با دستکاری درخواست، مبلغ پرداختی را تغییر دهد.
  const productIds = rawItems.map((i) => i.id);
  const dbProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });
  const productMap = new Map(dbProducts.map((p) => [p.id, p]));

  const items = [];
  for (const raw of rawItems) {
    const product = productMap.get(raw.id);
    const qty = Math.max(1, Number(raw.qty) || 1);

    if (!product) continue; // محصولی که دیگر وجود ندارد نادیده گرفته می‌شود
    if (product.stock < qty) {
      // موجودی کافی نیست؛ کاربر را با پیام مناسب به سبد خرید برمی‌گردانیم
      redirect(`/cart?error=stock&product=${product.slug}`);
    }

    items.push({ id: product.id, qty, price: product.price });
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
    description: `پرداخت سفارش ${order.id.slice(0, 8)} - نظم‌کالا`,
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
