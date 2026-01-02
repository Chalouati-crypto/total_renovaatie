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

export default function LanguageSwitcher() {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const handleLanguageChange = (nextLocale: "en" | "fr") => {
    // We use replace to swap the locale while preserving the rest of the URL state
    router.replace(
      // @ts-expect-error - The routing types sometimes conflict with the dynamic params object in Next.js 15
      { pathname, params },
      { locale: nextLocale },
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-primary cursor-pointer rounded-full p-2">
        <Languages className="text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="cursor-pointer">
        <DropdownMenuLabel>{t("choose_language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleLanguageChange("fr")}
          className="cursor-pointer"
        >
          FR
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className="cursor-pointer"
        >
          EN
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
