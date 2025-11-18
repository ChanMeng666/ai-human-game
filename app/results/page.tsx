"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import Navigation from "@/src/components/Navigation";
import AchievementToast, { AchievementType } from "@/src/components/AchievementToast";
import questionsDataRaw from "@/src/data/questions.json";
import { Question } from "@/src/context/GameContext";

const questionsData = questionsDataRaw as Question[];

export default function ResultsPage() {
  const router = useRouter();
  const {
    score,
    baseScore,
    bonusScore,
    currentCombo,
    maxCombo,
    userAnswers,
    questions,
    category,
    completedCategories,
    resetGame,
    resetAll,
    saveCurrentCategory,
    setCategory,
    setQuestions,
    startGame,
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
      if (score === 20) {
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

    // Determine fish size based on score (adjusted for 20 questions)
    if (score >= 16) {
      setFishSize("large");
    } else if (score >= 10) {
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

  const handleRetryCurrentCategory = () => {
    playBubbleSound();
    if (category) {
      let categoryQuestions = questionsData.filter(
        (q) => q.category === category
      );

      // Sort by difficulty for progressive challenge
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      categoryQuestions = categoryQuestions.sort((a, b) => {
        const diffA = difficultyOrder[a.difficulty];
        const diffB = difficultyOrder[b.difficulty];
        if (diffA !== diffB) {
          return diffA - diffB;
        }
        return Math.random() - 0.5;
      });

      setQuestions(categoryQuestions);
      startGame();
      setTimeout(() => {
        router.push("/game");
      }, 300);
    }
  };

  const handleTrySpecificCategory = (categoryName: string) => {
    playBubbleSound();
    setCategory(categoryName);

    let categoryQuestions = questionsData.filter(
      (q) => q.category === categoryName
    );

    // Sort by difficulty for progressive challenge
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    categoryQuestions = categoryQuestions.sort((a, b) => {
      const diffA = difficultyOrder[a.difficulty];
      const diffB = difficultyOrder[b.difficulty];
      if (diffA !== diffB) {
        return diffA - diffB;
      }
      return Math.random() - 0.5;
    });

    setQuestions(categoryQuestions);
    setTimeout(() => {
      router.push("/game");
    }, 300);
  };

  const allCategories = ["text", "images", "audio", "videos"];
  const completedCategoryNames = completedCategories.map(c => c.category);
  const remainingCategories = allCategories.filter(c => !completedCategoryNames.includes(c));
  const hasMoreCategories = remainingCategories.length > 0;

  // Get suggested next category based on current performance
  const getSuggestedCategory = () => {
    if (remainingCategories.length === 0) {
      // All completed, suggest lowest scoring category
      const lowestScoring = [...completedCategories].sort((a, b) => 
        (a.score / a.totalQuestions) - (b.score / b.totalQuestions)
      )[0];
      return lowestScoring?.category || category;
    }
    // Return first remaining category
    return remainingCategories[0];
  };

  const suggestedCategory = getSuggestedCategory();

  const getFishIcon = () => {
    if (fishSize === "large") return { icon: "trophy", label: "Master Level" };
    if (fishSize === "medium") return { icon: "star", label: "Intermediate" };
    return { icon: "heart", label: "Beginner" };
  };

  const getPerformanceMessage = () => {
    if (score === 20) return { text: "Perfect! You're an AI detection expert!", icon: "trophy" };
    if (score >= 16) return { text: "Excellent! You have a great eye!", icon: "star" };
    if (score >= 10) return { text: "Good job! Keep practicing!", icon: "thumbs-up" };
    return { text: "Nice try! This is harder than it looks!", icon: "heart" };
  };

  const percentage = (score / 20) * 100;

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
        <div className="nes-container is-dark with-title mb-6 sm:mb-8 md:mb-10">
          <p className="title text-xs sm:text-sm md:text-base">Game Over!</p>
          <p className="text-center text-white text-xs sm:text-sm md:text-base py-3 sm:py-4 md:py-5">
            Category: {category?.toUpperCase()}
          </p>
        </div>

        {/* Score Display */}
        <div className="nes-container pond-theme mb-6 sm:mb-8 md:mb-10">
          <div className="text-center py-6 sm:py-8 md:py-10">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 font-bold">
              {score} Points
            </div>

            {/* Score Breakdown */}
            <div className="nes-container is-dark mb-4 sm:mb-5 md:mb-6 text-left">
              <div className="text-xs sm:text-sm space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Base Score:</span>
                  <span className="font-bold">{baseScore} pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Bonus (Combos & Milestones):</span>
                  <span className="font-bold text-yellow-400">+{bonusScore} pts</span>
                </div>
                <div className="border-t border-gray-600 pt-2 flex justify-between items-center">
                  <span className="opacity-80">Total Score:</span>
                  <span className="font-bold text-lg">{score} pts</span>
                </div>
              </div>
            </div>

            {/* Combo Achievement */}
            {maxCombo > 0 && (
              <div className="nes-container is-rounded bg-orange-500 bg-opacity-20 mb-4 sm:mb-5 md:mb-6">
                <p className="text-xs sm:text-sm text-center flex items-center justify-center gap-2 py-2 sm:py-3">
                  <span>🔥</span>
                  <span>Max Combo: <strong>{maxCombo}x</strong></span>
                  {maxCombo >= 20 && <span className="text-yellow-400">PERFECT!</span>}
                  {maxCombo >= 10 && maxCombo < 20 && <span className="text-green-400">Amazing!</span>}
                </p>
              </div>
            )}

            <div className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4 leading-relaxed flex items-center justify-center gap-2">
              <i className={`nes-icon ${getPerformanceMessage().icon} is-small`}></i>
              <span>{getPerformanceMessage().text}</span>
            </div>

            {/* Performance Icon Display */}
            <div className="mb-2 float-animation flex justify-center">
              <i className={`nes-icon ${getFishIcon().icon} size-2x`}></i>
            </div>
            <p className="text-[10px] sm:text-xs opacity-70">
              {getFishIcon().label}
            </p>
          </div>
        </div>

        {/* Answer Review */}
        <div className="nes-container is-rounded pond-theme mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 md:mb-6 text-center">
            Answer Review
          </h2>
          <div className="max-h-[250px] sm:max-h-[300px] md:max-h-[350px] overflow-y-auto space-y-3 sm:space-y-4 md:space-y-5">
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
                        Correct: <strong>{answer.actualType.toUpperCase()}</strong>
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
        <div className="nes-container is-dark mb-6 sm:mb-8 md:mb-10">
          <div className="text-center text-white py-3 sm:py-4">
            <p className="text-xs sm:text-sm mb-3">
              <i className="nes-icon trophy is-small"></i> Progress: {completedCategories.length}/4 Categories
            </p>
            {hasMoreCategories && (
              <p className="text-[10px] sm:text-xs opacity-80">
                Remaining: {remainingCategories.map(c => c.toUpperCase()).join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Contextual Suggestions */}
        {score < 16 && (
          <div className="nes-container is-rounded pond-theme mb-6 sm:mb-8 md:mb-10 animate-slide-in-up">
            <p className="text-xs sm:text-sm text-center py-3 sm:py-4">
              <i className="nes-icon redo is-small"></i> Want to improve? Try <strong className="uppercase">{category}</strong> again!
            </p>
          </div>
        )}
        {hasMoreCategories && score >= 16 && suggestedCategory && (
          <div className="nes-container is-rounded pond-theme mb-6 sm:mb-8 md:mb-10 animate-slide-in-up">
            <p className="text-xs sm:text-sm text-center py-3 sm:py-4">
              <i className="nes-icon star is-small"></i> Great job! Ready for <strong className="uppercase">{suggestedCategory}</strong>?
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6">
          {hasMoreCategories ? (
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5">
              <button
                onClick={handleContinue}
                className="nes-btn is-success text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0 hover:scale-105 transition-transform"
              >
                <i className="nes-icon caret-right is-small"></i>
                <span>Next Category</span>
              </button>
              {suggestedCategory && suggestedCategory !== category && (
                <button
                  onClick={() => handleTrySpecificCategory(suggestedCategory)}
                  className="nes-btn is-primary text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0 hover:scale-105 transition-transform"
                >
                  <i className="nes-icon star is-small"></i>
                  <span>Try {suggestedCategory.charAt(0).toUpperCase() + suggestedCategory.slice(1)}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5">
              <button
                onClick={handleViewSummary}
                className="nes-btn is-success text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0 hover:scale-105 transition-transform"
              >
                <i className="nes-icon trophy is-small"></i>
                <span>View Final Summary</span>
              </button>
              <button
                onClick={handleContinue}
                className="nes-btn is-primary text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
              >
                <i className="nes-icon caret-right is-small"></i>
                <span>Practice More</span>
              </button>
            </div>
          )}

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5">
            <button
              onClick={handleRetryCurrentCategory}
              className="nes-btn is-warning text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
            >
              <i className="nes-icon redo is-small"></i>
              <span>Retry {category?.charAt(0).toUpperCase()}{category?.slice(1)}</span>
            </button>
            {completedCategories.length > 0 && (
              <button
                onClick={handleViewSummary}
                className="nes-btn text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto sm:mx-0"
              >
                <i className="nes-icon star is-small"></i>
                <span>View Summary</span>
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
    </div>
  );
}
