"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";

export default function ResultsPage() {
  const router = useRouter();
  const { score, userAnswers, questions, category, resetGame } = useGame();
  const [fishSize, setFishSize] = useState<"small" | "medium" | "large">("small");

  useEffect(() => {
    if (questions.length === 0) {
      router.push("/");
      return;
    }

    // Determine fish size based on score
    if (score >= 8) {
      setFishSize("large");
    } else if (score >= 5) {
      setFishSize("medium");
    } else {
      setFishSize("small");
    }
  }, [score, questions, router]);

  const playBubbleSound = () => {
    const bubbleAudio = new Audio("/audio/bubble.wav");
    bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const handlePlayAgain = () => {
    playBubbleSound();
    resetGame();
    setTimeout(() => {
      router.push("/category");
    }, 300);
  };

  const handleGoHome = () => {
    playBubbleSound();
    resetGame();
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  const getFishEmoji = () => {
    if (fishSize === "large") return "🐋";
    if (fishSize === "medium") return "🐟";
    return "🐠";
  };

  const getPerformanceMessage = () => {
    if (score === 10) return "Perfect! You're an AI detection expert! 🏆";
    if (score >= 8) return "Excellent! You have a great eye! 🌟";
    if (score >= 5) return "Good job! Keep practicing! 👍";
    return "Nice try! This is harder than it looks! 💪";
  };

  const percentage = (score / 10) * 100;

  return (
    <div className="min-h-screen pond-gradient flex flex-col items-center py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4">
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
            
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 px-2 sm:px-4 leading-relaxed">
              {getPerformanceMessage()}
            </p>
            
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
                    <div className="text-xl sm:text-2xl flex-shrink-0">
                      {answer.correct ? "✓" : "✗"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={handlePlayAgain}
            className="nes-btn is-primary text-xs sm:text-sm"
          >
            🔄 Play Again
          </button>
          <button
            onClick={handleGoHome}
            className="nes-btn text-xs sm:text-sm"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}
