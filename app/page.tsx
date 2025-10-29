"use client";

import Link from "next/link";
import FontDebugger from "@/src/components/FontDebugger";

export default function Home() {
  const playBubbleSound = () => {
    const bubbleAudio = new Audio("/audio/bubble.wav");
    bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
  };

  return (
    <div className="min-h-screen pond-gradient flex items-center justify-center p-4 sm:p-6">
      {/* Font Debugger */}
      <FontDebugger />
      
      <div className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl">
        {/* Main Container */}
        <div className="nes-container is-dark with-title">
          <p className="title text-responsive-base sm:text-responsive-lg">AI vs Human</p>
          
          {/* Game Title */}
          <div className="text-center py-6 sm:py-8 md:py-10">
            <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 float-animation">
              🤖 vs 👤
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6">
              Guessing Game
            </h1>
            <p className="text-xs sm:text-sm md:text-base mb-6 sm:mb-8 opacity-90 leading-relaxed px-2 sm:px-4">
              Can you tell the difference between<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              AI-generated and human-created content?
            </p>
          </div>

          {/* Play Button */}
          <div className="text-center mb-4 sm:mb-6">
            <Link href="/category">
              <button 
                className="nes-btn is-success text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 mx-auto"
                onClick={playBubbleSound}
              >
                <i className="nes-icon play is-small"></i>
                <span>Start Game</span>
              </button>
            </Link>
          </div>

          {/* Info Box */}
          <div className="nes-container is-rounded pond-theme mt-4 sm:mt-6">
            <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed flex items-start gap-2">
              <i className="nes-icon exclamation is-small flex-shrink-0"></i>
              <span>
                Test your skills across 4 categories:<br />
                <span className="block mt-2">
                  <i className="nes-icon file is-small"></i> Text • 
                  <i className="nes-icon star is-small"></i> Images • 
                  <i className="nes-icon heart is-small"></i> Audio • 
                  <i className="nes-icon trophy is-small"></i> Videos
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6 text-white text-[10px] sm:text-xs opacity-70">
          Built with Next.js & NES.css 🎮
        </div>

        {/* Font Test Section - 用于视觉调试 */}
        <div className="mt-6 nes-container is-dark with-title">
          <p className="title text-xs">Font Test</p>
          <div className="space-y-3 text-white">
            <div>
              <p className="text-xs opacity-70 mb-1">Default (should be Press Start 2P):</p>
              <p className="text-sm">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="text-sm">abcdefghijklmnopqrstuvwxyz</p>
              <p className="text-sm">0123456789</p>
            </div>
            <div>
              <p className="text-xs opacity-70 mb-1">font-pixel-display:</p>
              <p className="text-sm font-pixel-display">Press Start 2P Font</p>
            </div>
            <div>
              <p className="text-xs opacity-70 mb-1">font-pixel-content:</p>
              <p className="text-base font-pixel-content">VT323 Font for Long Content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
