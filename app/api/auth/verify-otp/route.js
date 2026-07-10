import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signPhone, CUSTOMER_COOKIE } from "@/lib/customerAuth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const phone = (body.phone || "").trim();
  const code = (body.code || "").trim();

  if (!phone || !code) {
    return NextResponse.json({ success: false, message: "اطلاعات ناقص است." }, { status: 400 });
  }

  const otp = await prisma.otpCode.findFirst({
    where: { phone, code },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) {
    return NextResponse.json({ success: false, message: "کد وارد شده اشتباه است." }, { status: 400 });
  }

  if (otp.expiresAt < new Date()) {
    return NextResponse.json({ success: false, message: "کد منقضی شده. دوباره درخواست بده." }, { status: 400 });
  }

  // کد مصرف‌شده را پاک می‌کنیم تا دوباره قابل استفاده نباشد
  await prisma.otpCode.delete({ where: { id: otp.id } });

  // ساخت کاربر در صورت نبودن
  await prisma.user.upsert({
    where: { phone },
    update: {},
    create: { phone },
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set(CUSTOMER_COOKIE, signPhone(phone), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // یک ماه
  });
  return response;
}
