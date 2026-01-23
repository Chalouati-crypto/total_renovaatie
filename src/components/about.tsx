"use client";
import LogoImage from "../../public/logo.png";
import LogoImage2 from "../../public/logo2.jpg";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLivePreview } from "@payloadcms/live-preview-react";
import type { SiteSetting } from "~/payload-types";

export default function AboutSection({
  initialData,
}: {
  initialData: SiteSetting;
}) {
  const { data } = useLivePreview({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",
  });

  return (
    <section id="about" className="overflow-hidden px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-5xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-6xl">
            {data?.aboutTitle}
          </h2>

          <div className="text-xl leading-relaxed font-light whitespace-pre-line text-slate-600/90">
            {data?.aboutDescription}
          </div>
        </motion.div>

        {/* VISUAL ELEMENT */}
        <div className="group relative">
          {/* Main Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary/5 relative aspect-4/5 overflow-hidden rounded-3xl shadow-[0_32px_64px_-16px_rgba(186,230,253,0.6)]"
          >
            <Image
              src={LogoImage}
              alt="Our Work"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-blue-100/10 via-transparent to-white/5" />
          </motion.div>

          {/* Responsive Minimalist Partnership Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            /* Responsive positioning: 
               - Small mobile: centered at bottom (-bottom-6)
               - Tablet/Desktop: offset to the right (-right-8 -bottom-8)
            */
            className="absolute -bottom-6 left-1/2 z-10 w-[90%] -translate-x-1/2 md:-right-8 md:-bottom-8 md:left-auto md:w-full md:max-w-[280px] md:translate-x-0"
          >
            {/* Glassmorphism Badge Container */}
            <div className="rounded-2xl border border-orange-100 bg-white/90 p-4 shadow-[0_20px_40px_-12px_rgba(243,112,33,0.2)] backdrop-blur-md md:p-5">
              <p className="mb-3 text-[9px] font-bold tracking-[0.2em] text-orange-500/70 uppercase md:mb-4 md:text-[10px]">
                Powered by
              </p>

              <div className="flex items-center gap-3 md:gap-4">
                {/* Responsive BX Square */}
                {/* Responsive Logo Square with Zoom Effect */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-orange-100 bg-white md:h-12 md:w-12">
                  <motion.div
                    className="relative h-full w-full"
                    whileHover={{ scale: 1.4 }} // This creates the "Zoom In" effect on hover
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={LogoImage2}
                      alt="Bevatix Logo"
                      fill // Use fill to let the parent container control the size
                      className="zoom-in-100 object-contain p-1.5 transition-transform duration-500"
                      /* object-contain ensures the logo isn't cropped weirdly, 
         p-1.5 adds a little internal breathing room */
                    />
                  </motion.div>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight text-slate-900">
                    Bevatix BV
                  </p>
                  <p className="text-[10px] font-medium tracking-tight text-slate-400 md:text-[11px]">
                    Parent Company
                  </p>
                </div>
              </div>

              {/* Thin Elegant Divider */}
              <div className="my-3 h-[1px] w-full bg-slate-100 md:my-4" />

              <p className="text-[10px] leading-relaxed font-light text-slate-500 italic md:text-[11px]">
                Structural expertise supporting our premium renovation projects.
              </p>
            </div>
          </motion.div>

          {/* Atmosphere Glows */}
          <div className="absolute -top-10 -left-10 -z-10 h-64 w-64 animate-pulse rounded-full bg-blue-100/30 blur-3xl" />
          <div className="absolute -right-10 -bottom-10 -z-10 h-48 w-48 rounded-full bg-orange-100/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
