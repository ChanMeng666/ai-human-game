"use client";

import { useRouter, usePathname } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import Breadcrumb from "./Breadcrumb";
import QuickStatsModal from "./QuickStatsModal";
import { useState } from "react";

interface NavigationProps {
  showBackButton?: boolean;
  showExitButton?: boolean;
  showProgress?: boolean;
  onExit?: () => void;
}

export default function Navigation({
  showBackButton = true,
  showExitButton = false,
  showProgress = false,
  onExit,
}: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { completedCategories, totalScore, soundEnabled, toggleSound } = useGame();
  const [isExiting, setIsExiting] = useState(false);
  const [showQuickStats, setShowQuickStats] = useState(false);

  const playBubbleSound = () => {
    if (soundEnabled) {
      const bubbleAudio = new Audio("/audio/bubble.wav");
      bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleBack = () => {
    playBubbleSound();
    
    // 智能返回逻辑
    if (pathname === "/game") {
      router.push("/category");
    } else if (pathname === "/results" || pathname === "/category") {
      router.push("/category");
    } else if (pathname === "/summary") {
      router.push("/category");
    } else if (pathname === "/tutorial") {
      router.push("/");
    } else {
      router.back();
    }
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      playBubbleSound();
      setIsExiting(true);
      setTimeout(() => {
        router.push("/");
      }, 300);
    }
  };

  const handleToggleSound = () => {
    toggleSound();
    // 播放测试音效
    if (!soundEnabled) {
      const bubbleAudio = new Audio("/audio/bubble.wav");
      bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleViewSummary = () => {
    playBubbleSound();
    setTimeout(() => {
      router.push("/summary");
    }, 300);
  };

  const maxPossibleScore = completedCategories.length > 0 ? completedCategories.length * 10 : 40;
  const hasProgress = completedCategories.length > 0;

  // 主页不显示导航栏
  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <QuickStatsModal show={showQuickStats} onClose={() => setShowQuickStats(false)} />
      
      <div className="w-full mb-3 sm:mb-4">
        <div className="nes-container is-dark">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left side: Back button and breadcrumb */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="nes-btn is-small flex items-center gap-1 flex-shrink-0"
                  title="Go back"
                >
                  <i className="nes-icon caret-left is-small"></i>
                  <span className="hidden sm:inline text-xs">Back</span>
                </button>
              )}
              <div className="min-w-0 flex-1">
                <Breadcrumb />
              </div>
            </div>

            {/* Right side: Score, progress, sound and exit buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Persistent Score Display */}
              {showProgress && (
                <button
                  onClick={() => setShowQuickStats(true)}
                  className="nes-btn is-primary is-small flex items-center gap-1 hover:scale-105 transition-transform"
                  title={hasProgress ? "Click to view detailed stats" : "Your progress will appear here"}
                >
                  <i className="nes-icon trophy is-small"></i>
                  <span className="text-xs font-bold">
                    <span className="hidden lg:inline">{totalScore}/{maxPossibleScore}</span>
                    <span className="hidden md:inline lg:hidden">{completedCategories.length}/4</span>
                    <span className="md:hidden">{totalScore}</span>
                  </span>
                </button>
              )}

              {/* View Summary button (when categories completed) */}
              {hasProgress && !showProgress && pathname !== "/summary" && (
                <button
                  onClick={handleViewSummary}
                  className="nes-btn is-success is-small flex items-center gap-1"
                  title="View summary"
                >
                  <i className="nes-icon star is-small"></i>
                  <span className="hidden sm:inline text-xs">Summary</span>
                </button>
              )}

              {/* Sound toggle */}
              <button
                onClick={handleToggleSound}
                className="nes-btn is-small flex items-center gap-1"
                title={soundEnabled ? "Disable sound" : "Enable sound"}
              >
                <i
                  className={`nes-icon ${soundEnabled ? "heart" : "close"} is-small`}
                ></i>
                <span className="hidden sm:inline text-xs">
                  {soundEnabled ? "Sound" : "Mute"}
                </span>
              </button>

              {/* Exit button */}
              {showExitButton && (
                <button
                  onClick={handleExit}
                  className="nes-btn is-error is-small flex items-center gap-1"
                  title="Exit game"
                  disabled={isExiting}
                >
                  <i className="nes-icon close is-small"></i>
                  <span className="hidden sm:inline text-xs">Exit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

