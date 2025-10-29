"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGame } from "@/src/context/GameContext";
import ContentDisplay from "@/src/components/ContentDisplay";
import backgroundImage from "@/src/assets/bg_dim.png";

export default function GamePage() {
  const router = useRouter();
  const {
    category,
    questions,
    currentQuestionIndex,
    score,
    startGame,
    submitAnswer,
    nextQuestion,
    getCurrentQuestion,
    isGameFinished,
  } = useGame();

  const [hasStarted, setHasStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    // Check if we have questions loaded
    if (!category || questions.length === 0) {
      router.push("/category");
      return;
    }

    if (!hasStarted) {
      startGame();
      setHasStarted(true);
    }
  }, [category, questions, hasStarted, startGame, router]);

  useEffect(() => {
    // Check if game is finished
    if (isGameFinished && hasStarted) {
      setTimeout(() => {
        router.push("/results");
      }, 1000);
    }
  }, [isGameFinished, hasStarted, router]);

  const currentQuestion = getCurrentQuestion();

  const playCorrectSound = () => {
    const correctAudio = new Audio("/audio/correct.wav");
    correctAudio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const playIncorrectSound = () => {
    const incorrectAudio = new Audio("/audio/incorrect.wav");
    incorrectAudio.volume = 0.3;
    incorrectAudio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const handleChoice = (choice: "left" | "right") => {
    if (showFeedback || !currentQuestion) return;

    setSelectedSide(choice);
    const isCorrect = submitAnswer(choice);
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedSide(null);
      nextQuestion();
    }, 2000);
  };

  if (!currentQuestion) {
    return (
      <div className="relative h-screen w-full flex items-center justify-center">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          quality={100}
          className="z-[-1] object-cover"
        />
        <div className="text-white font-peaberry text-xl sm:text-2xl">Loading...</div>
      </div>
    );
  }

  const leftContent = currentQuestion.humanPosition === "left" 
    ? currentQuestion.humanContent 
    : currentQuestion.aiContent;
  const rightContent = currentQuestion.humanPosition === "right" 
    ? currentQuestion.humanContent 
    : currentQuestion.aiContent;

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        quality={100}
        className="z-[-1] object-cover"
      />

      {/* Top Bar */}
      <div className="relative z-10 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-8">
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3 max-w-7xl mx-auto">
          <div className="text-white font-peaberry text-sm sm:text-lg md:text-2xl">
            Q {currentQuestionIndex + 1}/10
          </div>
          <div className="text-white font-peaberry text-sm sm:text-lg md:text-2xl">
            Score: {score}
          </div>
          <div className="text-white font-peaberry text-xs sm:text-base md:text-xl bg-[#6D845A] px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg">
            {category?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Question Description */}
      <div className="relative z-10 pt-3 sm:pt-4 md:pt-6 text-center px-4">
        <h2 className="text-white font-peaberry text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2">
          {currentQuestion.description}
        </h2>
        <p className="text-white font-peaberry text-xs sm:text-sm md:text-base lg:text-lg opacity-80">
          Click on the human-created content
        </p>
      </div>

      {/* Content Display Area - Responsive Grid */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          
          {/* Left Panel (or Top on mobile) */}
          <div className="relative w-full">
            <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] bg-[#6D845A] bg-opacity-30 border-2 sm:border-3 md:border-4 border-[#6D845A] rounded-lg overflow-hidden">
              <ContentDisplay
                type={currentQuestion.category}
                contentPath={leftContent}
                position="left"
              />
            </div>
            <button
              onClick={() => handleChoice("left")}
              disabled={showFeedback}
              className={`mt-3 sm:mt-4 w-full py-2 sm:py-3 md:py-4 font-peaberry text-base sm:text-lg md:text-xl lg:text-2xl rounded-lg transition-all duration-200 touch-manipulation ${
                showFeedback && selectedSide === "left"
                  ? lastAnswerCorrect
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-[#6D845A] hover:bg-[#526443] active:bg-[#526443] text-white hover:scale-105 active:scale-95"
              } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {showFeedback && selectedSide === "left"
                ? lastAnswerCorrect
                  ? "✓ Correct!"
                  : "✗ Wrong"
                : <>
                    <span className="hidden lg:inline">← Choose Left</span>
                    <span className="lg:hidden">↑ Choose Top</span>
                  </>
              }
            </button>
          </div>

          {/* Right Panel (or Bottom on mobile) */}
          <div className="relative w-full">
            <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] bg-[#6D845A] bg-opacity-30 border-2 sm:border-3 md:border-4 border-[#6D845A] rounded-lg overflow-hidden">
              <ContentDisplay
                type={currentQuestion.category}
                contentPath={rightContent}
                position="right"
              />
            </div>
            <button
              onClick={() => handleChoice("right")}
              disabled={showFeedback}
              className={`mt-3 sm:mt-4 w-full py-2 sm:py-3 md:py-4 font-peaberry text-base sm:text-lg md:text-xl lg:text-2xl rounded-lg transition-all duration-200 touch-manipulation ${
                showFeedback && selectedSide === "right"
                  ? lastAnswerCorrect
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-[#6D845A] hover:bg-[#526443] active:bg-[#526443] text-white hover:scale-105 active:scale-95"
              } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {showFeedback && selectedSide === "right"
                ? lastAnswerCorrect
                  ? "✓ Correct!"
                  : "✗ Wrong"
                : <>
                    <span className="hidden lg:inline">Choose Right →</span>
                    <span className="lg:hidden">↓ Choose Bottom</span>
                  </>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-peaberry animate-bounce ${
            lastAnswerCorrect ? "text-green-400" : "text-red-400"
          }`}>
            {lastAnswerCorrect ? "✓" : "✗"}
          </div>
        </div>
      )}
    </div>
  );
}
