import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_auth";
const encoder = new TextEncoder();

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// توکن باید هم امضای معتبر (با AUTH_SECRET) داشته باشد و هم منقضی نشده باشد.
// این باعث می‌شود اگر کوکی جایی لو برود، فقط تا پایان مدت نشست (نه برای همیشه) کار کند.
async function verifyAdminToken(token, secret) {
  if (!token || !secret) return false;

  const [expiresAtRaw, signature] = token.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expectedSigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(expiresAtRaw)
  );
  const expectedSig = toHex(expectedSigBuffer);

  if (expectedSig.length !== signature.length) return false;

  // مقایسه با زمان ثابت برای جلوگیری از حمله timing attack
  let diff = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    diff |= expectedSig.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return diff === 0;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const cookie = request.cookies.get(COOKIE_NAME)?.value;
    const secret = process.env.AUTH_SECRET;
    const isValid = await verifyAdminToken(cookie, secret);

    if (!isValid) {
      const loginUrl = new URL("/admin-login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
