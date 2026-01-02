import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono } from "next/font/google";

// Geist Sans for the main body/UI
export const geistSans = GeistSans;

// JetBrains Mono for technical details or code
export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains", // Custom variable for Tailwind
});
