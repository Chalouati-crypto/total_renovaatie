"use client";
import { Mail } from "lucide-react";
import Whatsapp from "./icons/whatsapp";
import { Button } from "./ui/button";

export default function FloatingActions() {
  return (
    /* Hidden on mobile (because they are in the burger), 
       Visible on Tablet (flex), 
       Hidden on large Desktop (because they are in the header) */
    <div className="fixed right-6 bottom-6 z-40 hidden flex-col gap-3 md:flex lg:hidden">
      <Button
        size="icon"
        className="shadow-primary/40 h-14 w-14 rounded-full shadow-2xl"
        asChild
      >
        <a href="mailto:contact@example.com">
          <Mail className="h-6 w-6" />
        </a>
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="bg-secondary h-14 w-14 rounded-full border-2 shadow-xl"
        asChild
      >
        <a href="https://wa.me/32473260030">
          <Whatsapp className="text-background h-7 w-7 fill-white text-2xl" />
        </a>
      </Button>
    </div>
  );
}
