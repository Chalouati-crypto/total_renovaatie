"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { motion } from "framer-motion";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

import NextJsImage from "./next-image";
import type {
  CategoryWithServices,
  DBWorkImage,
  Photo,
} from "~/server/db/types";

export default function PhotoGallery({
  data,
  locale,
  images,
}: {
  data: CategoryWithServices[];
  locale: string;
  images: DBWorkImage[];
}) {
  const t = useTranslations("Work");
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState(data[0]?.slug ?? "structural");

  // 1. Transform DB images into Photo objects with dimensions
  const allPhotos = useMemo(() => {
    return images.map((img): Photo => {
      let width = 1080;
      let height = 1080;

      // Calculate dimensions based on your DB aspect_ratio string
      if (img.aspectRatio === "aspect-video") {
        width = 1920;
        height = 1080;
      } else if (img.aspectRatio === "aspect-[2/3]") {
        width = 1000;
        height = 1500;
      } else if (img.aspectRatio === "aspect-[3/4]") {
        width = 1200;
        height = 1600;
      } else if (img.aspectRatio === "aspect-[4/5]") {
        width = 1200;
        height = 1500;
      }

      return {
        src: img.url,
        width,
        height,
        categorySlug: img.categorySlug ?? "",
        isFavorite: img.isFavorite,
        alt: t("title"),
      };
    });
  }, [images, t]);

  // 2. Filter by active category
  const filteredPhotos = useMemo(
    () => allPhotos.filter((p) => p.categorySlug === filter),
    [allPhotos, filter],
  );

  // 3. Slice for the grid (Show top 10 favorites)
  const gridPhotos = useMemo(
    () => filteredPhotos.slice(0, 10),
    [filteredPhotos],
  );

  return (
    <section id="work" className="w-full px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-end text-right">
          <h2 className="text-6xl font-bold tracking-tight md:text-8xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-slate-500">
            {t("description")}
          </p>
        </div>

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Open lightbox at index 0 of the full filtered list */}
          <button
            onClick={() => setIndex(0)}
            className="order-4 rounded-full border border-slate-300 px-8 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white md:order-1"
          >
            {t("viewAll")}
          </button>

          <div className="flex flex-wrap gap-3">
            {data.map((category) => {
              const displayLabel =
                locale === "fr"
                  ? category.nameFr
                  : locale === "nl"
                    ? category.nameNl
                    : category.nameEn;
              return (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.slug)}
                  className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    filter === category.slug
                      ? "text-white"
                      : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {filter === category.slug && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 z-0 rounded-full bg-[#4A789C]"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{displayLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <MasonryPhotoAlbum
          photos={gridPhotos}
          render={{ image: NextJsImage }}
          onClick={({ index }) => setIndex(index)}
          columns={(w) => (w < 640 ? 2 : w < 1024 ? 3 : 4)}
          spacing={24}
        />

        <Lightbox
          slides={filteredPhotos} // Lightbox gets ALL photos for the category
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Zoom]}
        />
      </div>
    </section>
  );
}
