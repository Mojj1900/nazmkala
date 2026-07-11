// این اسکریپت فقط دسته‌بندی‌های جدید اضافه می‌کند و چیزی را پاک نمی‌کند.
// اجرا با: npm run seed:categories

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// فقط از عکس‌هایی استفاده شده که همین الان روی سایتت تست شده و درست کار می‌کنند.
const newCategories = [
  {
    slug: "kamd-o-lebas",
    name: "نظم‌دهنده کمد و لباس",
    icon: "👕",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "zorof-shishei",
    name: "بانکه و ظروف شیشه‌ای",
    icon: "🫙",
    image: "https://images.unsplash.com/photo-1584346133934-a3044247ba82?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "zorof-yakhchali",
    name: "ظروف فریزری و یخچالی",
    icon: "❄️",
    image: "https://images.unsplash.com/photo-1584346133934-a3044247ba82?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "arayeshi",
    name: "استند و نظم‌دهنده لوازم آرایشی",
    icon: "💄",
    image: null,
  },
  {
    slug: "keshoo",
    name: "نظم‌دهنده کشو",
    icon: "🗄️",
    image: null,
  },
  {
    slug: "rakhtekhab",
    name: "کاور رخت‌خواب و پتو",
    icon: "🛏️",
    image: null,
  },
  {
    slug: "khodro",
    name: "نظم‌دهنده خودرو",
    icon: "🚗",
    image: null,
  },
  {
    slug: "jakafshi",
    name: "جاکفشی",
    icon: "👟",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=800&auto=format&fit=crop",
  },
];

async function main() {
  for (const cat of newCategories) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (existing) {
      console.log(`⏭️  «${cat.name}» از قبل وجود دارد، رد شد.`);
      continue;
    }
    await prisma.category.create({ data: cat });
    console.log(`✅ «${cat.name}» اضافه شد.`);
  }
  console.log("تمام شد 🎉");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
