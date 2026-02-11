"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// 1. Remove Link from next-intl, use standard a tags for hash links
import { Mail, X, Menu, Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import Whatsapp from "./icons/whatsapp";
import LanguageSwitcher from "./language-switcher";

interface MobileMenuProps {
  navItems: string[];
  labels: Record<string, string>; // 2. Add labels prop
}

export default function MobileMenu({ navItems, labels }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: "100%", // Cleaner transition
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative z-[110] md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="bg-background fixed inset-0 z-[100] flex h-screen w-screen flex-col overflow-y-auto p-8 pt-24 md:hidden"
          >
            <div className="flex flex-col md:hidden">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium tracking-widest text-slate-400 uppercase">
                  {labels.language ?? "Language"}
                </span>
                {/* 3. Pass label to LanguageSwitcher if needed */}
                <LanguageSwitcher label={labels.choose_language} />
              </div>
              <nav className="flex flex-col gap-6 border-b border-white/10 pb-4">
                {navItems.map((item) => (
                  <motion.div key={item} variants={itemVariants}>
                    <a
                      href={`#${item}`}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-primary text-4xl font-bold tracking-tight"
                    >
                      {/* 4. Use labels prop instead of t() */}
                      {labels[item] ?? item}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 pt-10 pb-10"
              >
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 justify-between rounded-2xl py-7 text-lg text-white shadow-none border-none"
                >
                  <a href="mailto:Info@comfort-home.pro">
                    {labels.email_us}
                    <Mail size={20} />
                  </a>
                </Button>

                <Button
                  asChild
                  className="bg-[#25D366] hover:bg-[#25D366]/90 justify-between rounded-2xl py-7 text-lg text-white shadow-none border-none"
                >
                  <a href="https://wa.me/32473260030" target="_blank">
                    {labels.whatsapp ?? "WhatsApp"}
                    <Whatsapp className="h-6 w-6 fill-current" />
                  </a>
                </Button>

                <Button
                  asChild
                  className="bg-[#1877F2] hover:bg-[#1877F2]/90 justify-between rounded-2xl py-7 text-lg text-white shadow-none border-none"
                >
                  <a href="https://facebook.com" target="_blank">
                    Facebook
                    <Facebook size={20} />
                  </a>
                </Button>

                <Button
                  asChild
                  className="bg-[#E4405F] hover:bg-[#E4405F]/90 justify-between rounded-2xl py-7 text-lg text-white shadow-none border-none"
                >
                  <a href="https://instagram.com" target="_blank">
                    Instagram
                    <Instagram size={20} />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
