"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import MorphingIcon from "./morphing-icon";
interface ProjectImage {
  src: string;
  aspect: string;
  id: number;
}

interface ImageCardProps {
  img: ProjectImage;
  activeIndex: number;
}
export default function ImageGrid({ activeIndex }: { activeIndex: number }) {
  const images = [
    {
      src: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6nliR93st8EQZXDyq3KA9uLG7ndMv04Tp2Jmi",
      aspect: "aspect-[2/3]",
      id: 0,
    },
    {
      src: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6G7qgRwrjZ2suCdfWwBXS1xNtv05kpmyai6DY",
      aspect: "aspect-[3/4]",
      id: 1,
    },
    {
      src: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6vHwfDliCq0Vg8SRhZr6uz43s2Undaw5ODoQI",
      aspect: "aspect-square",
      id: 2,
    },
    {
      src: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6b4Pn7rl0pCVkLh6Hxli4o7FyP0TW1BKrwDf3",
      aspect: "aspect-square",
      id: 3,
    },
    {
      src: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6iQUV7ScfB35JR6ZbrHo2xmvkaXgyNeSA9tpd",
      aspect: "aspect-[3/4]",
      id: 4,
    },
    {
      src: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY63bdzXNPJLkgytebRNSAaCnZ2EXxd0HT7wOhI",
      aspect: "aspect-[2/3]",
      id: 5,
    },
  ];

  return (
    <div className="mx-auto mt-16 w-full max-w-7xl px-4">
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
        {/* LEFT GROUP */}
        <div className="grid w-full grid-cols-3 items-center gap-2 md:w-[70%] md:gap-4 lg:w-[45%]">
          {images.slice(0, 3).map((img) => (
            <ImageCard key={img.id} img={img} activeIndex={activeIndex} />
          ))}
        </div>

        {/* CENTER ICON - Always visible or synced with first image */}
        <div className="flex shrink-0 items-center justify-center py-4 md:py-0">
          <MorphingIcon activeIndex={activeIndex} />
        </div>

        {/* RIGHT GROUP */}
        <div className="grid w-full grid-cols-3 items-center gap-2 md:w-[70%] md:gap-4 lg:w-[45%]">
          {images.slice(3, 6).map((img) => (
            <ImageCard key={img.id} img={img} activeIndex={activeIndex} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageCard({ img, activeIndex }: ImageCardProps) {
  const isRevealed = activeIndex >= img.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isRevealed ? 1 : 0,
        y: isRevealed ? 0 : 10,
        scale: isRevealed ? 1 : 0.95,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      // We use a template literal and ensure aspect is treated as a string
      className={`relative overflow-hidden rounded-xl shadow-xl ${img.aspect ?? ""}`}
    >
      <Image
        src={img.src}
        alt="Project detail"
        fill
        // priority helps with Largest Contentful Paint for the first images
        priority
        className="object-cover"
        sizes="(max-width: 768px) 33vw, 20vw"
      />
    </motion.div>
  );
}
