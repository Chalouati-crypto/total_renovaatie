"use client";
import { useEffect, useState } from "react";
import HomeHeading from "./home-heading";
import ImageGrid from "./image-grid";

export default function Home() {
  const [index, setIndex] = useState(0);
  const totalItems = 6;
  useEffect(() => {
    // If we've reached the last item, don't start the timer
    if (index >= totalItems - 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev >= totalItems - 1) {
          clearInterval(timer); // Safety clear
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [index]);

  return (
    <section id="home" className="mt-8 min-h-screen">
      <HomeHeading activeIndex={index} />
      <ImageGrid activeIndex={index} />
    </section>
  );
}
