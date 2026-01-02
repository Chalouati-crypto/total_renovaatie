"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import NavLink from "./nav-link";
import { Link } from "~/i18n/routing";
import { Button } from "./ui/button";
import { Mail } from "lucide-react"; // Using Lucide for the "Turnkey" look
import { useTranslations } from "next-intl";

import Whatsapp from "./icons/whatsapp";
import LanguageSwitcher from "./language-switcher";
export default function Header() {
  const navItems = useMemo(
    () => ["home", "about", "services", "work", "contact"],
    [],
  );
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Only update if the section is intersecting
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      // This makes the active zone the top 40% of the screen
      rootMargin: "0px 0px -60% 0px",
      threshold: 0.2, // Only 20% of the section needs to be visible to trigger
    });

    // We observe each section by ID
    navItems.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // CLEANUP: This is vital to prevent memory leaks
    return () => {
      observer.disconnect();
    };
  }, [navItems]); // The dependency array ensures this runs once

  const t = useTranslations("Navbar");
  const [activeSection, setActiveSection] = useState("home");

  return (
    <header className="bg-background/80 sticky top-0 z-50 mx-auto flex w-[95vw] items-center border-b border-white/10 backdrop-blur-md">
      <Link href={"/"} className="flex-1">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={150}
          height={40}
          priority
          className="h-auto w-30 md:w-37.5"
        />
      </Link>

      <nav className="flex flex-1 items-center justify-center gap-2">
        {navItems.map((item, index) => {
          return (
            <NavLink
              key={index}
              section={t(item)}
              targetId={item}
              isActive={activeSection === item}
            />
          );
        })}
      </nav>

      <div className="flex flex-1 items-center justify-end gap-2">
        <Button
          className="hover:bg-primary text-primary border-primary rounded-full border-2 bg-none p-4 px-4 shadow-none hover:text-white"
          asChild
          variant="outline"
        >
          <a href="mailto:client@example.com?subject=Project Inquiry">
            <Mail className="mr-2 h-4 w-4" />
            {t("email_us")}
          </a>
        </Button>
        <Button
          asChild
          className="hover:bg-background hover:text-primary hover:border-primary rounded-full px-4 text-white shadow-none hover:border"
        >
          <a
            href="https://wa.me/+32473260030?text=Hello, I am interested in your services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Whatsapp className="mr-2 h-24 w-24" />
            +32 473 26 00 30
          </a>
        </Button>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
