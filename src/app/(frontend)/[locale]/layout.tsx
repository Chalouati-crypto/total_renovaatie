import "~/styles/globals.css";

import { geistSans, jetBrainsMono } from "../../fonts";
import Header from "~/components/header";
import ReactLenis from "lenis/react";
import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";
import { getPayload } from "payload";
import configPromise from "~/payload.config";
import TrustBanner from "~/components/trust-banner";
import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://comfort-home.pro"),
  title: {
    default: "Comfort Home | Professional Services",
    template: "%s | Comfort Home",
  },
  description: "Your premium Next.js site description",
  icons: {
    icon: [
      { url: "/favicon.ico" }, // Usually in /public/favicon.ico
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 1. Validate locale
  // 1. Define a type for your supported locales based on your routing config
  type Locale = (typeof routing.locales)[number];

  // 2. Use a Type Guard to check the locale safely
  const isValidLocale = routing.locales.includes(locale as Locale);

  if (!isValidLocale) {
    notFound();
  }
  const payload = await getPayload({ config: configPromise });
  const siteSettings = await payload.findGlobal({
    slug: "site-settings",
    locale: locale,
    // Add caching to make this instant after the first load
    next: { revalidate: 3600 },
  });
  // 2. Fetch messages on the server

  return (
    <html
      lang={locale}
      className={`${geistSans.className} ${jetBrainsMono.variable}`}
    >
      <head>
        {/* 1. Preconnect to your Media Domain */}
        {/* This starts the handshake with Vercel Blob immediately */}
        <link
          rel="preconnect"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* NextIntlClientProvider MUST wrap Header to fix your error */}
        <ReactLenis root>
          <TrustBanner />
          <Header
            labels={{
              email_us: siteSettings.emailButtonText || "Email Us",
              whatsapp: siteSettings.whatsappButtonText || "WhatsApp",
              // You can add nav labels to Payload or hardcode them here for now
              home: locale === "nl" ? "Home" : "Home",
              about: locale === "nl" ? "Over ons" : "About",
              services: locale === "nl" ? "Diensten" : "Services",
              work: locale === "nl" ? "Projecten" : "Work",
              contact: locale === "nl" ? "Contact" : "Contact",
            }}
          />
          <main>{children}</main>
        </ReactLenis>
      </body>
    </html>
  );
}
