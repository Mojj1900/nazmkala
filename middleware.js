import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const cookie = request.cookies.get(COOKIE_NAME)?.value;
    const secret = process.env.AUTH_SECRET;

    if (!cookie || !secret || cookie !== secret) {
      const loginUrl = new URL("/admin-login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
