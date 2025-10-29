"use client";

import Link from "next/link";

export default function Home() {
  const playBubbleSound = () => {
    const bubbleAudio = new Audio("/audio/bubble.wav");
    bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
  };

  return (
    <div className="min-h-screen pond-gradient flex items-center justify-center p-4 sm:p-6">
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
                className="nes-btn is-success text-xs sm:text-sm md:text-base"
                onClick={playBubbleSound}
              >
                ▶ Start Game
              </button>
            </Link>
          </div>

          {/* Info Box */}
          <div className="nes-container is-rounded pond-theme mt-4 sm:mt-6">
            <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed">
              💡 Test your skills across 4 categories:<br />
              <span className="block mt-2">
                📝 Text • 🖼️ Images • 🎵 Audio • 🎬 Videos
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6 text-white text-[10px] sm:text-xs opacity-70">
          Built with Next.js & NES.css 🎮
        </div>
      </div>
    </div>
  );
}
