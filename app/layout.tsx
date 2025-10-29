import type { Metadata } from "next";
import { Press_Start_2P, VT323, Pixelify_Sans } from "next/font/google";
import "nes.css/css/nes.min.css";
import "./globals.css";
import { GameProvider } from "../src/context/GameContext";

// 配置像素字体
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const pixelifySans = Pixelify_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI vs Human - Guessing Game",
  description: "Can you tell the difference between AI-generated and human-created content?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${vt323.variable} ${pixelifySans.variable}`}>
      <head>
        <link href="https://unpkg.com/nes.icons@3.0.0-beta.3/css/nes-icons.min.css" rel="stylesheet" />
      </head>
      <body className={pressStart2P.className}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
