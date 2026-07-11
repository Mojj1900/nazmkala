/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**" },
    ],
    // پردازش سمت‌سرور عکس‌ها غیرفعال می‌شود تا با هر سیستمی بدون مشکل کار کند
    unoptimized: true,
  },
};

export default nextConfig;
