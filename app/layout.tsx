import type { Metadata } from "next";
import "nes.css/css/nes.min.css";
import "./globals.css";
import { GameProvider } from "../src/context/GameContext";

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
    <html lang="en">
      <body className="antialiased">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
