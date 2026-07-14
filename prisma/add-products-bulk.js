// این اسکریپت ۸۰ محصول پرطرفدار (۱۰ تا برای هر کدوم از ۸ دسته‌بندی نظم‌دهنده) اضافه می‌کنه.
// چیزی رو پاک نمی‌کنه و اگه محصولی با همون slug از قبل وجود داشته باشه، ردش می‌کنه.
// اجرا با: npm run seed:products-bulk
//
// نکته مهم درباره عکس‌ها:
// عکس‌های زیر فقط از همون آدرس‌هایی استفاده شدن که قبلاً روی خود همین سایت تست شده و
// درست لود می‌شن (همون‌هایی که توی add-categories.js هم هستن)، تا مشکل «عکس شکسته» پیش نیاد.
// این عکس‌ها فقط عکسِ نمونه/جنریک هستن، نه عکس واقعی هر محصول.
// بعداً از پنل ادمین (/admin/products) می‌تونی برای هر محصول یه عکس واقعی و مخصوص خودش
// جایگزین کنی (با روش «Copy Image Address» که قبلاً گفتیم، نه کپی لینک صفحه).

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// عکس‌های تستِ سالم (به‌ازای هر دسته یکی، تا لود عکس مطمئن باشه)
const IMG_CLOSET = "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=800&auto=format&fit=crop";
const IMG_CONTAINER = "https://images.unsplash.com/photo-1584346133934-a3044247ba82?q=80&w=800&auto=format&fit=crop";
const IMG_SHOE = "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=800&auto=format&fit=crop";
const IMG_VACUUM = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop";

