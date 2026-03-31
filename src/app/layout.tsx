import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boss Containers",
  description: "Container rental in Brussels and surroundings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
