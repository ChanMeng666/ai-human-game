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
    baseScore,
    bonusScore,
    currentCombo,
    maxCombo,
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
  const [showComboAchievement, setShowComboAchievement] = useState<number | null>(null);
  const [showMilestoneAchievement, setShowMilestoneAchievement] = useState<number | null>(null);

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
    const prevCombo = currentCombo;
    const prevQuestionIndex = currentQuestionIndex;

    const isCorrect = submitAnswer(choice);
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      playCorrectSound();

      // Check for combo achievements
      const newCombo = prevCombo + 1;
      if ([3, 5, 10, 15, 20].includes(newCombo)) {
        setTimeout(() => setShowComboAchievement(newCombo), 800);
      }

      // Check for milestone achievements
      const nextQuestionNum = prevQuestionIndex + 1;
      if ([5, 10, 15, 20].includes(nextQuestionNum)) {
        setTimeout(() => setShowMilestoneAchievement(nextQuestionNum), 1200);
      }
    } else {
      playIncorrectSound();
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedChoice(null);
      setShowComboAchievement(null);
      setShowMilestoneAchievement(null);
      nextQuestion();
    }, 2500);
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
    <div className="min-h-screen pond-gradient flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
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
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="nes-container is-dark">
          <div className="flex flex-wrap justify-between items-center gap-2 text-[10px] sm:text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <span>Q {currentQuestionIndex + 1}/20</span>
              {currentQuestion && (
                <span className={`px-2 py-1 rounded text-[9px] sm:text-[10px] ${
                  currentQuestion.difficulty === "easy" ? "bg-green-600" :
                  currentQuestion.difficulty === "hard" ? "bg-red-600" : "bg-yellow-600"
                }`}>
                  {currentQuestion.difficulty.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span>💯 {score}</span>
              {currentCombo > 0 && (
                <span className="bg-orange-500 px-2 py-1 rounded flex items-center gap-1 animate-pulse">
                  🔥 {currentCombo}x
                </span>
              )}
            </div>
            <span className="bg-[#c846ab] px-2 py-1 rounded">
              {category?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="nes-container is-rounded pond-theme mb-4 sm:mb-6 md:mb-8">
        <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-2 sm:mb-3 md:mb-4">
          {currentQuestion.description}
        </p>
        <p className="text-center text-[10px] sm:text-xs opacity-80">
          Make your judgment: AI-generated or Human-created?
        </p>
      </div>

      {/* Content Display Area - Single centered item */}
      <div className="flex-1 flex flex-col items-center justify-center mb-4 sm:mb-6 max-w-4xl mx-auto w-full">

        {/* Content Panel */}
        <div className="w-full mb-6 sm:mb-8 md:mb-10">
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
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full max-w-2xl">
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
          } flex flex-col items-center justify-center gap-4`}>
            <div className="animate-bounce">
              <i className={`nes-icon ${lastAnswerCorrect ? "check" : "times"}`} style={{ fontSize: "4rem" }}></i>
            </div>
            {!lastAnswerCorrect && currentQuestion && (
              <div className="bg-black bg-opacity-70 px-6 py-3 rounded">
                <p className="text-white font-pixel-display text-sm sm:text-base text-center">
                  It was {currentQuestion.isAI ? "AI-generated" : "Human-created"}!
                </p>
              </div>
            )}
            {showComboAchievement && (
              <div className="bg-orange-500 px-6 py-3 rounded animate-pulse">
                <p className="text-white font-pixel-display text-sm sm:text-base text-center flex items-center gap-2">
                  <span>🔥</span>
                  <span>{showComboAchievement}x COMBO!</span>
                  <span>+{showComboAchievement === 3 ? 1 : showComboAchievement === 5 ? 3 : showComboAchievement === 10 ? 5 : showComboAchievement === 15 ? 8 : 10} Bonus</span>
                </p>
              </div>
            )}
            {showMilestoneAchievement && (
              <div className="bg-purple-600 px-6 py-3 rounded animate-pulse">
                <p className="text-white font-pixel-display text-sm sm:text-base text-center flex items-center gap-2">
                  <span>🎯</span>
                  <span>{showMilestoneAchievement}/20 Milestone!</span>
                  <span>+{showMilestoneAchievement === 5 ? 2 : showMilestoneAchievement === 10 ? 3 : showMilestoneAchievement === 15 ? 5 : 10} Bonus</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
