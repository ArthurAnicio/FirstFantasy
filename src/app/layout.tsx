import type { Metadata } from "next";
import { Jacquard_24 } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { SoundProvider } from "@/contexts/SoundContext";
import Template from "./template";
import { MusicProvider } from "@/contexts/MusicContext";

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
        <MusicProvider>
          <SoundProvider>
            <PlayerProvider>
              <Template>{children}</Template>
            </PlayerProvider>
          </SoundProvider>
        </MusicProvider>
      </body>
    </html>
  );
}
