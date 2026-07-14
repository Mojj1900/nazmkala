-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "storeName" TEXT NOT NULL DEFAULT 'نظم‌کالا',
    "tagline" TEXT NOT NULL DEFAULT 'هر خانه‌ای، شایسته آرامش و نظم است.',
    "bannerImage" TEXT,
    "updatedAt" DATETIME NOT NULL
);
