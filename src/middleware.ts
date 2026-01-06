import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// This MUST be the default export or named 'middleware'
export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en|nl)/:path*"],
};
