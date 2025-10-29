"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

export interface CategoryScore {
  category: string;
  score: number;
  totalQuestions: number;
  userAnswers: UserAnswer[];
}

interface GameState {
  category: string | null;
  currentQuestionIndex: number;
  score: number;
  userAnswers: UserAnswer[];
  questions: Question[];
  isGameStarted: boolean;
  isGameFinished: boolean;
  completedCategories: CategoryScore[];
  totalScore: number;
  soundEnabled: boolean;
}

interface SavedProgress {
  completedCategories: CategoryScore[];
  totalScore: number;
  currentCategory: string | null;
  currentQuestionIndex: number;
  currentScore: number;
  userAnswers: UserAnswer[];
  lastUpdated: number;
}

interface GameContextType extends GameState {
  setCategory: (category: string) => void;
  setQuestions: (questions: Question[]) => void;
  startGame: () => void;
  submitAnswer: (choice: "left" | "right") => boolean;
  nextQuestion: () => void;
  resetGame: () => void;
  resetAll: () => void;
  saveCurrentCategory: () => void;
  getCurrentQuestion: () => Question | null;
  soundEnabled: boolean;
  toggleSound: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => SavedProgress | null;
  clearSavedProgress: () => void;
  hasSavedProgress: () => boolean;
  restoreProgress: (progress: SavedProgress) => void;
}

const initialState: GameState = {
  category: null,
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  questions: [],
  isGameStarted: false,
  isGameFinished: false,
  completedCategories: [],
  totalScore: 0,
  soundEnabled: true,
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

  // LocalStorage keys
  const STORAGE_KEY_PROGRESS = "aiHumanGame_progress";
  const STORAGE_KEY_SOUND = "aiHumanGame_soundEnabled";

  // Load sound settings from LocalStorage on initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSound = localStorage.getItem(STORAGE_KEY_SOUND);
      if (savedSound !== null) {
        setGameState((prev) => ({ ...prev, soundEnabled: savedSound === "true" }));
      }
    }
  }, []);

  // LocalStorage functions
  const saveToLocalStorage = () => {
    if (typeof window === "undefined") return;

    const progress: SavedProgress = {
      completedCategories: gameState.completedCategories,
      totalScore: gameState.totalScore,
      currentCategory: gameState.category,
      currentQuestionIndex: gameState.currentQuestionIndex,
      currentScore: gameState.score,
      userAnswers: gameState.userAnswers,
      lastUpdated: Date.now(),
    };

    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  const loadFromLocalStorage = (): SavedProgress | null => {
    if (typeof window === "undefined") return null;

    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (!saved) return null;

      const progress: SavedProgress = JSON.parse(saved);
      
      // Validate data (expiration: 7 days)
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - progress.lastUpdated > sevenDaysInMs) {
        clearSavedProgress();
        return null;
      }

      return progress;
    } catch (error) {
      console.error("Failed to load progress:", error);
      return null;
    }
  };

  const clearSavedProgress = () => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch (error) {
      console.error("Failed to clear progress:", error);
    }
  };

  const hasSavedProgress = (): boolean => {
    return loadFromLocalStorage() !== null;
  };

  const restoreProgress = (progress: SavedProgress) => {
    setGameState((prev) => ({
      ...prev,
      completedCategories: progress.completedCategories,
      totalScore: progress.totalScore,
      category: progress.currentCategory,
      currentQuestionIndex: progress.currentQuestionIndex,
      score: progress.currentScore,
      userAnswers: progress.userAnswers,
    }));
  };

  // Sound control
  const toggleSound = () => {
    setGameState((prev) => {
      const newSoundEnabled = !prev.soundEnabled;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_SOUND, String(newSoundEnabled));
      }
      return { ...prev, soundEnabled: newSoundEnabled };
    });
  };

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

    // Auto-save progress
    setTimeout(() => saveToLocalStorage(), 100);

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
    setGameState((prev) => ({
      ...initialState,
      completedCategories: prev.completedCategories,
      totalScore: prev.totalScore,
    }));
  };

  const resetAll = () => {
    setGameState(initialState);
  };

  const saveCurrentCategory = () => {
    if (!gameState.category) return;

    const categoryScore: CategoryScore = {
      category: gameState.category,
      score: gameState.score,
      totalQuestions: gameState.questions.length,
      userAnswers: gameState.userAnswers,
    };

    setGameState((prev) => {
      // Check if category already exists
      const existingIndex = prev.completedCategories.findIndex(
        c => c.category === gameState.category
      );

      let newCompletedCategories;
      let scoreDiff = gameState.score;

      if (existingIndex >= 0) {
        // Update existing category
        const oldScore = prev.completedCategories[existingIndex].score;
        scoreDiff = gameState.score - oldScore;
        newCompletedCategories = [...prev.completedCategories];
        newCompletedCategories[existingIndex] = categoryScore;
      } else {
        // Add new category
        newCompletedCategories = [...prev.completedCategories, categoryScore];
      }

      return {
        ...prev,
        completedCategories: newCompletedCategories,
        totalScore: prev.totalScore + scoreDiff,
      };
    });

    // Save progress to LocalStorage
    setTimeout(() => saveToLocalStorage(), 100);
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
        resetAll,
        saveCurrentCategory,
        getCurrentQuestion,
        soundEnabled: gameState.soundEnabled,
        toggleSound,
        saveToLocalStorage,
        loadFromLocalStorage,
        clearSavedProgress,
        hasSavedProgress,
        restoreProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

