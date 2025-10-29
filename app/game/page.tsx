"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import ContentDisplay from "@/src/components/ContentDisplay";

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

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedSide(null);
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

  const leftContent = currentQuestion.humanPosition === "left" 
    ? currentQuestion.humanContent 
    : currentQuestion.aiContent;
  const rightContent = currentQuestion.humanPosition === "right" 
    ? currentQuestion.humanContent 
    : currentQuestion.aiContent;

  return (
    <div className="min-h-screen pond-gradient flex flex-col p-2 sm:p-3 md:p-4">
      
      {/* Top Bar */}
      <div className="mb-2 sm:mb-3 md:mb-4">
        <div className="nes-container is-dark">
          <div className="flex flex-wrap justify-between items-center gap-2 text-[10px] sm:text-xs md:text-sm">
            <span>Q {currentQuestionIndex + 1}/10</span>
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
          Click on the human-created content
        </p>
      </div>

      {/* Content Display Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
        
        {/* Left/Top Panel */}
        <div className="flex flex-col">
          <div className="nes-container pond-theme flex-1 mb-2 sm:mb-3 overflow-hidden">
            <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              <ContentDisplay
                type={currentQuestion.category}
                contentPath={leftContent}
                position="left"
              />
            </div>
          </div>
          <button
            onClick={() => handleChoice("left")}
            disabled={showFeedback}
            className={`nes-btn text-xs sm:text-sm flex items-center justify-center gap-2 ${
              showFeedback && selectedSide === "left"
                ? lastAnswerCorrect
                  ? "is-success"
                  : "is-error"
                : "is-primary"
            }`}
          >
            {showFeedback && selectedSide === "left"
              ? lastAnswerCorrect
                ? <><i className="nes-icon check is-small"></i><span>Correct!</span></>
                : <><i className="nes-icon times is-small"></i><span>Wrong</span></>
              : <>
                  <span className="hidden lg:inline flex items-center gap-2">
                    <i className="nes-icon caret-left is-small"></i>
                    <span>Choose Left</span>
                  </span>
                  <span className="lg:hidden flex items-center gap-2">
                    <i className="nes-icon caret-up is-small"></i>
                    <span>Choose This</span>
                  </span>
                </>
            }
          </button>
        </div>

        {/* Right/Bottom Panel */}
        <div className="flex flex-col">
          <div className="nes-container pond-theme flex-1 mb-2 sm:mb-3 overflow-hidden">
            <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              <ContentDisplay
                type={currentQuestion.category}
                contentPath={rightContent}
                position="right"
              />
            </div>
          </div>
          <button
            onClick={() => handleChoice("right")}
            disabled={showFeedback}
            className={`nes-btn text-xs sm:text-sm flex items-center justify-center gap-2 ${
              showFeedback && selectedSide === "right"
                ? lastAnswerCorrect
                  ? "is-success"
                  : "is-error"
                : "is-primary"
            }`}
          >
            {showFeedback && selectedSide === "right"
              ? lastAnswerCorrect
                ? <><i className="nes-icon check is-small"></i><span>Correct!</span></>
                : <><i className="nes-icon times is-small"></i><span>Wrong</span></>
              : <>
                  <span className="hidden lg:inline flex items-center gap-2">
                    <span>Choose Right</span>
                    <i className="nes-icon caret-right is-small"></i>
                  </span>
                  <span className="lg:hidden flex items-center gap-2">
                    <i className="nes-icon caret-down is-small"></i>
                    <span>Choose This</span>
                  </span>
                </>
            }
          </button>
        </div>
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black bg-opacity-30">
          <div className={`${
            lastAnswerCorrect ? "text-green-400" : "text-red-400"
          } animate-bounce flex items-center justify-center`}>
            <i className={`nes-icon ${lastAnswerCorrect ? "check" : "times"}`} style={{ fontSize: "4rem" }}></i>
          </div>
        </div>
      )}
    </div>
  );
}
