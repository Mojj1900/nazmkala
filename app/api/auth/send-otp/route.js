import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOtpSms } from "@/lib/sms";

function normalizePhone(phone) {
  return (phone || "").trim();
}

function isValidIranianMobile(phone) {
  return /^09\d{9}$/.test(phone);
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const phone = normalizePhone(body.phone);

  if (!isValidIranianMobile(phone)) {
    return NextResponse.json(
      { success: false, message: "شماره موبایل معتبر نیست." },
      { status: 400 }
    );
  }

  // جلوگیری از ارسال درخواست‌های خیلی پشت‌سرهم برای همون شماره
  const recentCode = await prisma.otpCode.findFirst({
    where: { phone, createdAt: { gt: new Date(Date.now() - 60 * 1000) } },
    orderBy: { createdAt: "desc" },
  });
  if (recentCode) {
    return NextResponse.json(
      { success: false, message: "کمی صبر کن و دوباره تلاش کن." },
      { status: 429 }
    );
  }

  const code = String(Math.floor(10000 + Math.random() * 90000)); // کد ۵ رقمی
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // ۲ دقیقه اعتبار

  await prisma.otpCode.create({ data: { phone, code, expiresAt } });

  try {
    await sendOtpSms(phone, code);
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "ارسال پیامک با خطا مواجه شد." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
