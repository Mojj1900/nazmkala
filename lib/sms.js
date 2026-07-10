// اتصال به سرویس پیامک کاوه‌نگار برای ارسال کد تایید (OTP)
// مستندات رسمی: https://kavenegar.com/rest.html

export async function sendOtpSms(phone, code) {
  const apiKey = process.env.KAVENEGAR_API_KEY;
  const template = process.env.KAVENEGAR_TEMPLATE || "verify";

  if (!apiKey) {
    // اگر هنوز API Key تنظیم نشده، کد را در ترمینال چاپ می‌کنیم تا بتوانی در حالت توسعه تست کنی
    console.log(`⚠️ KAVENEGAR_API_KEY تنظیم نشده. کد تایید برای ${phone}: ${code}`);
    return { simulated: true };
  }

  const url = `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json?receptor=${encodeURIComponent(
    phone
  )}&token=${encodeURIComponent(code)}&template=${encodeURIComponent(template)}`;

  const res = await fetch(url);
  return res.json();
}
