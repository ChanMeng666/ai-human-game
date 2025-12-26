"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import ProgressRestoreModal from "@/src/components/ProgressRestoreModal";
import FirstTimeGuide from "@/src/components/FirstTimeGuide";

export default function Home() {
  const router = useRouter();
  const {
    loadFromLocalStorage,
    restoreProgress,
    clearSavedProgress,
    completedCategories,
    totalScore,
    soundEnabled,
  } = useGame();
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  useEffect(() => {
    const savedProgress = loadFromLocalStorage();
    setHasSavedProgress(savedProgress !== null);
  }, [loadFromLocalStorage]);

  const playBubbleSound = () => {
    if (soundEnabled) {
      const bubbleAudio = new Audio("/audio/bubble.wav");
      bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleContinueGame = () => {
    const savedProgress = loadFromLocalStorage();
    if (savedProgress) {
      restoreProgress(savedProgress);
      playBubbleSound();
      setTimeout(() => {
        router.push("/category");
      }, 300);
    }
  };

  const handleNewGame = () => {
    playBubbleSound();
    clearSavedProgress();
    setHasSavedProgress(false);
    setTimeout(() => {
      router.push("/category");
    }, 300);
  };

  const handleTutorial = () => {
    playBubbleSound();
    setTimeout(() => {
      router.push("/tutorial");
    }, 300);
  };

  return (
    <div className="min-h-screen pond-gradient flex items-center justify-center p-4 sm:p-6">
      <FirstTimeGuide />
      
      {showRestoreModal && (
        <ProgressRestoreModal
          onContinue={handleContinueGame}
          onNewGame={handleNewGame}
        />
      )}

      <div className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl">
        {/* Main Container */}
        <div className="nes-container is-dark with-title">
          <p className="title text-responsive-base sm:text-responsive-lg">AI vs Human</p>
          
          {/* Game Title */}
          <div className="text-center py-8 sm:py-10 md:py-12 lg:py-14">
            {/* Logo */}
            <div className="mb-6 sm:mb-8 md:mb-10 float-animation flex items-center justify-center">
              <Image
                src="/ai-human-game.svg"
                alt="AI vs Human Game Logo"
                width={150}
                height={150}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                priority
              />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 sm:mb-8 md:mb-10">
              Guessing Game
            </h1>
            <p className="text-xs sm:text-sm md:text-base mb-8 sm:mb-10 md:mb-12 opacity-90 leading-relaxed px-2 sm:px-4">
              Can you tell the difference between<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              AI-generated and human-created content?
            </p>
          </div>

          {/* Progress Info (if exists) */}
          {hasSavedProgress && (
            <div className="nes-container is-rounded pond-theme mb-6 sm:mb-8 md:mb-10 border-green-500" style={{ borderWidth: '4px' }}>
              <div className="text-center py-3 sm:py-4">
                <p className="text-xs sm:text-sm mb-3 text-green-700 font-bold">
                  <i className="nes-icon trophy is-small"></i>{" "}
                  You have unfinished progress!
                </p>
                <p className="text-[10px] sm:text-xs opacity-80 text-gray-700">
                  Completed {completedCategories.length}/4 categories
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 space-y-4 sm:space-y-5">
            {hasSavedProgress ? (
              <>
                <button
                  onClick={handleContinueGame}
                  className="nes-btn is-primary text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 mx-auto w-full sm:w-auto"
                >
                  <i className="nes-icon caret-right is-small"></i>
                  <span>Continue Game</span>
                </button>
                <button
                  onClick={handleNewGame}
                  className="nes-btn text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 mx-auto w-full sm:w-auto"
                >
                  <i className="nes-icon redo is-small"></i>
                  <span>New Game</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleNewGame}
                className="nes-btn is-success text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 mx-auto w-full sm:w-auto"
              >
                <i className="nes-icon play is-small"></i>
                <span>Start Game</span>
              </button>
            )}
            
            {/* Tutorial Button */}
            <button
              onClick={handleTutorial}
              className="nes-btn text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto w-full sm:w-auto"
            >
              <i className="nes-icon question is-small"></i>
              <span>How to Play</span>
            </button>
          </div>

          {/* Info Box */}
          <div className="nes-container is-rounded pond-theme mt-6 sm:mt-8 md:mt-10">
            <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed flex items-start gap-2 py-2 sm:py-3">
              <i className="nes-icon exclamation is-small flex-shrink-0"></i>
              <span>
                Test your skills across 4 categories:<br />
                <span className="block mt-3 sm:mt-4">
                  <i className="nes-icon file is-small"></i> Text •
                  <i className="nes-icon star is-small"></i> Images •
                  <i className="nes-icon heart is-small"></i> Audio •
                  <i className="nes-icon trophy is-small"></i> Videos
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* Developer Attribution */}
        <div className="nes-container is-rounded pond-theme mt-6 sm:mt-8 md:mt-10 p-4 sm:p-5 md:p-6">
          <div className="text-center sm:text-left">
            <p className="text-[10px] sm:text-xs font-bold mb-1">
              Crafted by Chan Meng
            </p>
            <p className="text-[9px] sm:text-[10px] opacity-80 mb-2">
              Need a custom web solution? Let&apos;s build something amazing together!
            </p>
            
            {/* Contact Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm">
              <a 
                href="mailto:chanmeng.dev@gmail.com" 
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition-all flex items-center gap-1 px-2 py-1 bg-white bg-opacity-50 rounded"
                title="Contact via Email"
              >
                <i className="nes-icon gmail is-small"></i>
                <span>Email</span>
              </a>
              <a 
                href="https://github.com/ChanMeng666" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition-all flex items-center gap-1 px-2 py-1 bg-white bg-opacity-50 rounded"
                title="View Portfolio"
              >
                <i className="nes-icon github is-small"></i>
                <span>Portfolio</span>
              </a>
              <a 
                href="https://github.com/ChanMeng666/ai-human-game" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition-all flex items-center gap-1 px-2 py-1 bg-white bg-opacity-50 rounded"
                title="View Project Source"
              >
                <i className="nes-icon github is-small"></i>
                <span>Source</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
