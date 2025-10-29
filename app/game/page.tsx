"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGame } from "@/src/context/GameContext";
import ContentDisplay from "@/src/components/ContentDisplay";
import backgroundImage from "@/src/assets/bg_dim.png";
import windowLong from "@/src/assets/window_long.png";

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
        <div className="text-white font-peaberry text-2xl">Loading...</div>
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
      <div className="relative z-10 pt-6 px-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-white font-peaberry text-2xl">
            Question {currentQuestionIndex + 1}/10
          </div>
          <div className="text-white font-peaberry text-2xl">
            Score: {score}
          </div>
          <div className="text-white font-peaberry text-xl bg-[#6D845A] px-4 py-2 rounded-lg">
            {category?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Question Description */}
      <div className="relative z-10 pt-6 text-center">
        <h2 className="text-white font-peaberry text-3xl mb-2">
          {currentQuestion.description}
        </h2>
        <p className="text-white font-peaberry text-lg opacity-80">
          Click on the human-created content
        </p>
      </div>

      {/* Content Display Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-7xl grid grid-cols-2 gap-8">
          {/* Left Panel */}
          <div className="relative">
            <div className="relative h-[500px] bg-[#6D845A] bg-opacity-30 border-4 border-[#6D845A] rounded-lg overflow-hidden">
              <ContentDisplay
                type={currentQuestion.category}
                contentPath={leftContent}
                position="left"
              />
            </div>
            <button
              onClick={() => handleChoice("left")}
              disabled={showFeedback}
              className={`mt-4 w-full py-4 font-peaberry text-2xl rounded-lg transition-all duration-200 ${
                showFeedback && selectedSide === "left"
                  ? lastAnswerCorrect
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-[#6D845A] hover:bg-[#526443] text-white hover:scale-105"
              } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {showFeedback && selectedSide === "left"
                ? lastAnswerCorrect
                  ? "✓ Correct!"
                  : "✗ Wrong"
                : "← Choose Left"}
            </button>
          </div>

          {/* Right Panel */}
          <div className="relative">
            <div className="relative h-[500px] bg-[#6D845A] bg-opacity-30 border-4 border-[#6D845A] rounded-lg overflow-hidden">
              <ContentDisplay
                type={currentQuestion.category}
                contentPath={rightContent}
                position="right"
              />
            </div>
            <button
              onClick={() => handleChoice("right")}
              disabled={showFeedback}
              className={`mt-4 w-full py-4 font-peaberry text-2xl rounded-lg transition-all duration-200 ${
                showFeedback && selectedSide === "right"
                  ? lastAnswerCorrect
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-[#6D845A] hover:bg-[#526443] text-white hover:scale-105"
              } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {showFeedback && selectedSide === "right"
                ? lastAnswerCorrect
                  ? "✓ Correct!"
                  : "✗ Wrong"
                : "Choose Right →"}
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className={`text-8xl font-peaberry animate-bounce ${
            lastAnswerCorrect ? "text-green-400" : "text-red-400"
          }`}>
            {lastAnswerCorrect ? "✓" : "✗"}
          </div>
        </div>
      )}
    </div>
  );
}

