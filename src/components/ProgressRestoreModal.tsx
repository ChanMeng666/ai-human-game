"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";

interface ProgressRestoreModalProps {
  onContinue: () => void;
  onNewGame: () => void;
}

export default function ProgressRestoreModal({
  onContinue,
  onNewGame,
}: ProgressRestoreModalProps) {
  const { loadFromLocalStorage, soundEnabled } = useGame();
  const [progress, setProgress] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const savedProgress = loadFromLocalStorage();
    if (savedProgress) {
      setProgress(savedProgress);
      setShow(true);
    }
  }, [loadFromLocalStorage]);

  const playBubbleSound = () => {
    if (soundEnabled) {
      const bubbleAudio = new Audio("/audio/bubble.wav");
      bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleContinue = () => {
    playBubbleSound();
    setShow(false);
    onContinue();
  };

  const handleNewGame = () => {
    playBubbleSound();
    setShow(false);
    onNewGame();
  };

  if (!show || !progress) {
    return null;
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className="nes-dialog is-rounded pond-theme max-w-md w-full">
        <div className="p-4 sm:p-6">
          {/* Title */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💾</div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
              Saved Progress Found!
            </h2>
            <p className="text-xs sm:text-sm opacity-80">
              Last played: {formatDate(progress.lastUpdated)}
            </p>
          </div>

          {/* Progress Info */}
          <div className="nes-container is-rounded mb-4 sm:mb-6">
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-center">
                <span className="opacity-80">Completed:</span>
                <span className="font-bold">
                  {progress.completedCategories.length}/4
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-80">Total Score:</span>
                <span className="font-bold">{progress.totalScore}</span>
              </div>
              {progress.currentCategory && (
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Current Category:</span>
                  <span className="font-bold uppercase">
                    {progress.currentCategory}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleContinue}
              className="nes-btn is-primary flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <i className="nes-icon caret-right is-small"></i>
              <span>Continue</span>
            </button>
            <button
              onClick={handleNewGame}
              className="nes-btn flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <i className="nes-icon redo is-small"></i>
              <span>New Game</span>
            </button>
          </div>

          {/* Notice */}
          <p className="text-[10px] sm:text-xs text-center mt-3 sm:mt-4 opacity-60">
            Starting a new game will clear saved progress
          </p>
        </div>
      </div>
    </div>
  );
}