const productsByCategory = {
  // 👕 نظم‌دهنده کمد و لباس
  "kamd-o-lebas": [
    { slug: "kamd-cover-lebas-zedgard", title: "کاور لباس ضدگرد و رطوبت", price: 185000, stock: 40, rating: 4.4 },
    { slug: "kamd-regal-tashow-steel", title: "رگال لباس تاشو استیل", price: 890000, oldPrice: 990000, stock: 15, rating: 4.6 },
    { slug: "kamd-nazm-keshoyi-zir-takht", title: "نظم‌دهنده کشویی زیرتخت", price: 420000, stock: 25, rating: 4.3 },
    { slug: "kamd-box-lebas-fasli", title: "باکس نگهداری لباس فصلی شفاف", price: 260000, stock: 35, rating: 4.5 },
    { slug: "kamd-aviz-chandtabaghe", title: "آویز چندطبقه شلوار و شال", price: 195000, stock: 30, rating: 4.2 },
    { slug: "kamd-nazm-jorab-shortab", title: "نظم‌دهنده جوراب و شورت کشویی", price: 145000, stock: 50, rating: 4.4 },
    { slug: "kamd-sabad-parchei-tashow", title: "سبد پارچه‌ای تاشوی لباس", price: 175000, stock: 28, rating: 4.1 },
    { slug: "kamd-aviz-divari-kif", title: "آویز دیواری کیف و کمربند", price: 155000, stock: 22, rating: 4.0 },
    { slug: "kamd-jodakonande-keshoo", title: "جداکننده کشو لباس پلاستیکی", price: 130000, stock: 45, rating: 4.3 },
    { slug: "kamd-cover-kot-zip", title: "کاور کت و پالتو زیپ‌دار", price: 210000, stock: 20, rating: 4.5 },
  ],

  // 🫙 بانکه و ظروف شیشه‌ای
  "zorof-shishei": [
    { slug: "banke-shishei-darb-choobi", title: "ست بانکه شیشه‌ای درب چوبی", price: 650000, oldPrice: 780000, stock: 18, rating: 4.7 },
    { slug: "banke-adviyedan-mini-6", title: "ست ادویه‌دان مینی ۶ تایی", price: 320000, stock: 30, rating: 4.5 },
    { slug: "banke-berenj-hobobat", title: "شیشه نگهداری برنج و حبوبات بزرگ", price: 280000, stock: 25, rating: 4.4 },
    { slug: "banke-dahangoshad-morabba", title: "بانکه دهان‌گشاد مربا و ترشی", price: 165000, stock: 40, rating: 4.2 },
    { slug: "banke-ghand-chai", title: "ظرف شیشه‌ای قند و چای", price: 195000, stock: 32, rating: 4.3 },
    { slug: "banke-boteel-roghan-serke", title: "بطری دربدار روغن و سرکه", price: 145000, stock: 35, rating: 4.1 },
    { slug: "banke-shokolat-ajil", title: "بانکه رومیزی شکلات و آجیل", price: 225000, stock: 28, rating: 4.5 },
    { slug: "banke-adviyedan-charkhan", title: "ادویه‌دان چرخان شیشه‌ای", price: 385000, stock: 16, rating: 4.6 },
    { slug: "banke-ard", title: "ظرف شیشه‌ای نگهداری آرد", price: 210000, stock: 22, rating: 4.2 },
    { slug: "banke-kare-panir", title: "بانکه دهان‌گشاد کره و پنیر", price: 155000, stock: 30, rating: 4.0 },
  ],

  // ❄️ ظروف فریزری و یخچالی
  "zorof-yakhchali": [
    { slug: "yakhchal-set-zoroof-silikoni", title: "ست ظروف دردار سیلیکونی ضدنشتی", price: 480000, oldPrice: 560000, stock: 20, rating: 4.6 },
    { slug: "yakhchal-zarf-freezer-morab", title: "ظرف فریزری مربعی استک‌شونده", price: 165000, stock: 40, rating: 4.3 },
    { slug: "yakhchal-sabad-mive-sabzi", title: "سبد نگهداری میوه و سبزی یخچال", price: 220000, stock: 28, rating: 4.4 },
    { slug: "yakhchal-organizer-tabaghe", title: "ارگانایزر طبقه‌بندی داخل یخچال", price: 290000, stock: 18, rating: 4.5 },
    { slug: "yakhchal-zarf-tokhmemorgh", title: "ظرف تخم‌مرغ یخچالی", price: 95000, stock: 45, rating: 4.1 },
    { slug: "yakhchal-kise-freezer-zip", title: "کیسه فریزر زیپ‌دار چندبارمصرف", price: 120000, stock: 60, rating: 4.2 },
    { slug: "yakhchal-zarf-sabzi-khordshode", title: "ظرف نگهداری سبزی خردشده", price: 110000, stock: 38, rating: 4.0 },
    { slug: "yakhchal-ja-botri-darb", title: "جابطری درب یخچال", price: 175000, stock: 22, rating: 4.3 },
    { slug: "yakhchal-ghaleb-yakh-silikoni", title: "قالب یخ سیلیکونی چندخانه", price: 85000, stock: 55, rating: 4.4 },
    { slug: "yakhchal-sabad-keshoyi-zir", title: "سبد کشویی زیر یخچال", price: 240000, stock: 20, rating: 4.2 },
  ],

  // 💄 استند و نظم‌دهنده آرایشی
  "arayeshi": [
    { slug: "arayeshi-estand-charkhan", title: "استند چرخان رومیزی لوازم آرایش", price: 350000, oldPrice: 420000, stock: 18, rating: 4.6 },
    { slug: "arayeshi-jaebe-acrylic", title: "جعبه آکریلیک شفاف آرایشی", price: 410000, stock: 15, rating: 4.7 },
    { slug: "arayeshi-nazm-keshoyi-lak", title: "نظم‌دهنده کشویی لاک و رژ", price: 195000, stock: 30, rating: 4.3 },
    { slug: "arayeshi-sabad-bores-ghalam", title: "سبد نگهداری برس و قلم‌مو", price: 130000, stock: 35, rating: 4.2 },
    { slug: "arayeshi-ayeneh-led", title: "آینه رومیزی با نور LED", price: 620000, stock: 12, rating: 4.5 },
    { slug: "arayeshi-jaetri-chandtabaghe", title: "جاعطری چندطبقه", price: 175000, stock: 25, rating: 4.1 },
    { slug: "arayeshi-kif-mosaferati", title: "کیف مسافرتی لوازم آرایش", price: 220000, stock: 28, rating: 4.4 },
    { slug: "arayeshi-nazm-divari-hamam", title: "نظم‌دهنده دیواری حمام", price: 165000, stock: 32, rating: 4.0 },
    { slug: "arayeshi-sabad-parchei-keshoo", title: "سبد پارچه‌ای کشوی آرایشی", price: 110000, stock: 40, rating: 4.1 },
    { slug: "arayeshi-jaebe-zivarat", title: "جعبه نگهداری زیورآلات", price: 290000, stock: 20, rating: 4.5 },
  ],

  // 🗄️ نظم‌دهنده کشو
  "keshoo": [
    { slug: "keshoo-tafkik-tanzimi", title: "ست تقسیم‌کننده کشو قابل تنظیم", price: 260000, oldPrice: 310000, stock: 25, rating: 4.5 },
    { slug: "keshoo-ghashogh-changal", title: "نظم‌دهنده کشو قاشق و چنگال", price: 175000, stock: 30, rating: 4.3 },
    { slug: "keshoo-jodakonande-lebaszir", title: "جداکننده کشو لباس‌زیر و جوراب", price: 140000, stock: 38, rating: 4.2 },
    { slug: "keshoo-sabad-tahrir", title: "سبد کشویی لوازم‌التحریر", price: 120000, stock: 40, rating: 4.0 },
    { slug: "keshoo-nazm-hamam", title: "نظم‌دهنده کشو حمام", price: 130000, stock: 28, rating: 4.1 },
    { slug: "keshoo-taghsim-kabinet", title: "تقسیم‌کننده کشو کابینت", price: 165000, stock: 32, rating: 4.3 },
    { slug: "keshoo-jaebe-adviye", title: "جعبه کشویی ادویه و چاشنی", price: 155000, stock: 26, rating: 4.2 },
    { slug: "keshoo-nazm-edari", title: "نظم‌دهنده کشو میز اداری", price: 145000, stock: 24, rating: 4.1 },
    { slug: "keshoo-sabad-shafaf-yakhchal", title: "سبد شفاف کشو یخچال", price: 135000, stock: 22, rating: 4.0 },
    { slug: "keshoo-taghsim-darvar", title: "تقسیم‌کننده کشو دراور اتاق‌خواب", price: 190000, stock: 20, rating: 4.4 },
  ],

  // 🛏️ کاور رخت‌خواب و پتو
  "rakhtekhab": [
    { slug: "rakht-cover-tashak-mosaferati", title: "کاور تشک مسافرتی", price: 210000, stock: 18, rating: 4.2 },
    { slug: "rakht-cover-nayloni-zedab", title: "کاور نایلونی ضدآب پتو", price: 145000, stock: 30, rating: 4.1 },
    { slug: "rakht-kise-khala-feshari", title: "کیسه خلاء فشرده‌ساز لباس و پتو", price: 165000, oldPrice: 195000, stock: 35, rating: 4.5 },
    { slug: "rakht-cover-balesh-metka", title: "کاور بالش و متکا زیپ‌دار", price: 95000, stock: 45, rating: 4.0 },
    { slug: "rakht-set-rotakhti-cover", title: "ست روتختی با کاور", price: 890000, stock: 12, rating: 4.6 },
    { slug: "rakht-cover-lahaf-zemestani", title: "کاور لحاف زمستانی", price: 220000, stock: 20, rating: 4.3 },
    { slug: "rakht-kif-mosaferati-rakht", title: "کیف مسافرتی رخت‌خواب", price: 250000, stock: 16, rating: 4.2 },
    { slug: "rakht-cover-nazm-kamd", title: "کاور نظم‌دهنده کمد رخت‌خواب", price: 195000, stock: 22, rating: 4.1 },
    { slug: "rakht-kise-tashow-feshorde", title: "کیسه تاشوی فشرده لباس", price: 130000, stock: 28, rating: 4.0 },
    { slug: "rakht-cover-mohafez-tashak", title: "کاور محافظ تشک و مبل", price: 275000, stock: 15, rating: 4.4 },
  ],

  // 🚗 نظم‌دهنده خودرو
  "khodro": [
    { slug: "khodro-sabad-sandogh-aghab", title: "سبد نظم‌دهنده صندوق‌عقب", price: 320000, oldPrice: 380000, stock: 20, rating: 4.5 },
    { slug: "khodro-ja-mobile-livan", title: "جاموبایلی و لیوان بین‌صندلی", price: 145000, stock: 35, rating: 4.2 },
    { slug: "khodro-aviz-poshte-sandali", title: "آویز پشت‌صندلی چندجیب", price: 195000, stock: 28, rating: 4.4 },
    { slug: "khodro-sabad-dashboard", title: "سبد نظم‌دهنده داشبورد", price: 110000, stock: 40, rating: 4.1 },
    { slug: "khodro-satl-zobale-aviz", title: "سطل زباله آویز خودرو", price: 130000, stock: 32, rating: 4.3 },
    { slug: "khodro-ja-dastmal", title: "جادستمال‌کاغذی خودرو", price: 95000, stock: 45, rating: 4.0 },
    { slug: "khodro-ja-sooeech-maghnatisi", title: "جاسوئیچی مغناطیسی داشبورد", price: 65000, stock: 50, rating: 4.2 },
    { slug: "khodro-cover-mohafez-sandali", title: "کاور محافظ صندلی", price: 285000, stock: 18, rating: 4.4 },
    { slug: "khodro-sabad-vasayel-darb", title: "سبد نگهداری وسایل درب ماشین", price: 105000, stock: 30, rating: 4.1 },
    { slug: "khodro-organizer-jaebe-abzar", title: "ارگانایزر جعبه‌ابزار صندوق‌عقب", price: 260000, stock: 22, rating: 4.3 },
  ],

  // 👟 جاکفشی
  "jakafshi": [
    { slug: "jakafshi-chandtabaghe-felezi", title: "جاکفشی چندطبقه فلزی", price: 620000, oldPrice: 720000, stock: 16, rating: 4.5 },
    { slug: "jakafshi-kafshkan-stacking", title: "کفش‌کن پلاستیکی روهم‌چین", price: 185000, stock: 35, rating: 4.2 },
    { slug: "jakafshi-keshoyi-zir-takht", title: "جاکفشی کشویی زیر تخت", price: 260000, stock: 22, rating: 4.3 },
    { slug: "jakafshi-divari-jibdar", title: "جاکفشی دیواری جیب‌دار", price: 195000, stock: 28, rating: 4.1 },
    { slug: "jakafshi-aviz-poshte-dar", title: "جاکفشی آویز پشت‌در کمد", price: 145000, stock: 40, rating: 4.0 },
    { slug: "jakafshi-box-shafaf", title: "باکس شفاف نگهداری کفش", price: 90000, stock: 55, rating: 4.4 },
    { slug: "jakafshi-roomizi-choobi", title: "جاکفشی رومیزی چوبی", price: 350000, stock: 14, rating: 4.6 },
    { slug: "jakafshi-kafshkan-charkhan", title: "کفش‌کن چرخشی کم‌فضا", price: 780000, stock: 10, rating: 4.5 },
    { slug: "jakafshi-tashow-mosaferati", title: "جاکفشی تاشوی مسافرتی", price: 165000, stock: 25, rating: 4.2 },
    { slug: "jakafshi-sabad-varzeshi", title: "سبد نظم‌دهنده کفش ورزشی", price: 130000, stock: 30, rating: 4.1 },
  ],
};

