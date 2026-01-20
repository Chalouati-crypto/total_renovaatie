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
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const locales = [
  { code: "en", label: "English", country: "gb" },
  { code: "fr", label: "Français", country: "fr" },
  { code: "nl", label: "Nederlands", country: "nl" },
] as const;

export default function LanguageSwitcher({
  label = "Language",
}: {
  label?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = (nextLocale: string) => {
    // Standard Next.js way to swap locale in the URL
    // This regex replaces the first segment (the locale) with the new one
    const newPath = pathname.replace(`/${params.locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-primary cursor-pointer rounded-full p-2 outline-none">
        <Languages className="h-5 w-5 text-white" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLanguageChange(locale.code)}
            className="flex cursor-pointer items-center gap-3 py-2"
          >
            <Image
              src={`https://flagcdn.com/w40/${locale.country}.png`}
              alt={locale.label}
              width={20}
              height={10}
              className="h-auto w-5 rounded-[2px] border border-slate-200 object-cover"
            />
            <span className="font-medium">{locale.code.toUpperCase()}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
