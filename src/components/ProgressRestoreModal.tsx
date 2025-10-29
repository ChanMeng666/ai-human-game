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

    if (diffMins < 1) return "刚刚";
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className="nes-dialog is-rounded pond-theme max-w-md w-full">
        <div className="p-4 sm:p-6">
          {/* 标题 */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💾</div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
              发现保存的进度！
            </h2>
            <p className="text-xs sm:text-sm opacity-80">
              上次游戏时间: {formatDate(progress.lastUpdated)}
            </p>
          </div>

          {/* 进度信息 */}
          <div className="nes-container is-rounded mb-4 sm:mb-6">
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-center">
                <span className="opacity-80">已完成分类:</span>
                <span className="font-bold">
                  {progress.completedCategories.length}/4
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-80">总分:</span>
                <span className="font-bold">{progress.totalScore}</span>
              </div>
              {progress.currentCategory && (
                <div className="flex justify-between items-center">
                  <span className="opacity-80">当前分类:</span>
                  <span className="font-bold uppercase">
                    {progress.currentCategory}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 按钮 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleContinue}
              className="nes-btn is-primary flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <i className="nes-icon caret-right is-small"></i>
              <span>继续游戏</span>
            </button>
            <button
              onClick={handleNewGame}
              className="nes-btn flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <i className="nes-icon redo is-small"></i>
              <span>新游戏</span>
            </button>
          </div>

          {/* 提示 */}
          <p className="text-[10px] sm:text-xs text-center mt-3 sm:mt-4 opacity-60">
            开始新游戏将清除保存的进度
          </p>
        </div>
      </div>
    </div>
  );
}

