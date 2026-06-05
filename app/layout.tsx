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
  icons: {
    icon: "/ai-human-game.svg",
    shortcut: "/ai-human-game.svg",
    apple: "/ai-human-game.svg",
  },
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
        {/* Developer brand credit — Chan Meng */}
        <footer style={{ borderTop: "2px solid rgba(0,0,0,0.1)", padding: "16px", textAlign: "center", fontSize: "11px", lineHeight: 1.6 }}>
          <a
            href="https://github.com/ChanMeng666"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#666", textDecoration: "none" }}
          >
            <img src="/chan_logo.svg" alt="Chan Meng" style={{ width: "22px", height: "22px" }} />
            <span>Built by Chan Meng &middot; custom apps: chanmeng.dev@gmail.com</span>
          </a>
        </footer>
      </body>
    </html>
  );
}
