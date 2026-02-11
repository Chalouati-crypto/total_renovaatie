"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import NavLink from "./nav-link";
import { Button } from "./ui/button";
import { Mail, Facebook, Instagram } from "lucide-react"; // Using Lucide for the "Turnkey" look
import LogoImage from "../../public/logo.png";
import Whatsapp from "./icons/whatsapp";
import LanguageSwitcher from "./language-switcher";
import MobileMenu from "./mobile-menu";
import Magnetic from "./magnetic";
import Link from "next/link";

export default function Header({
  labels,
}: {
  labels?: Record<string, string>;
}) {
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

  const [activeSection, setActiveSection] = useState("home");

  return (
    <header className="bg-background/80 sticky top-0 z-50 flex w-full items-center border-b border-white/10 px-[5vw] backdrop-blur-md">
      <Link href={"/"} className="flex-1">
        <Image
          src={LogoImage}
          alt="Company Logo"
          width={150}
          height={40}
          priority
          className="w-20 md:w-40"
        />
      </Link>

      <nav className="hidden flex-2 items-center justify-center gap-1 md:flex lg:gap-2">
        {navItems.map((item, index) => {
          return (
            <Magnetic key={index}>
              <NavLink
                section={labels[item] ?? item}
                targetId={item}
                isActive={activeSection === item}
              />
            </Magnetic>
          );
        })}
      </nav>

      <div className="hidden flex-1 items-center justify-end gap-1.5 md:flex">
        <div className="flex items-center gap-1.5">
          <Magnetic>
            <Button
              asChild
              size="icon"
              className="bg-[#25D366] hover:bg-[#25D366]/90 h-9 w-9 rounded-full text-white shadow-none border-none"
            >
              <a
                href="https://wa.me/32473260030?text=Hello, I am interested in your services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Whatsapp className="h-5 w-5 fill-current" />
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              asChild
              size="icon"
              className="bg-primary hover:bg-primary/90 h-9 w-9 rounded-full text-white shadow-none border-none"
            >
              <a href="mailto:Info@comfort-home.pro?subject=Project Inquiry">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              asChild
              size="icon"
              className="bg-[#1877F2] hover:bg-[#1877F2]/90 h-9 w-9 rounded-full text-white shadow-none border-none"
            >
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              asChild
              size="icon"
              className="bg-[#E4405F] hover:bg-[#E4405F]/90 h-9 w-9 rounded-full text-white shadow-none border-none"
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
          </Magnetic>
        </div>
        <div className="bg-primary/20 mx-1 h-6 w-px" />
        <LanguageSwitcher />
      </div>
      <MobileMenu navItems={navItems} labels={labels} />
    </header>
  );
}
