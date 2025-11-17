"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import ContentDisplay from "@/src/components/ContentDisplay";
import Navigation from "@/src/components/Navigation";
import ExitConfirmDialog from "@/src/components/ExitConfirmDialog";
import HintBubble from "@/src/components/HintBubble";
import { useKeyboardNavigation } from "@/src/hooks/useKeyboardNavigation";

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
    soundEnabled,
  } = useGame();

  const [hasStarted, setHasStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<"ai" | "human" | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);

  useEffect(() => {
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
    if (isGameFinished && hasStarted) {
      setTimeout(() => {
        router.push("/results");
      }, 1000);
    }
  }, [isGameFinished, hasStarted, router]);

  const currentQuestion = getCurrentQuestion();

  const playCorrectSound = () => {
    if (soundEnabled) {
      const correctAudio = new Audio("/audio/correct.wav");
      correctAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const playIncorrectSound = () => {
    if (soundEnabled) {
      const incorrectAudio = new Audio("/audio/incorrect.wav");
      incorrectAudio.volume = 0.3;
      incorrectAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleExitRequest = () => {
    setShowExitDialog(true);
  };

  const handleExitConfirm = () => {
    setShowExitDialog(false);
    router.push("/category");
  };

  const handleExitCancel = () => {
    setShowExitDialog(false);
  };

  // Keyboard navigation - 'H' for Human, 'A' for AI
  useKeyboardNavigation({
    onLeft: () => !showFeedback && handleChoice("human"), // H key or Left arrow
    onRight: () => !showFeedback && handleChoice("ai"),   // A key or Right arrow
    onEscape: handleExitRequest,
    enabled: !showExitDialog,
  });

  const handleChoice = (choice: "ai" | "human") => {
    if (showFeedback || !currentQuestion) return;

    setSelectedChoice(choice);
    const isCorrect = submitAnswer(choice);
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedChoice(null);
      nextQuestion();
    }, 2000);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen pond-gradient flex items-center justify-center">
        <div className="nes-container is-dark">
          <p className="text-white text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pond-gradient flex flex-col p-2 sm:p-3 md:p-4">
      <Navigation
        showBackButton={false}
        showExitButton={true}
        onExit={handleExitRequest}
      />

      <ExitConfirmDialog
        show={showExitDialog}
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
      />

      {category && (
        <HintBubble questionIndex={currentQuestionIndex} category={category} />
      )}

      {/* Top Bar */}
      <div className="mb-2 sm:mb-3 md:mb-4">
        <div className="nes-container is-dark">
          <div className="flex flex-wrap justify-between items-center gap-2 text-[10px] sm:text-xs md:text-sm">
            <span>Q {currentQuestionIndex + 1}/20</span>
            <span>Score: {score}</span>
            <span className="bg-[#c846ab] px-2 py-1 rounded">
              {category?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="nes-container is-rounded pond-theme mb-2 sm:mb-3 md:mb-4">
        <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2">
          {currentQuestion.description}
        </p>
        <p className="text-center text-[10px] sm:text-xs opacity-80">
          Make your judgment: AI-generated or Human-created?
        </p>
      </div>

      {/* Content Display Area - Single centered item */}
      <div className="flex-1 flex flex-col items-center justify-center mb-2 sm:mb-3 max-w-4xl mx-auto w-full">

        {/* Content Panel */}
        <div className="w-full mb-3 sm:mb-4">
          <div className="nes-container pond-theme overflow-hidden">
            <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
              <ContentDisplay
                type={currentQuestion.category}
                contentPath={currentQuestion.content}
                position="center"
              />
            </div>
          </div>
        </div>

        {/* Answer Buttons - Side by side */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl">
          {/* Human Button */}
          <button
            onClick={() => handleChoice("human")}
            disabled={showFeedback}
            className={`nes-btn text-xs sm:text-sm md:text-base flex flex-col items-center justify-center gap-2 py-4 sm:py-6 ${
              showFeedback && selectedChoice === "human"
                ? lastAnswerCorrect
                  ? "is-success"
                  : "is-error"
                : "is-primary"
            }`}
          >
            {showFeedback && selectedChoice === "human" ? (
              lastAnswerCorrect ? (
                <>
                  <i className="nes-icon check is-small"></i>
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <i className="nes-icon times is-small"></i>
                  <span>Wrong</span>
                </>
              )
            ) : (
              <>
                <i className="nes-icon user is-medium"></i>
                <span className="font-bold">HUMAN</span>
                <span className="text-[10px] sm:text-xs opacity-70">(Press H or ←)</span>
              </>
            )}
          </button>

          {/* AI Button */}
          <button
            onClick={() => handleChoice("ai")}
            disabled={showFeedback}
            className={`nes-btn text-xs sm:text-sm md:text-base flex flex-col items-center justify-center gap-2 py-4 sm:py-6 ${
              showFeedback && selectedChoice === "ai"
                ? lastAnswerCorrect
                  ? "is-success"
                  : "is-error"
                : "is-warning"
            }`}
          >
            {showFeedback && selectedChoice === "ai" ? (
              lastAnswerCorrect ? (
                <>
                  <i className="nes-icon check is-small"></i>
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <i className="nes-icon times is-small"></i>
                  <span>Wrong</span>
                </>
              )
            ) : (
              <>
                <i className="nes-icon trophy is-medium"></i>
                <span className="font-bold">AI</span>
                <span className="text-[10px] sm:text-xs opacity-70">(Press A or →)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black bg-opacity-30">
          <div className={`${
            lastAnswerCorrect ? "text-green-400" : "text-red-400"
          } animate-bounce flex flex-col items-center justify-center gap-4`}>
            <i className={`nes-icon ${lastAnswerCorrect ? "check" : "times"}`} style={{ fontSize: "4rem" }}></i>
            {!lastAnswerCorrect && currentQuestion && (
              <div className="bg-black bg-opacity-70 px-6 py-3 rounded">
                <p className="text-white font-pixel-display text-sm sm:text-base text-center">
                  It was {currentQuestion.isAI ? "AI-generated" : "Human-created"}!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
