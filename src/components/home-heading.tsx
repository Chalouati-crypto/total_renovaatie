"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const serviceKeys = [
  "house",
  "interior",
  "renovation",
  "smart",
  "roofing",
  "landscaping",
];

interface Props {
  activeIndex: number;
}

export default function HomeHeading({ activeIndex }: Props) {
  // 1. Changed "hero" to "Hero" to match your JSON key
  const t = useTranslations("Hero");

  return (
    <h1 className="text-center font-sans text-3xl leading-tight font-bold md:text-5xl">
      {t("title")}
      <br />
      {/* Added border-b-4 and min-width to prevent layout jumping */}
      <span className="text-primary border-primary relative inline-block min-w-[320px] font-mono">
        <AnimatePresence mode="wait">
          <motion.span
            key={serviceKeys[activeIndex]}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="inline-block"
          >
            {/* 2. Access the nested services object using the dot notation */}
            {t(`services.${serviceKeys[activeIndex]}`)}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
