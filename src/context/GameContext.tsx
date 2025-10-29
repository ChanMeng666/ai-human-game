"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Question {
  id: number;
  category: string;
  humanContent: string;
  aiContent: string;
  humanPosition: string;
  description: string;
}

export interface UserAnswer {
  questionId: number;
  userChoice: string;
  correct: boolean;
  humanPosition: string;
}

interface GameState {
  category: string | null;
  currentQuestionIndex: number;
  score: number;
  userAnswers: UserAnswer[];
  questions: Question[];
  isGameStarted: boolean;
  isGameFinished: boolean;
}

interface GameContextType extends GameState {
  setCategory: (category: string) => void;
  setQuestions: (questions: Question[]) => void;
  startGame: () => void;
  submitAnswer: (choice: "left" | "right") => boolean;
  nextQuestion: () => void;
  resetGame: () => void;
  getCurrentQuestion: () => Question | null;
}

const initialState: GameState = {
  category: null,
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  questions: [],
  isGameStarted: false,
  isGameFinished: false,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const setCategory = (category: string) => {
    setGameState((prev) => ({ ...prev, category }));
  };

  const setQuestions = (questions: Question[]) => {
    setGameState((prev) => ({ ...prev, questions }));
  };

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      isGameStarted: true,
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: [],
      isGameFinished: false,
    }));
  };

  const submitAnswer = (choice: string): boolean => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    if (!currentQuestion) return false;

    const isCorrect = choice === currentQuestion.humanPosition;
    
    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      userChoice: choice,
      correct: isCorrect,
      humanPosition: currentQuestion.humanPosition,
    };

    setGameState((prev) => ({
      ...prev,
      userAnswers: [...prev.userAnswers, userAnswer],
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    return isCorrect;
  };

  const nextQuestion = () => {
    setGameState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const isFinished = nextIndex >= prev.questions.length;
      
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        isGameFinished: isFinished,
      };
    });
  };

  const resetGame = () => {
    setGameState(initialState);
  };

  const getCurrentQuestion = (): Question | null => {
    return gameState.questions[gameState.currentQuestionIndex] || null;
  };

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        setCategory,
        setQuestions,
        startGame,
        submitAnswer,
        nextQuestion,
        resetGame,
        getCurrentQuestion,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

