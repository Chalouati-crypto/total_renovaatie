import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  // Fix Error 1: Use type guard instead of 'as any'
  const finalLocale =
    locale && routing.locales.includes(locale as "en" | "fr" | "nl")
      ? (locale as "en" | "fr" | "nl")
      : routing.defaultLocale;
  console.log("final locale", finalLocale);
  return {
    locale: finalLocale,
    // Fix Error 2: Type the dynamic import as 'Record<string, unknown>'
    messages: (
      (await import(`../../messages/${finalLocale}.json`)) as {
        default: Record<string, unknown>;
      }
    ).default,
  };
});
