import { prisma } from "./prisma";

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { createdAt: "asc" } });
}

export async function getProducts({ categorySlug, q } = {}) {
  return prisma.product.findMany({
    where: {
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      ...(q ? { title: { contains: q } } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlugDb(slug) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getStats() {
  const [productCount, categoryCount, orderCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);
  return { productCount, categoryCount, orderCount, userCount };
}

export async function getOrders() {
  return prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUsers() {
  return prisma.user.findMany({
    include: { orders: true },
    orderBy: { createdAt: "desc" },
  });
}
