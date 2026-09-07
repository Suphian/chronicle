import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { MotionEnhancements } from "@/components/MotionEnhancements";
import { character } from "@/content/character";

const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["400", "600"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: `The Chronicle of ${character.name}`, template: `%s · ${character.name}` },
  description: character.tagline,
};

export const viewport: Viewport = {
  themeColor: "#f3eddf",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Nav />
        {children}
        <MotionEnhancements />
      </body>
    </html>
  );
}
