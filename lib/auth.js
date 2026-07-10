"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_auth";

export async function loginAdmin(formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.AUTH_SECRET;

  if (username === validUsername && password === validPassword && secret) {
    cookies().set(COOKIE_NAME, secret, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // یک هفته
    });
    redirect("/admin");
  }

  redirect("/admin-login?error=1");
}

export async function logoutAdmin() {
  cookies().delete(COOKIE_NAME);
  redirect("/admin-login");
}
