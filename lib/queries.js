import { prisma } from "./prisma";

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { createdAt: "asc" } });
}

export async function getSettings() {
  return prisma.settings.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });
}

export async function getCategoryById(id) {
  return prisma.category.findUnique({ where: { id } });
}

export async function getProducts({ categorySlug, q } = {}) {
  return prisma.product.findMany({
    where: {
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      ...(q ? { title: { contains: q } } : {}),
    },
    include: { category: true, images: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlugDb(slug) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true, images: { orderBy: { createdAt: "asc" } } },
  });
}

export async function getProductById(id) {
  return prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { createdAt: "asc" } } },
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
