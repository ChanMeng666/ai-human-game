"use client";

import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";

interface QuickStatsModalProps {
  show: boolean;
  onClose: () => void;
}

export default function QuickStatsModal({ show, onClose }: QuickStatsModalProps) {
  const router = useRouter();
  const { completedCategories, totalScore, soundEnabled } = useGame();

  if (!show) return null;

  const maxPossibleScore = completedCategories.length * 10;
  const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

  const playBubbleSound = () => {
    if (soundEnabled) {
      const bubbleAudio = new Audio("/audio/bubble.wav");
      bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleViewFullSummary = () => {
    playBubbleSound();
    onClose();
    setTimeout(() => {
      router.push("/summary");
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "text": return "file";
      case "images": return "star";
      case "audio": return "heart";
      case "videos": return "trophy";
      default: return "check";
    }
  };

  const getPerformanceBadge = (score: number, total: number) => {
    const percent = (score / total) * 100;
    if (percent === 100) return { emoji: "🏆", label: "Perfect", color: "text-yellow-500" };
    if (percent >= 80) return { emoji: "⭐", label: "Great", color: "text-green-500" };
    if (percent >= 50) return { emoji: "👍", label: "Good", color: "text-blue-500" };
    return { emoji: "🌱", label: "Try Again", color: "text-gray-500" };
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md animate-slide-in-up">
        <div className="nes-container is-dark with-title">
          <p className="title text-sm md:text-base">Quick Stats</p>
          
          {/* Overall Score */}
          <div className="nes-container pond-theme mb-4">
            <div className="text-center py-3">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {totalScore}/{maxPossibleScore > 0 ? maxPossibleScore : 40}
              </div>
              {maxPossibleScore > 0 && (
                <>
                  <progress 
                    className="nes-progress is-success w-full mb-2" 
                    value={percentage} 
                    max="100"
                  ></progress>
                  <p className="text-xs opacity-80">{percentage.toFixed(1)}% Complete</p>
                </>
              )}
              <p className="text-xs mt-2 opacity-90">
                <i className="nes-icon trophy is-small"></i> {completedCategories.length}/4 Categories
              </p>
            </div>
          </div>

          {/* Category Breakdown */}
          {completedCategories.length > 0 ? (
            <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
              {completedCategories.map((category) => {
                const badge = getPerformanceBadge(category.score, category.totalQuestions);
                return (
                  <div key={category.category} className="nes-container is-rounded">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <i className={`nes-icon ${getCategoryIcon(category.category)} is-small flex-shrink-0`}></i>
                        <span className="text-xs font-bold uppercase truncate">
                          {category.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-lg ${badge.color}`}>{badge.emoji}</span>
                        <span className="text-sm font-bold">
                          {category.score}/{category.totalQuestions}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="nes-container is-rounded pond-theme mb-4">
              <p className="text-xs text-center py-4 opacity-80">
                No categories completed yet.<br />
                Start playing to see your progress!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            {completedCategories.length > 0 && (
              <button
                onClick={handleViewFullSummary}
                className="nes-btn is-primary text-xs flex items-center justify-center gap-2 flex-1"
              >
                <i className="nes-icon star is-small"></i>
                <span>Full Summary</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="nes-btn text-xs flex items-center justify-center gap-2 flex-1"
            >
              <i className="nes-icon close is-small"></i>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

