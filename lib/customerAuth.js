import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";
export const CUSTOMER_COOKIE = "customer_session";

export function signPhone(phone) {
  const hmac = crypto.createHmac("sha256", SECRET).update(phone).digest("hex");
  return `${phone}.${hmac}`;
}

export function verifyPhoneToken(token) {
  if (!token) return null;
  const [phone, hmac] = token.split(".");
  if (!phone || !hmac) return null;
  const expected = crypto.createHmac("sha256", SECRET).update(phone).digest("hex");
  if (expected !== hmac) return null;
  return phone;
}
