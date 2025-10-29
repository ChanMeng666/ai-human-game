"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import Navigation from "@/src/components/Navigation";
import questionsData from "@/src/data/questions.json";

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
    const categoryQuestions = questionsData.filter(
      (q) => q.category === categoryName
    );
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

  return (
    <div className="min-h-screen pond-gradient flex flex-col p-3 sm:p-4 md:p-6 lg:p-8">
      <Navigation showBackButton={true} showProgress={true} />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
          
          {/* Title Section */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="nes-container is-dark with-title mb-4 sm:mb-6">
            <p className="title text-xs sm:text-sm md:text-base">Choose Your Category</p>
            <p className="text-white text-[10px] sm:text-xs md:text-sm opacity-90 py-3 sm:py-4 px-2 sm:px-4">
              Select what type of content you want to test
            </p>
          </div>

          {/* Progress Bar */}
          {completedCategories.length > 0 && (
            <div className="nes-container pond-theme mb-4 sm:mb-6">
              <div className="text-center">
                <p className="text-xs sm:text-sm md:text-base mb-2 font-bold">
                  <i className="nes-icon trophy is-small"></i> Progress: {completedCategories.length}/4 Categories
                </p>
                <p className="text-xs sm:text-sm mb-2">
                  Total Score: <span className="font-bold">{totalScore}/{completedCategories.length * 10}</span>
                </p>
                <button
                  onClick={handleViewSummary}
                  className="nes-btn is-success text-[10px] sm:text-xs flex items-center justify-center gap-2 mx-auto"
                >
                  <i className="nes-icon star is-small"></i>
                  <span>View Summary</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
          {categories.map((category) => {
            const isCompleted = isCategoryCompleted(category.name);
            const score = getCategoryScore(category.name);
            
            return (
              <div key={category.name} className={`nes-container is-rounded ${isCompleted ? 'is-success' : 'pond-theme'}`}>
                <div className="text-center py-4 sm:py-5 md:py-6 relative">
                  {isCompleted && (
                    <div className="absolute top-2 right-2">
                      <i className="nes-icon check is-small"></i>
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
                  {isCompleted && score && (
                    <p className="text-xs sm:text-sm font-bold mb-2 text-green-600">
                      Score: {score}
                    </p>
                  )}
                  <button
                    onClick={() => handleCategorySelect(category.name)}
                    className={`nes-btn ${isCompleted ? 'is-warning' : 'is-primary'} text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto`}
                  >
                    <i className={`nes-icon ${isCompleted ? 'redo' : 'caret-right'} is-small`}></i>
                    <span>{isCompleted ? 'Retry' : 'Select'}</span>
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
