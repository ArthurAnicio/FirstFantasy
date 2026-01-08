import type { Metadata } from "next";
import { Jacquard_24 } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/contexts/PlayerContext";

const jacquard24 = Jacquard_24({
  variable: "--font-jacquard-24",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "RPG",
  description: "teste de rpg",
};

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={jacquard24.variable}>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}