const categoryImages = {
  "kamd-o-lebas": IMG_CLOSET,
  "zorof-shishei": IMG_CONTAINER,
  "zorof-yakhchali": IMG_CONTAINER,
  "arayeshi": IMG_CLOSET,
  "keshoo": IMG_CONTAINER,
  "rakhtekhab": IMG_CLOSET,
  "khodro": IMG_VACUUM,
  "jakafshi": IMG_SHOE,
};

const descriptions = {
  "kamd-o-lebas": "محصولی کاربردی برای نظم‌دهی و نگهداری بهتر لباس‌ها در کمد یا کشو.",
  "zorof-shishei": "ظرف شیشه‌ای با کیفیت غذایی، مناسب نگهداری مواد غذایی خشک و تر در آشپزخانه.",
  "zorof-yakhchali": "طراحی‌شده برای نظم‌دهی و نگهداری بهینه مواد غذایی داخل یخچال و فریزر.",
  "arayeshi": "کمک می‌کند لوازم آرایشی و بهداشتی همیشه مرتب و در دسترس باشند.",
  "keshoo": "نظم‌دهنده کشو برای جداسازی و دسترسی سریع‌تر به وسایل کوچک.",
  "rakhtekhab": "مناسب نگهداری، جمع‌آوری و محافظت از رخت‌خواب و پتو در طول سال.",
  "khodro": "نظم‌دهنده مخصوص فضای داخل خودرو، ساده برای نصب و استفاده روزمره.",
  "jakafshi": "راه‌حلی جمع‌وجور برای نگهداری منظم کفش‌های خانواده.",
};

