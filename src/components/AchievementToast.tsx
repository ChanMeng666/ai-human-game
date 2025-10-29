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
  icon: string;
}

const achievements: Record<AchievementType, Achievement> = {
  first_category: {
    type: "first_category",
    title: "First Victory!",
    description: "Completed your first category",
    icon: "check-circle",
  },
  perfect_score: {
    type: "perfect_score",
    title: "Perfect Score!",
    description: "Scored 10/10",
    icon: "trophy",
  },
  all_categories: {
    type: "all_categories",
    title: "Master Player!",
    description: "Completed all 4 categories",
    icon: "trophy",
  },
  half_way: {
    type: "half_way",
    title: "Halfway Hero!",
    description: "Completed 2 categories",
    icon: "star",
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
      <div className="nes-container is-rounded is-success shadow-2xl border-4 border-green-500" style={{ backgroundColor: '#ffffff', opacity: 1 }}>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-xl leading-none opacity-70 hover:opacity-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-800"
          style={{ backgroundColor: '#ffffff' }}
          aria-label="Close"
        >
          ×
        </button>
        
        <div className="flex items-start gap-3 pr-6 p-3 rounded" style={{ backgroundColor: '#e6f7e6', opacity: 1 }}>
          {/* Icon */}
          <div className="flex-shrink-0 animate-bounce flex items-center justify-center">
            <i className={`nes-icon ${achievement.icon} is-large`}></i>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-bold mb-1 text-green-800">
              {achievement.title}
            </h3>
            <p className="text-xs sm:text-sm opacity-90 text-gray-800">
              {achievement.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

