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
  try {
    const body = await request.json().catch(() => ({}));
    const phone = normalizePhone(body.phone);

    if (!isValidIranianMobile(phone)) {
      return NextResponse.json(
        { success: false, message: "شماره موبایل معتبر نیست." },
        { status: 400 }
      );
    }

    // ... بقیه کدت بدون تغییر

  } catch (error) {
    console.error("Send OTP Error:", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}