async function main() {
  let createdCount = 0;
  let skippedCount = 0;
  let missingCategoryCount = 0;

  for (const [categorySlug, products] of Object.entries(productsByCategory)) {
    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });

    if (!category) {
      console.log(`⚠️  دسته‌بندی «${categorySlug}» پیدا نشد، ۱۰ محصول این دسته رد شدن.`);
      missingCategoryCount += products.length;
      continue;
    }

    for (const p of products) {
      const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
      if (existing) {
        console.log(`⏭️  «${p.title}» از قبل وجود دارد، رد شد.`);
        skippedCount += 1;
        continue;
      }

      await prisma.product.create({
        data: {
          slug: p.slug,
          title: p.title,
          description: descriptions[categorySlug],
          price: p.price,
          oldPrice: p.oldPrice || null,
          stock: p.stock,
          rating: p.rating,
          image: categoryImages[categorySlug],
          categoryId: category.id,
        },
      });
      console.log(`✅ «${p.title}» اضافه شد.`);
      createdCount += 1;
    }
  }

  console.log("\n--- خلاصه ---");
  console.log(`✅ ${createdCount} محصول جدید اضافه شد`);
  console.log(`⏭️  ${skippedCount} محصول تکراری رد شد`);
  if (missingCategoryCount > 0) {
    console.log(`⚠️  ${missingCategoryCount} محصول به‌خاطر نبود دسته‌بندی اضافه نشدن`);
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
