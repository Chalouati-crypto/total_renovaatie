import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Since we have a root layout in the [locale] folder,
// this layout simply passes the children through.
export default function RootLayout({ children }: Props) {
  return children;
}
