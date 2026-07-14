"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminSessionToken, SESSION_DURATION_MS } from "./adminAuth";

const COOKIE_NAME = "admin_auth";

export async function loginAdmin(formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.AUTH_SECRET;

  if (username === validUsername && password === validPassword && secret) {
    const token = await createAdminSessionToken();
    cookies().set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_MS / 1000, // یک هفته
    });
    redirect("/admin");
  }

  redirect("/admin-login?error=1");
}

export async function logoutAdmin() {
  cookies().delete(COOKIE_NAME);
  redirect("/admin-login");
}
