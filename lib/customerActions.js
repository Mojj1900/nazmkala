"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CUSTOMER_COOKIE } from "./customerAuth";

export async function logoutCustomer() {
  cookies().delete(CUSTOMER_COOKIE);
  redirect("/");
}
