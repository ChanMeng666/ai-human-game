"use client";

import { useEffect, useState } from "react";

export type AchievementType =
  | "first_category"
  | "perfect_score"
  | "all_categories"
  | "half_way";

interface Achievement {
  type: AchievementType;
  title: string;
  description: string;
  emoji: string;
}

const achievements: Record<AchievementType, Achievement> = {
  first_category: {
    type: "first_category",
    title: "First Victory!",
    description: "Completed your first category",
    emoji: "🎯",
  },
  perfect_score: {
    type: "perfect_score",
    title: "Perfect Score!",
    description: "Scored 10/10",
    emoji: "🏆",
  },
  all_categories: {
    type: "all_categories",
    title: "Master Player!",
    description: "Completed all 4 categories",
    emoji: "👑",
  },
  half_way: {
    type: "half_way",
    title: "Halfway Hero!",
    description: "Completed 2 categories",
    emoji: "⭐",
  },
};

interface AchievementToastProps {
  type: AchievementType | null;
  onClose: () => void;
}

export default function AchievementToast({
  type,
  onClose,
}: AchievementToastProps) {
  const [show, setShow] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (type) {
      setShow(true);
      setIsExiting(false);
      
      // 自动关闭
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [type]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShow(false);
      onClose();
    }, 300);
  };

  if (!show || !type) {
    return null;
  }

  const achievement = achievements[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm ${
        isExiting ? "toast-slide-out" : "toast-slide-in"
      }`}
    >
      <div className="nes-container is-rounded is-success">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-xl leading-none opacity-70 hover:opacity-100"
          aria-label="Close"
        >
          ×
        </button>
        
        <div className="flex items-start gap-3 pr-6">
          {/* Icon */}
          <div className="text-3xl sm:text-4xl flex-shrink-0 animate-bounce">
            {achievement.emoji}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-bold mb-1">
              {achievement.title}
            </h3>
            <p className="text-xs sm:text-sm opacity-90">
              {achievement.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

