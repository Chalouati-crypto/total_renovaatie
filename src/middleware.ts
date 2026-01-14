import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. DYNAMIC BYPASS LOGIC
  // We exclude /admin and /api to keep Payload "pure"
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.includes("_next") ||
    pathname === "/favicon.ico"
  ) {
    // This log will help you verify the bypass is hitting
    // console.log(`⏩ Bypassing i18n for: ${pathname}`);
    return NextResponse.next();
  }

  // 2. I18N LOGIC
  // This is only reached if the path is NOT an admin/api route
  return intlMiddleware(request);
}

export const config = {
  // Use a broad matcher; the function logic above does the heavy lifting
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(en|fr|de)/:path*"],
};
