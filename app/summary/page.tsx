"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";

export default function SummaryPage() {
  const router = useRouter();
  const { 
    completedCategories, 
    totalScore,
    resetAll 
  } = useGame();
  const [overallPerformance, setOverallPerformance] = useState<"beginner" | "intermediate" | "advanced" | "master">("beginner");

  useEffect(() => {
    if (completedCategories.length === 0) {
      router.push("/");
      return;
    }

    // Calculate overall performance based on total score
    const maxPossibleScore = completedCategories.length * 10;
    const percentage = (totalScore / maxPossibleScore) * 100;

    if (percentage >= 90) {
      setOverallPerformance("master");
    } else if (percentage >= 75) {
      setOverallPerformance("advanced");
    } else if (percentage >= 50) {
      setOverallPerformance("intermediate");
    } else {
      setOverallPerformance("beginner");
    }
  }, [completedCategories, totalScore, router]);

  const playBubbleSound = () => {
    const bubbleAudio = new Audio("/audio/bubble.wav");
    bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const handleContinue = () => {
    playBubbleSound();
    setTimeout(() => {
      router.push("/category");
    }, 300);
  };

  const handleRestartAll = () => {
    playBubbleSound();
    resetAll();
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  const getPerformanceEmoji = () => {
    switch (overallPerformance) {
      case "master": return "🏆";
      case "advanced": return "⭐";
      case "intermediate": return "👍";
      default: return "🌱";
    }
  };

  const getPerformanceMessage = () => {
    switch (overallPerformance) {
      case "master": return "Outstanding! You're an AI detection master!";
      case "advanced": return "Excellent work! You have great detection skills!";
      case "intermediate": return "Good job! You're developing a good eye!";
      default: return "Keep practicing! Every expert was once a beginner!";
    }
  };

  const allCategories = ["text", "images", "audio", "videos"];
  const completedCategoryNames = completedCategories.map(c => c.category);
  const remainingCategories = allCategories.filter(c => !completedCategoryNames.includes(c));
  const hasMoreCategories = remainingCategories.length > 0;
  const maxPossibleScore = completedCategories.length * 10;
  const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "text": return "file";
      case "images": return "star";
      case "audio": return "heart";
      case "videos": return "trophy";
      default: return "check";
    }
  };

  return (
    <div className="min-h-screen pond-gradient flex flex-col items-center py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
      <div className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        
        {/* Title */}
        <div className="nes-container is-dark with-title mb-3 sm:mb-4 md:mb-6">
          <p className="title text-xs sm:text-sm md:text-base">Overall Summary</p>
          <p className="text-center text-white text-xs sm:text-sm md:text-base py-2 sm:py-3">
            Your Performance Across All Categories
          </p>
        </div>

        {/* Total Score Display */}
        <div className="nes-container pond-theme mb-3 sm:mb-4 md:mb-6">
          <div className="text-center py-4 sm:py-6">
            <div className="text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4">
              {getPerformanceEmoji()}
            </div>
            
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 font-bold">
              {totalScore}/{maxPossibleScore}
            </div>
            
            <div className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 opacity-80">
              ({percentage.toFixed(1)}%)
            </div>
            
            {/* Progress Bar */}
            <progress 
              className="nes-progress is-success w-full mb-3 sm:mb-4" 
              value={percentage} 
              max="100"
            ></progress>
            
            <div className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 px-2 sm:px-4 leading-relaxed">
              {getPerformanceMessage()}
            </div>
            
            <p className="text-[10px] sm:text-xs opacity-70 uppercase font-bold">
              {overallPerformance} Level
            </p>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="nes-container is-rounded pond-theme mb-3 sm:mb-4 md:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-center">
            Category Breakdown
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {completedCategories.map((categoryData) => {
              const categoryPercentage = (categoryData.score / categoryData.totalQuestions) * 100;
              return (
                <div
                  key={categoryData.category}
                  className="nes-container is-rounded"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <i className={`nes-icon ${getCategoryIcon(categoryData.category)} is-small`}></i>
                      <span className="text-xs sm:text-sm md:text-base font-bold uppercase">
                        {categoryData.category}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-bold">
                      {categoryData.score}/{categoryData.totalQuestions}
                    </div>
                  </div>
                  <progress 
                    className={`nes-progress w-full ${
                      categoryPercentage >= 80 ? 'is-success' : 
                      categoryPercentage >= 50 ? 'is-warning' : 
                      'is-error'
                    }`}
                    value={categoryPercentage} 
                    max="100"
                  ></progress>
                  <p className="text-[9px] sm:text-[10px] md:text-xs opacity-70 text-right mt-1">
                    {categoryPercentage.toFixed(0)}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Info */}
        {hasMoreCategories && (
          <div className="nes-container is-dark mb-3 sm:mb-4 md:mb-6">
            <div className="text-center text-white">
              <p className="text-xs sm:text-sm mb-2">
                <i className="nes-icon trophy is-small"></i> Completed: {completedCategories.length}/4 Categories
              </p>
              <p className="text-[10px] sm:text-xs opacity-80">
                Remaining: {remainingCategories.map(c => c.toUpperCase()).join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4">
          {hasMoreCategories && (
            <button
              onClick={handleContinue}
              className="nes-btn is-primary text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
            >
              <i className="nes-icon caret-right is-small"></i>
              <span>Continue Challenge</span>
            </button>
          )}
          <button
            onClick={handleRestartAll}
            className="nes-btn text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
          >
            <i className="nes-icon redo is-small"></i>
            <span>Start Over</span>
          </button>
        </div>

        {/* Completion Message */}
        {!hasMoreCategories && (
          <div className="mt-4 sm:mt-6 nes-container is-rounded is-dark text-center">
            <p className="text-white text-xs sm:text-sm md:text-base py-2 sm:py-3">
              🎉 Congratulations! You've completed all categories! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

