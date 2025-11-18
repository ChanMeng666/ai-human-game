"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import Navigation from "@/src/components/Navigation";
import questionsDataRaw from "@/src/data/questions.json";
import { Question } from "@/src/context/GameContext";

const questionsData = questionsDataRaw as Question[];

export default function SummaryPage() {
  const router = useRouter();
  const { 
    completedCategories, 
    totalScore,
    resetAll,
    setCategory,
    setQuestions,
    soundEnabled
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
    if (soundEnabled) {
      const bubbleAudio = new Audio("/audio/bubble.wav");
      bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
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

  const handleRetryCategory = (categoryName: string) => {
    playBubbleSound();
    setCategory(categoryName);
    const categoryQuestions = questionsData.filter(
      (q) => q.category === categoryName
    );
    setQuestions(categoryQuestions);
    setTimeout(() => {
      router.push("/game");
    }, 300);
  };

  const getPerformanceIcon = () => {
    switch (overallPerformance) {
      case "master": return "trophy";
      case "advanced": return "star";
      case "intermediate": return "thumbs-up";
      default: return "heart";
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
    <div className="min-h-screen pond-gradient flex flex-col py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
      <Navigation showBackButton={true} showProgress={true} />
      
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl">

        {/* Title */}
        <div className="nes-container is-dark with-title mb-6 sm:mb-8 md:mb-10">
          <p className="title text-xs sm:text-sm md:text-base">Overall Summary</p>
          <p className="text-center text-white text-xs sm:text-sm md:text-base py-3 sm:py-4 md:py-5">
            Your Performance Across All Categories
          </p>
        </div>

        {/* Total Score Display */}
        <div className="nes-container pond-theme mb-6 sm:mb-8 md:mb-10">
          <div className="text-center py-6 sm:py-8 md:py-10">
            <div className="mb-3 sm:mb-4 flex justify-center">
              <i className={`nes-icon ${getPerformanceIcon()} size-2x`}></i>
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
        <div className="nes-container is-rounded pond-theme mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 md:mb-6 text-center">
            Category Breakdown
          </h2>
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {completedCategories.map((categoryData) => {
              const categoryPercentage = (categoryData.score / categoryData.totalQuestions) * 100;
              const badgeIcon = categoryPercentage === 100 ? "trophy" : categoryPercentage >= 80 ? "star" : categoryPercentage >= 50 ? "thumbs-up" : "heart";
              return (
                <div
                  key={categoryData.category}
                  className="nes-container is-rounded"
                >
                  <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <i className={`nes-icon ${getCategoryIcon(categoryData.category)} is-small flex-shrink-0`}></i>
                      <span className="text-xs sm:text-sm md:text-base font-bold uppercase truncate">
                        {categoryData.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <i className={`nes-icon ${badgeIcon} is-small`}></i>
                      <span className="text-sm sm:text-base md:text-lg font-bold">
                        {categoryData.score}/{categoryData.totalQuestions}
                      </span>
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
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[9px] sm:text-[10px] md:text-xs opacity-70">
                      {categoryPercentage.toFixed(0)}% Accuracy
                    </p>
                    <button
                      onClick={() => handleRetryCategory(categoryData.category)}
                      className="nes-btn is-warning text-[9px] sm:text-[10px] md:text-xs py-1 px-2 flex items-center gap-1 hover:scale-105 transition-transform"
                    >
                      <i className="nes-icon redo is-small"></i>
                      <span className="hidden sm:inline">Retry</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Info */}
        {hasMoreCategories && (
          <div className="nes-container is-dark mb-6 sm:mb-8 md:mb-10">
            <div className="text-center text-white py-3 sm:py-4">
              <p className="text-xs sm:text-sm mb-3">
                <i className="nes-icon trophy is-small"></i> Completed: {completedCategories.length}/4 Categories
              </p>
              <p className="text-[10px] sm:text-xs opacity-80">
                Remaining: {remainingCategories.map(c => c.toUpperCase()).join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5">
          {hasMoreCategories ? (
            <>
              <button
                onClick={handleContinue}
                className="nes-btn is-success text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0 hover:scale-105 transition-transform"
              >
                <i className="nes-icon caret-right is-small"></i>
                <span>Continue Challenge</span>
              </button>
              <button
                onClick={handleRestartAll}
                className="nes-btn text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
              >
                <i className="nes-icon redo is-small"></i>
                <span>Reset All Progress</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleContinue}
                className="nes-btn is-primary text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0 hover:scale-105 transition-transform"
              >
                <i className="nes-icon caret-right is-small"></i>
                <span>Practice More</span>
              </button>
              <button
                onClick={handleRestartAll}
                className="nes-btn text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
              >
                <i className="nes-icon redo is-small"></i>
                <span>Start Fresh</span>
              </button>
            </>
          )}
        </div>

        {/* Completion Message */}
        {!hasMoreCategories && (
          <div className="mt-6 sm:mt-8 md:mt-10 nes-container is-rounded is-dark text-center">
            <p className="text-white text-xs sm:text-sm md:text-base py-3 sm:py-4 md:py-5 flex items-center justify-center gap-2">
              <i className="nes-icon star is-small"></i>
              <span>Congratulations! You&apos;ve completed all categories!</span>
              <i className="nes-icon star is-small"></i>
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

