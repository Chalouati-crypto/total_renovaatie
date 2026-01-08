"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-2"
    >
      {/* Outer Mouse Shell */}
      <div className="border-primary/40 flex h-10 w-6 justify-center rounded-2xl border-2">
        {/* Animated Dot */}
        <motion.span
          animate={{
            y: [0, 15],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5, // 0.5s delay before the dot starts moving
            repeatDelay: 0.5, // Optional: adds a pause between each loop
          }}
          className="from-primary to-primary/60 mt-1.5 block h-2 w-2 rounded-full bg-linear-to-b"
        />
      </div>
    </motion.div>
  );
}
