import type { Metadata } from "next";
import { Jacquard_24 } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/contexts/GameContext";

const jacquard24 = Jacquard_24({
  variable: "--font-jacquard-24",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "RPG",
  description: "teste de rpg",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={jacquard24.variable}>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
