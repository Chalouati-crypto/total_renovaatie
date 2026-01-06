"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "~/i18n/routing";
import { useTranslations } from "next-intl";
const locales = [
  { code: "en", label: "English", country: "gb" }, // 'gb' for the flag
  { code: "fr", label: "Français", country: "fr" },
  { code: "nl", label: "Nederlands", country: "nl" },
] as const;
export default function LanguageSwitcher() {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const handleLanguageChange = (nextLocale: "en" | "fr" | "nl") => {
    // We use replace to swap the locale while preserving the rest of the URL state
    router.replace(
      // @ts-expect-error - The routing types sometimes conflict with the dynamic params object in Next.js 15
      { pathname, params },
      { locale: nextLocale },
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-primary cursor-pointer rounded-full p-2 outline-none">
        <Languages className="h-5 w-5 text-white" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{t("choose_language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLanguageChange(locale.code)}
            className="flex cursor-pointer items-center gap-3 py-2"
          >
            {/* Using FlagCDN - clean and fast */}
            <img
              src={`https://flagcdn.com/w40/${locale.country}.png`}
              alt={locale.label}
              className="h-auto w-5 rounded-[2px] border border-slate-200 object-cover"
            />
            <span className="font-medium">{locale.code.toUpperCase()}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
