import About from "~/components/about";
import Contact from "~/components/contact";
import FloatingActions from "~/components/floating-actions";
import Home from "~/components/home";
import Services from "~/components/services";
import Work from "~/components/work";

export default function HomePage() {
  return (
    <>
      <Home />
      <About />

      <Services />
      <Work />
      <Contact />
      <FloatingActions />
    </>
  );
}
