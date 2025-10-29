"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGame } from "@/src/context/GameContext";
import backgroundImage from "@/src/assets/bg_dim.png";
import fishSmall from "@/src/assets/fish_1.png";
import fishMedium from "@/src/assets/ayefish.png";
import fishLarge from "@/src/assets/fish_1_win.png";

export default function ResultsPage() {
  const router = useRouter();
  const { score, userAnswers, questions, category, resetGame } = useGame();
  const [fishSize, setFishSize] = useState(1);

  useEffect(() => {
    // Redirect if no game data
    if (questions.length === 0) {
      router.push("/");
      return;
    }

    // Determine fish size based on score
    if (score >= 8) {
      setFishSize(3); // Large fish
    } else if (score >= 5) {
      setFishSize(2); // Medium fish
    } else {
      setFishSize(1); // Small fish
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

  const getFishImage = () => {
    if (fishSize === 3) return fishLarge;
    if (fishSize === 2) return fishMedium;
    return fishSmall;
  };

  const getPerformanceMessage = () => {
    if (score === 10) return "Perfect! You're an AI detection expert! 🏆";
    if (score >= 8) return "Excellent! You have a great eye! 🌟";
    if (score >= 5) return "Good job! Keep practicing! 👍";
    return "Nice try! This is harder than it looks! 💪";
  };

  const percentage = (score / 10) * 100;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        quality={100}
        className="z-[-1] object-cover"
      />

      <div className="relative z-10 w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-peaberry mb-1 sm:mb-2">
            Game Over!
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-peaberry">
            Category: {category?.toUpperCase()}
          </p>
        </div>

        {/* Score Display */}
        <div className="bg-[#6D845A] bg-opacity-80 border-2 sm:border-3 md:border-4 border-[#3e4224] rounded-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-5 md:mb-6 text-center">
          <div className="text-white font-peaberry">
            <p className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
              {score}/10
            </p>
            <div className="w-full bg-[#3e4224] rounded-full h-6 sm:h-7 md:h-8 mb-3 sm:mb-4">
              <div
                className="bg-green-400 h-6 sm:h-7 md:h-8 rounded-full transition-all duration-500 flex items-center justify-center"
                style={{ width: `${percentage}%` }}
              >
                <span className="text-white font-peaberry font-bold text-xs sm:text-sm md:text-base">
                  {percentage}%
                </span>
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-5 md:mb-6 px-2">
              {getPerformanceMessage()}
            </p>
            
            {/* Fish Display */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <Image
                src={getFishImage()}
                alt="Performance Fish"
                width={fishSize * 60}
                height={fishSize * 45}
                className="transition-all duration-500 w-auto h-auto max-w-[120px] sm:max-w-[180px] md:max-w-[240px]"
              />
            </div>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-[#c8b78c] bg-opacity-90 border-2 sm:border-3 md:border-4 border-[#6D845A] rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-[#3e4224] font-peaberry mb-3 sm:mb-4 text-center">
            Answer Review
          </h2>
          <div className="max-h-[300px] sm:max-h-[350px] md:max-h-96 overflow-y-auto scrollable-container">
            {userAnswers.map((answer, index) => {
              const question = questions.find((q) => q.id === answer.questionId);
              return (
                <div
                  key={answer.questionId}
                  className={`mb-3 sm:mb-4 p-3 sm:p-4 rounded-lg ${
                    answer.correct
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-red-100 border-2 border-red-500"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-peaberry text-sm sm:text-base md:text-lg text-[#3e4224] mb-1 break-words">
                        Q{index + 1}: {question?.description}
                      </p>
                      <p className="font-peaberry text-xs sm:text-sm text-[#3e4224] break-words">
                        Your choice: <strong>{answer.userChoice.toUpperCase()}</strong>
                        {" | "}
                        Correct: <strong>{answer.humanPosition.toUpperCase()}</strong>
                      </p>
                    </div>
                    <div className="text-2xl sm:text-3xl flex-shrink-0">
                      {answer.correct ? "✓" : "✗"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6">
          <button
            onClick={handlePlayAgain}
            className="w-full sm:w-auto px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#6D845A] hover:bg-[#526443] active:bg-[#526443] text-white font-peaberry text-lg sm:text-xl md:text-2xl rounded-lg transition-all hover:scale-105 active:scale-95 touch-manipulation"
          >
            🔄 Play Again
          </button>
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#3e4224] hover:bg-[#2a2e18] active:bg-[#2a2e18] text-white font-peaberry text-lg sm:text-xl md:text-2xl rounded-lg transition-all hover:scale-105 active:scale-95 touch-manipulation"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}
