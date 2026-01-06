"use client";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

interface NavLinkProps {
  section: string;
  targetId: string; // Ensure you pass the untranslated ID (e.g., "about")
  isActive: boolean;
}

export default function NavLink({ section, targetId, isActive }: NavLinkProps) {
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo(`#${targetId}`, {
      offset: -80,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <Link
      onClick={handleClick}
      href={`#${targetId}`}
      className={`relative transition-colors duration-300 ${
        isActive ? "bg-primary rounded-full px-4 py-1 text-white" : ""
      }`}
    >
      {/* 1. The animating pill MUST be inside the relative Link */}
      {isActive && (
        <motion.span
          layoutId="active-nav-pill"
          className="bg-primary absolute inset-0 z-0 rounded-full" // bg-primary goes here!
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}

      {/* 2. Wrap the text in a span with z-index to stay above the pill */}
      <span className="relative z-10 text-[1rem] font-semibold lg:text-lg">
        {section}
      </span>
    </Link>
  );
}
/**
 *  className={`relative ${isActive ? "bg-primary rounded-full px-4 py-1 text-white" : ""}`}
 */
