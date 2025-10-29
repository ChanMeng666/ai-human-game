"use client";

import { useState, useEffect } from "react";

const GUIDE_KEY = "aiHumanGame_guideCompleted";

interface GuideStep {
  title: string;
  description: string;
  icon: string;
}

const steps: GuideStep[] = [
  {
    title: "Welcome to AI vs Human!",
    description: "In this game, you'll test your ability to distinguish between AI-generated and human-created content. Ready?",
    icon: "play",
  },
  {
    title: "Choose Your Category",
    description: "First, select a category to start: Text, Images, Audio, or Videos. Each category has 10 unique questions.",
    icon: "folder",
  },
  {
    title: "Make Your Choice",
    description: "Carefully compare the content on both sides, then click on the one you think was created by a human. Correct answer = 1 point!",
    icon: "search",
  },
  {
    title: "Track Your Progress",
    description: "Complete all 4 categories to get the highest rating! Your progress is automatically saved, so you can continue anytime.",
    icon: "trophy",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 animate-fade-in backdrop-blur-sm">
      <div className="nes-dialog is-rounded max-w-lg w-full shadow-2xl" style={{ backgroundColor: '#ffffff', opacity: 1 }}>
        <div className="p-4 sm:p-6" style={{ backgroundColor: '#f7e5f3', opacity: 1 }}>
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
            <div className="mb-4 flex justify-center">
              <i className={`nes-icon ${step.icon} is-large`}></i>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
              {step.title}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              {step.description}
            </p>
          </div>

          {/* Step Counter */}
          <div className="text-center text-xs sm:text-sm opacity-60 mb-4">
            Step {currentStep + 1} / {steps.length}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!isLastStep && (
              <button
                onClick={handleSkip}
                className="nes-btn flex-1 text-xs sm:text-sm"
              >
                Skip Guide
              </button>
            )}
            <button
              onClick={handleNext}
              className="nes-btn is-primary flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>{isLastStep ? "Start Game" : "Next"}</span>
              <i className={`nes-icon ${isLastStep ? "play" : "caret-right"} is-small`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

