// این فایل فقط توابع کمکی مشترک را نگه می‌دارد.
// دیتای واقعی محصولات/دسته‌بندی‌ها اکنون از دیتابیس (lib/queries.js) خوانده می‌شود.

export function formatToman(n) {
  return new Intl.NumberFormat("fa-IR").format(n) + " تومان";
}
