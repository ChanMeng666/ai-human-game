"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import Navigation from "@/src/components/Navigation";
import questionsDataRaw from "@/src/data/questions.json";
import { Question } from "@/src/context/GameContext";

const questionsData = questionsDataRaw as Question[];

export default function CategorySelection() {
  const router = useRouter();
  const { setCategory, setQuestions, completedCategories, totalScore, soundEnabled } = useGame();

  const playBubbleSound = () => {
    if (soundEnabled) {
      const bubbleAudio = new Audio("/audio/bubble.wav");
      bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    playBubbleSound();
    setCategory(categoryName);

    // Filter questions by category
    let categoryQuestions = questionsData.filter(
      (q) => q.category === categoryName
    );

    // Sort questions by difficulty for progressive difficulty
    // This creates a better learning curve: easy → medium → hard
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    categoryQuestions = categoryQuestions.sort((a, b) => {
      const diffA = difficultyOrder[a.difficulty];
      const diffB = difficultyOrder[b.difficulty];
      if (diffA !== diffB) {
        return diffA - diffB;
      }
      // Within same difficulty, randomize
      return Math.random() - 0.5;
    });

    setQuestions(categoryQuestions);

    // Navigate to game page after a short delay
    setTimeout(() => {
      router.push("/game");
    }, 300);
  };

  const handleViewSummary = () => {
    playBubbleSound();
    setTimeout(() => {
      router.push("/summary");
    }, 300);
  };

  const categories = [
    { 
      name: "text", 
      iconClass: "file", 
      label: "Text", 
      description: "Articles, poems, stories" 
    },
    { 
      name: "images", 
      iconClass: "star", 
      label: "Images", 
      description: "Art, photos, designs" 
    },
    { 
      name: "audio", 
      iconClass: "heart", 
      label: "Audio", 
      description: "Music, voices, sounds" 
    },
    { 
      name: "videos", 
      iconClass: "trophy", 
      label: "Videos", 
      description: "Clips, animations, films" 
    },
  ];

  const completedCategoryNames = completedCategories.map(c => c.category);
  const isCategoryCompleted = (categoryName: string) => completedCategoryNames.includes(categoryName);
  const getCategoryScore = (categoryName: string) => {
    const category = completedCategories.find(c => c.category === categoryName);
    return category ? `${category.score}/${category.totalQuestions}` : null;
  };

  // Dynamic scoring - max depends on difficulty distribution and bonuses
  // Show progress based on completed categories instead of fixed max

  const getPerformanceBadge = (score: number, totalQuestions: number) => {
    const percent = (score / totalQuestions) * 100;
    if (percent === 100) return { icon: "trophy", label: "Perfect", color: "bg-yellow-500" };
    if (percent >= 80) return { icon: "star", label: "Excellent", color: "bg-green-500" };
    if (percent >= 50) return { icon: "thumbs-up", label: "Good", color: "bg-blue-500" };
    return { icon: "heart", label: "Try Again", color: "bg-gray-500" };
  };

  const getRecommendedCategory = () => {
    if (completedCategories.length === 0) return "text";
    const categoryOrder = ["text", "images", "audio", "videos"];
    const completedNames = completedCategories.map(c => c.category);
    return categoryOrder.find(cat => !completedNames.includes(cat)) || categoryOrder[0];
  };

  const recommendedCategory = getRecommendedCategory();

  return (
    <div className="min-h-screen pond-gradient flex flex-col p-3 sm:p-4 md:p-6 lg:p-8">
      <Navigation showBackButton={true} showProgress={true} />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
          
          {/* Title Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="nes-container is-dark with-title mb-6 sm:mb-8 md:mb-10">
            <p className="title text-xs sm:text-sm md:text-base">Choose Your Category</p>
            <p className="text-white text-[10px] sm:text-xs md:text-sm opacity-90 py-4 sm:py-5 md:py-6 px-2 sm:px-4">
              Select what type of content you want to test
            </p>
          </div>

          {/* Enhanced Progress Card */}
          {completedCategories.length > 0 && (
            <div className="nes-container is-dark mb-6 sm:mb-8 md:mb-10 animate-fade-in">
              <div className="text-center">
                <p className="text-white text-sm sm:text-base md:text-lg mb-2 font-bold flex items-center justify-center gap-2">
                  <i className="nes-icon check-circle is-small"></i>
                  <span>Your Progress</span>
                </p>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  {totalScore} Points
                </div>
                <div className="flex flex-col items-center gap-2 mb-3">
                  <p className="text-white text-xs sm:text-sm">
                    <i className="nes-icon trophy is-small"></i> {completedCategories.length}/4 Categories Completed
                  </p>
                  {completedCategories.length === 4 && (
                    <p className="text-yellow-400 text-xs sm:text-sm font-bold animate-pulse">
                      🎉 All Categories Mastered!
                    </p>
                  )}
                </div>
                <button
                  onClick={handleViewSummary}
                  className="nes-btn is-success text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto hover:scale-105 transition-transform"
                >
                  <i className="nes-icon star is-small"></i>
                  <span>View Detailed Summary</span>
                </button>
              </div>
            </div>
          )}

          {/* Recommended Category (for users with progress) */}
          {completedCategories.length > 0 && completedCategories.length < 4 && (
            <div className="nes-container is-rounded pond-theme mb-6 sm:mb-8 md:mb-10 animate-slide-in-up">
              <p className="text-xs sm:text-sm text-center py-2 sm:py-3">
                <i className="nes-icon star is-small"></i> Recommended: Try <strong className="uppercase">{recommendedCategory}</strong> next!
              </p>
            </div>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-10">
          {categories.map((category) => {
            const isCompleted = isCategoryCompleted(category.name);
            const score = getCategoryScore(category.name);
            const isRecommended = category.name === recommendedCategory && !isCompleted;
            const categoryData = completedCategories.find(c => c.category === category.name);
            const badge = categoryData ? getPerformanceBadge(categoryData.score, categoryData.totalQuestions) : null;
            const percentage = categoryData ? (categoryData.score / categoryData.totalQuestions) * 100 : 0;
            
            return (
              <div 
                key={category.name} 
                className={`nes-container is-rounded ${
                  isCompleted ? 'is-success' : isRecommended ? 'is-warning' : 'pond-theme'
                } ${isCompleted ? 'animate-pulse-slow' : ''} relative`}
              >
                <div className="text-center py-6 sm:py-7 md:py-8 lg:py-10 relative">
                  {isRecommended && (
                    <div className="absolute top-2 left-2 right-2 text-center">
                      <span className="text-[8px] sm:text-[10px] font-bold bg-yellow-500 text-black px-2 py-1 rounded flex items-center justify-center gap-1">
                        <i className="nes-icon star is-small" style={{ transform: "scale(0.6)" }}></i>
                        <span>RECOMMENDED</span>
                      </span>
                    </div>
                  )}
                  {isCompleted && badge && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <i className={`nes-icon ${badge.icon} is-small`}></i>
                    </div>
                  )}
                  <div className="mb-3 sm:mb-4 flex justify-center">
                    <i className={`nes-icon ${category.iconClass} is-large`}></i>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
                    {category.label}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm opacity-80 mb-3 sm:mb-4">
                    {category.description}
                  </p>
                  {isCompleted && score && badge && (
                    <div className="mb-3">
                      <p className="text-sm sm:text-base font-bold mb-1">
                        Score: {score}
                      </p>
                      <progress 
                        className={`nes-progress w-full ${
                          percentage >= 80 ? 'is-success' : 
                          percentage >= 50 ? 'is-warning' : 
                          'is-error'
                        }`}
                        value={percentage} 
                        max="100"
                        style={{ height: '16px' }}
                      ></progress>
                      <p className="text-[10px] sm:text-xs opacity-70 mt-1">{badge.label} ({percentage.toFixed(0)}%)</p>
                    </div>
                  )}
                  <button
                    onClick={() => handleCategorySelect(category.name)}
                    className={`nes-btn ${
                      isCompleted ? 'is-warning' : isRecommended ? 'is-success' : 'is-primary'
                    } text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto hover:scale-105 transition-transform`}
                  >
                    <i className={`nes-icon ${isCompleted ? 'redo' : 'caret-right'} is-small`}></i>
                    <span>{isCompleted ? 'Retry' : 'Start'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        </div>
      </div>
    </div>
  );
}
