import { webcrypto } from "node:crypto";

// این فایل توکن ورود ادمین را با HMAC-SHA256 امضا می‌کند و یک زمان انقضای
// واقعی داخل خود توکن قرار می‌دهد. برخلاف قبل که کوکی برابر با یک مقدار
// ثابت (AUTH_SECRET) بود و هیچ‌وقت منقضی نمی‌شد، این توکن بعد از گذشت
// SESSION_DURATION_MS دیگر معتبر نیست، حتی اگر کوکی لو برود.

const encoder = new TextEncoder();

export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // یک هفته

async function importKey(secret) {
  return webcrypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminSessionToken() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET تنظیم نشده است");

  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const key = await importKey(secret);
  const signature = await webcrypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(String(expiresAt))
  );

  return `${expiresAt}.${toHex(signature)}`;
}
