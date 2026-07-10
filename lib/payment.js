// اتصال به درگاه پرداخت زرین‌پال (Zarinpal)
// مستندات رسمی: https://www.zarinpal.com/docs/paymentGateway/

const IS_SANDBOX = process.env.ZARINPAL_SANDBOX === "true";

const API_BASE = IS_SANDBOX
  ? "https://sandbox.zarinpal.com"
  : "https://api.zarinpal.com";

const STARTPAY_BASE = IS_SANDBOX
  ? "https://sandbox.zarinpal.com/pg/StartPay"
  : "https://www.zarinpal.com/pg/StartPay";

const REQUEST_URL = `${API_BASE}/pg/v4/payment/request.json`;
const VERIFY_URL = `${API_BASE}/pg/v4/payment/verify.json`;

// توجه: زرین‌پال مبلغ را به «ریال» می‌گیرد، اما ما در سایت با «تومان» کار می‌کنیم.
// به همین دلیل همیشه قبل از ارسال، مبلغ تومان را در ۱۰ ضرب می‌کنیم.
function tomanToRial(amountToman) {
  return amountToman * 10;
}

export async function requestZarinpalPayment({ amountToman, description, mobile, callbackUrl }) {
  const res = await fetch(REQUEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: tomanToRial(amountToman),
      description,
      callback_url: callbackUrl,
      metadata: mobile ? { mobile } : undefined,
    }),
  });
  return res.json();
}

export async function verifyZarinpalPayment({ amountToman, authority }) {
  const res = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: tomanToRial(amountToman),
      authority,
    }),
  });
  return res.json();
}

export function getStartPayUrl(authority) {
  return `${STARTPAY_BASE}/${authority}`;
}
