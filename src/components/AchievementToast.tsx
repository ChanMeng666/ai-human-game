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
    title: "首战告捷！",
    description: "完成了第一个分类",
    emoji: "🎯",
  },
  perfect_score: {
    type: "perfect_score",
    title: "完美无瑕！",
    description: "获得满分10/10",
    emoji: "🏆",
  },
  all_categories: {
    type: "all_categories",
    title: "大师级玩家！",
    description: "完成了所有4个分类",
    emoji: "👑",
  },
  half_way: {
    type: "half_way",
    title: "半程英雄！",
    description: "已完成2个分类",
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
          aria-label="关闭"
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

