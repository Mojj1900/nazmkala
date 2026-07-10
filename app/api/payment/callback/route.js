import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyZarinpalPayment } from "@/lib/payment";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // کاربر پرداخت را در درگاه لغو کرده یا انصراف داده
  if (!orderId || !authority || status !== "OK") {
    if (orderId) {
      await prisma.order
        .update({ where: { id: orderId }, data: { status: "CANCELLED" } })
        .catch(() => {});
    }
    return NextResponse.redirect(`${baseUrl}/payment/failed?orderId=${orderId || ""}`);
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.redirect(`${baseUrl}/payment/failed`);
  }

  // اگر قبلاً تایید شده (مثلاً کاربر صفحه را رفرش کرده)
  if (order.status === "PAID") {
    return NextResponse.redirect(
      `${baseUrl}/payment/success?orderId=${order.id}&refId=${order.refId || ""}`
    );
  }

  const result = await verifyZarinpalPayment({
    amountToman: order.totalPrice,
    authority,
  });

  // code 100 یعنی تایید موفق، 101 یعنی قبلاً تایید شده
  if (result?.data?.code === 100 || result?.data?.code === 101) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "PAID", refId: String(result.data.ref_id || "") },
    });
    return NextResponse.redirect(
      `${baseUrl}/payment/success?orderId=${order.id}&refId=${result.data.ref_id || ""}`
    );
  }

  await prisma.order.update({ where: { id: order.id }, data: { status: "CANCELLED" } });
  return NextResponse.redirect(`${baseUrl}/payment/failed?orderId=${order.id}`);
}
