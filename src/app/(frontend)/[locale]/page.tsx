import { getLocale } from "next-intl/server";
import About from "~/components/about";
import Contact from "~/components/contact";
import FloatingActions from "~/components/floating-actions";
import Home from "~/components/home";
import Services from "~/components/services";
import Work from "~/components/work";
import { getCategoriesWithServices, getAllWorkImages } from "~/lib/data";

export default async function HomePage() {
  const locale = await getLocale(); // This gets 'en', 'fr', or 'nl'
  console.log("Current locale:", locale);

  const categories = await getCategoriesWithServices(
    locale as "en" | "fr" | "nl",
  );
  console.log("these are the categories", categories);

  const images = await getAllWorkImages();
  console.log("these are the images", images);
  return (
    <>
      <Home />
      <About />

      <Services data={categories} locale={locale} />
      <Work locale={locale} data={categories} images={images} />
      <Contact />
      <FloatingActions />
    </>
  );
}
