"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import Navigation from "@/src/components/Navigation";
import AchievementToast, { AchievementType } from "@/src/components/AchievementToast";

export default function ResultsPage() {
  const router = useRouter();
  const { 
    score, 
    userAnswers, 
    questions, 
    category, 
    completedCategories,
    resetGame, 
    resetAll,
    saveCurrentCategory,
    soundEnabled
  } = useGame();
  const [fishSize, setFishSize] = useState<"small" | "medium" | "large">("small");

  const [saved, setSaved] = useState(false);
  const [achievement, setAchievement] = useState<AchievementType | null>(null);

  useEffect(() => {
    if (questions.length === 0) {
      router.push("/");
      return;
    }

    // Save current category score (only once)
    if (!saved && category) {
      saveCurrentCategory();
      setSaved(true);
      
      // Check for achievements
      const newCompletedCount = completedCategories.length + 1;
      
      // Perfect score achievement
      if (score === 10) {
        setTimeout(() => setAchievement("perfect_score"), 500);
      }
      // First completion achievement
      else if (newCompletedCount === 1) {
        setTimeout(() => setAchievement("first_category"), 500);
      }
      // Halfway achievement
      else if (newCompletedCount === 2) {
        setTimeout(() => setAchievement("half_way"), 500);
      }
      // All categories completed achievement
      else if (newCompletedCount === 4) {
        setTimeout(() => setAchievement("all_categories"), 500);
      }
    }

    // Determine fish size based on score
    if (score >= 8) {
      setFishSize("large");
    } else if (score >= 5) {
      setFishSize("medium");
    } else {
      setFishSize("small");
    }
  }, [score, questions, router, category, saveCurrentCategory, saved, completedCategories.length]);

  const playBubbleSound = () => {
    if (soundEnabled) {
      const bubbleAudio = new Audio("/audio/bubble.wav");
      bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleContinue = () => {
    playBubbleSound();
    resetGame();
    setTimeout(() => {
      router.push("/category");
    }, 300);
  };

  const handleViewSummary = () => {
    playBubbleSound();
    setTimeout(() => {
      router.push("/summary");
    }, 300);
  };

  const handleGoHome = () => {
    playBubbleSound();
    resetAll();
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  const allCategories = ["text", "images", "audio", "videos"];
  const completedCategoryNames = completedCategories.map(c => c.category);
  const remainingCategories = allCategories.filter(c => !completedCategoryNames.includes(c));
  const hasMoreCategories = remainingCategories.length > 0;

  const getFishEmoji = () => {
    if (fishSize === "large") return "🐋";
    if (fishSize === "medium") return "🐟";
    return "🐠";
  };

  const getPerformanceMessage = () => {
    if (score === 10) return { text: "Perfect! You're an AI detection expert!", icon: "trophy" };
    if (score >= 8) return { text: "Excellent! You have a great eye!", icon: "star" };
    if (score >= 5) return { text: "Good job! Keep practicing!", icon: "thumbs-up" };
    return { text: "Nice try! This is harder than it looks!", icon: "heart" };
  };

  const percentage = (score / 10) * 100;

  return (
    <div className="min-h-screen pond-gradient flex flex-col py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
      <Navigation showBackButton={false} showProgress={true} />
      
      <AchievementToast 
        type={achievement} 
        onClose={() => setAchievement(null)} 
      />
      
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        
        {/* Title */}
        <div className="nes-container is-dark with-title mb-3 sm:mb-4 md:mb-6">
          <p className="title text-xs sm:text-sm md:text-base">Game Over!</p>
          <p className="text-center text-white text-xs sm:text-sm md:text-base py-2 sm:py-3">
            Category: {category?.toUpperCase()}
          </p>
        </div>

        {/* Score Display */}
        <div className="nes-container pond-theme mb-3 sm:mb-4 md:mb-6">
          <div className="text-center py-4 sm:py-6">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 font-bold">
              {score}/10
            </div>
            
            {/* Progress Bar */}
            <progress 
              className="nes-progress is-success w-full mb-3 sm:mb-4" 
              value={percentage} 
              max="100"
            ></progress>
            
            <div className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 px-2 sm:px-4 leading-relaxed flex items-center justify-center gap-2">
              <i className={`nes-icon ${getPerformanceMessage().icon} is-small`}></i>
              <span>{getPerformanceMessage().text}</span>
            </div>
            
            {/* Fish Display */}
            <div className="text-5xl sm:text-6xl md:text-7xl mb-2 float-animation">
              {getFishEmoji()}
            </div>
            <p className="text-[10px] sm:text-xs opacity-70">
              {fishSize === "large" ? "Master Level" : fishSize === "medium" ? "Intermediate" : "Beginner"}
            </p>
          </div>
        </div>

        {/* Answer Review */}
        <div className="nes-container is-rounded pond-theme mb-3 sm:mb-4 md:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-center">
            Answer Review
          </h2>
          <div className="max-h-[250px] sm:max-h-[300px] md:max-h-[350px] overflow-y-auto space-y-2 sm:space-y-3">
            {userAnswers.map((answer, index) => {
              const question = questions.find((q) => q.id === answer.questionId);
              return (
                <div
                  key={answer.questionId}
                  className={`nes-container ${
                    answer.correct ? "is-success" : "is-error"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs md:text-sm mb-1 break-words">
                        <strong>Q{index + 1}:</strong> {question?.description}
                      </p>
                      <p className="text-[9px] sm:text-[10px] md:text-xs opacity-80">
                        Your choice: <strong>{answer.userChoice.toUpperCase()}</strong>
                        {" | "}
                        Correct: <strong>{answer.humanPosition.toUpperCase()}</strong>
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                      <i className={`nes-icon ${answer.correct ? "check" : "times"} is-small`}></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Info */}
        <div className="nes-container is-dark mb-3 sm:mb-4 md:mb-6">
          <div className="text-center text-white">
            <p className="text-xs sm:text-sm mb-2">
              <i className="nes-icon trophy is-small"></i> Progress: {completedCategories.length}/4 Categories
            </p>
            {hasMoreCategories && (
              <p className="text-[10px] sm:text-xs opacity-80">
                Remaining: {remainingCategories.map(c => c.toUpperCase()).join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4">
          {hasMoreCategories ? (
            <>
              <button
                onClick={handleContinue}
                className="nes-btn is-primary text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
              >
                <i className="nes-icon caret-right is-small"></i>
                <span>Next Category</span>
              </button>
              {completedCategories.length > 0 && (
                <button
                  onClick={handleViewSummary}
                  className="nes-btn is-success text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
                >
                  <i className="nes-icon star is-small"></i>
                  <span>View Summary</span>
                </button>
              )}
            </>
          ) : (
            <button
              onClick={handleViewSummary}
              className="nes-btn is-success text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
            >
              <i className="nes-icon trophy is-small"></i>
              <span>View Final Summary</span>
            </button>
          )}
          <button
            onClick={handleGoHome}
            className="nes-btn text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
          >
            <i className="nes-icon user is-small"></i>
            <span>Home</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
