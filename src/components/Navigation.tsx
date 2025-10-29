"use client";

import { useRouter, usePathname } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import Breadcrumb from "./Breadcrumb";
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

  // 主页不显示导航栏
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="w-full mb-3 sm:mb-4">
      <div className="nes-container is-dark">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* 左侧：返回按钮和面包屑 */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="nes-btn is-small flex items-center gap-1 flex-shrink-0"
                title="返回上一页"
              >
                <i className="nes-icon caret-left is-small"></i>
                <span className="hidden sm:inline text-xs">Back</span>
              </button>
            )}
            <div className="min-w-0 flex-1">
              <Breadcrumb />
            </div>
          </div>

          {/* 右侧：进度、音效和退出按钮 */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* 进度指示器 */}
            {showProgress && (
              <div className="hidden md:flex items-center gap-2 text-white text-xs">
                <i className="nes-icon trophy is-small"></i>
                <span>
                  {completedCategories.length}/4 ({totalScore})
                </span>
              </div>
            )}

            {/* 音效开关 */}
            <button
              onClick={handleToggleSound}
              className="nes-btn is-small flex items-center gap-1"
              title={soundEnabled ? "关闭音效" : "开启音效"}
            >
              <i
                className={`nes-icon ${soundEnabled ? "heart" : "close"} is-small`}
              ></i>
              <span className="hidden sm:inline text-xs">
                {soundEnabled ? "Sound" : "Mute"}
              </span>
            </button>

            {/* 退出按钮 */}
            {showExitButton && (
              <button
                onClick={handleExit}
                className="nes-btn is-error is-small flex items-center gap-1"
                title="退出游戏"
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
  );
}

