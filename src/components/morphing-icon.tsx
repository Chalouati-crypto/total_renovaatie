"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hammer,
  Paintbrush,
  Home,
  Cpu,
  ArrowUpToLine,
  TreePine,
} from "lucide-react";
import ScrollIndicator from "./scroll-indicator"; // Make sure the filename matches your file

export default function MorphingIcon({ activeIndex }: { activeIndex: number }) {
  const serviceIcons = {
    house: Hammer,
    interior: Paintbrush,
    renovation: Home,
    smart: Cpu,
    roofing: ArrowUpToLine,
    landscaping: TreePine,
  };

  const serviceKeys = [
    "house",
    "interior",
    "renovation",
    "smart",
    "roofing",
    "landscaping",
  ];

  const CurrentIcon =
    serviceIcons[serviceKeys[activeIndex] as keyof typeof serviceIcons];

  return (
    <div className="flex min-w-16 shrink-0 items-center justify-center py-4 md:py-0">
      <AnimatePresence mode="wait">
        {/* Logic: Show icons for the first 5 items, show Scroll on the 6th */}
        {activeIndex < 5 ? (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{
              duration: 0.25,
              ease: "circOut",
            }}
            className="text-primary"
          >
            <CurrentIcon size={48} strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div
            key="scroll-indicator"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
