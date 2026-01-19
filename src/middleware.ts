import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "./features/auth/auth.const";

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/user/settings")) {
    const accessToken = request.cookies.get(SESSION_COOKIE_NAME);

    if (!accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/user/settings",
};
