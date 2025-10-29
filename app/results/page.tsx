"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGame } from "@/src/context/GameContext";
import backgroundImage from "@/src/assets/bg_dim.png";
import windowLong from "@/src/assets/window_long.png";
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
    <div className="relative min-h-screen w-full flex flex-col items-center py-8">
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        quality={100}
        className="z-[-1] object-cover"
      />

      <div className="relative z-10 w-full max-w-4xl px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl text-white font-peaberry mb-2">Game Over!</h1>
          <p className="text-2xl text-white font-peaberry">
            Category: {category?.toUpperCase()}
          </p>
        </div>

        {/* Score Display */}
        <div className="bg-[#6D845A] bg-opacity-80 border-4 border-[#3e4224] rounded-lg p-8 mb-6 text-center">
          <div className="text-white font-peaberry">
            <p className="text-6xl mb-4">
              {score}/10
            </p>
            <div className="w-full bg-[#3e4224] rounded-full h-8 mb-4">
              <div
                className="bg-green-400 h-8 rounded-full transition-all duration-500 flex items-center justify-center"
                style={{ width: `${percentage}%` }}
              >
                <span className="text-white font-peaberry font-bold">
                  {percentage}%
                </span>
              </div>
            </div>
            <p className="text-2xl mb-6">{getPerformanceMessage()}</p>
            
            {/* Fish Display */}
            <div className="flex justify-center mb-4">
              <Image
                src={getFishImage()}
                alt="Performance Fish"
                width={fishSize * 80}
                height={fishSize * 60}
                className="transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-[#c8b78c] bg-opacity-90 border-4 border-[#6D845A] rounded-lg p-6 mb-6">
          <h2 className="text-3xl text-[#3e4224] font-peaberry mb-4 text-center">
            Answer Review
          </h2>
          <div className="max-h-96 overflow-y-auto scrollable-container">
            {userAnswers.map((answer, index) => {
              const question = questions.find((q) => q.id === answer.questionId);
              return (
                <div
                  key={answer.questionId}
                  className={`mb-4 p-4 rounded-lg ${
                    answer.correct
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-red-100 border-2 border-red-500"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-peaberry text-lg text-[#3e4224] mb-1">
                        Question {index + 1}: {question?.description}
                      </p>
                      <p className="font-peaberry text-sm text-[#3e4224]">
                        Your choice: <strong>{answer.userChoice.toUpperCase()}</strong>
                        {" | "}
                        Correct answer: <strong>{answer.humanPosition.toUpperCase()}</strong>
                      </p>
                    </div>
                    <div className="text-3xl ml-4">
                      {answer.correct ? "✓" : "✗"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={handlePlayAgain}
            className="px-8 py-4 bg-[#6D845A] hover:bg-[#526443] text-white font-peaberry text-2xl rounded-lg transition-all hover:scale-105"
          >
            🔄 Play Again
          </button>
          <button
            onClick={handleGoHome}
            className="px-8 py-4 bg-[#3e4224] hover:bg-[#2a2e18] text-white font-peaberry text-2xl rounded-lg transition-all hover:scale-105"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

