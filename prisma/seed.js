const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = [
  { slug: "tazkiye", name: "تنظیف و نظافت", icon: "🧹" },
  { slug: "sarv-o-samane", name: "صرف و صمان", icon: "🧺" },
  { slug: "ashpazkhane", name: "آشپزخانه", icon: "🍽️" },
  { slug: "tanzimkonande", name: "تنظیم‌کننده‌ها", icon: "📦" },
];

const products = [
  {
    slug: "jaeksiri-chandtabaghe",
    title: "جاکفشی چندطبقه رامش",
    price: 890000,
    oldPrice: 1050000,
    categorySlug: "tanzimkonande",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    stock: 12,
    description: "جاکفشی ۵ طبقه با بدنه مقاوم، مناسب راهرو و ورودی منزل. جمع‌وجورشونده و قابل شست‌وشو.",
  },
  {
    slug: "sabad-negahdari-lebas",
    title: "سبد نگهداری لباس تاشو",
    price: 320000,
    categorySlug: "tanzimkonande",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=800&auto=format&fit=crop",
    rating: 4.3,
    stock: 30,
    description: "سبد پارچه‌ای تاشو برای نگهداری منظم لباس‌های فصلی.",
  },
  {
    slug: "sat-ashpazkhane-set-6",
    title: "ست ۶ تکه ظرف‌های نگهداری آشپزخانه",
    price: 540000,
    categorySlug: "ashpazkhane",
    image: "https://images.unsplash.com/photo-1584346133934-a3044247ba82?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    stock: 20,
    description: "ست ظروف نگهداری غذا با درب سیلیکونی ضدنشتی، مناسب یخچال و فریزر.",
  },
  {
    slug: "jaroo-barghi-shargi",
    title: "جارو شارژی بی‌سیم",
    price: 2150000,
    categorySlug: "tazkiye",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    stock: 8,
    description: "جارو شارژی سبک با باتری قابل تعویض، مناسب نظافت روزانه منزل.",
  },
];

async function main() {
  console.log("در حال پاک‌سازی دیتابیس...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("در حال ساخت دسته‌بندی‌ها...");
  const categoryMap = {};
  for (const c of categories) {
    const created = await prisma.category.create({ data: c });
    categoryMap[c.slug] = created.id;
  }

  console.log("در حال ساخت محصولات...");
  for (const p of products) {
    const { categorySlug, ...rest } = p;
    await prisma.product.create({
      data: { ...rest, categoryId: categoryMap[categorySlug] },
    });
  }

  console.log("Seed با موفقیت انجام شد ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
