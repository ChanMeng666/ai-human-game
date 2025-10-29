"use client";

import { useState, useEffect } from "react";

const GUIDE_KEY = "aiHumanGame_guideCompleted";

interface GuideStep {
  title: string;
  description: string;
  emoji: string;
}

const steps: GuideStep[] = [
  {
    title: "欢迎来到 AI vs Human!",
    description: "在这个游戏中，你将挑战自己辨别AI生成内容和人类创作内容的能力。准备好了吗？",
    emoji: "🎮",
  },
  {
    title: "选择你的分类",
    description: "首先选择一个分类开始游戏：文本、图片、音频或视频。每个分类都有10道独特的题目。",
    emoji: "📂",
  },
  {
    title: "做出你的选择",
    description: "仔细比较左右两侧的内容，然后点击你认为是人类创作的那一侧。答对得1分！",
    emoji: "🤔",
  },
  {
    title: "查看你的进度",
    description: "完成所有4个分类，获得最高评级！游戏会自动保存你的进度，随时可以继续。",
    emoji: "🏆",
  },
];

export default function FirstTimeGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenGuide = localStorage.getItem(GUIDE_KEY);
      if (!hasSeenGuide) {
        setShow(true);
      }
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(GUIDE_KEY, "true");
    }
    setShow(false);
  };

  if (!show) {
    return null;
  }

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 animate-fade-in">
      <div className="nes-dialog is-rounded pond-theme max-w-lg w-full">
        <div className="p-4 sm:p-6">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep
                    ? "bg-[#c846ab]"
                    : index < currentStep
                    ? "bg-[#9b2e83]"
                    : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <div className="text-4xl sm:text-5xl mb-4">{step.emoji}</div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
              {step.title}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              {step.description}
            </p>
          </div>

          {/* Step Counter */}
          <div className="text-center text-xs sm:text-sm opacity-60 mb-4">
            步骤 {currentStep + 1} / {steps.length}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!isLastStep && (
              <button
                onClick={handleSkip}
                className="nes-btn flex-1 text-xs sm:text-sm"
              >
                跳过引导
              </button>
            )}
            <button
              onClick={handleNext}
              className="nes-btn is-primary flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>{isLastStep ? "开始游戏" : "下一步"}</span>
              <i className={`nes-icon ${isLastStep ? "play" : "caret-right"} is-small`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

