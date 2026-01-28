import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. IMPROVED BYPASS LOGIC
  // We check for admin, api, _next, AND any path that contains a "." (file extension)
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.includes("_next") ||
    pathname.includes(".") // 👈 This catches logo.png, sitemap.xml, etc.
  ) {
    return NextResponse.next();
  }

  // 2. I18N LOGIC
  return intlMiddleware(request);
}

export const config = {
  // This matcher is the "standard" for next-intl.
  // It ignores anything with a dot (files) and the internal folders.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any path containing a dot (e.g. logo.png)
     */
    "/((?!api|_next/static|_next/image|admin|.*\\..*).*)",
  ],
};
