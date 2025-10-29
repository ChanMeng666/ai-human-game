"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";
import questionsData from "@/src/data/questions.json";

export default function CategorySelection() {
  const router = useRouter();
  const { setCategory, setQuestions } = useGame();

  const playBubbleSound = () => {
    const bubbleAudio = new Audio("/audio/bubble.wav");
    bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
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

  const categories = [
    { 
      name: "text", 
      icon: "📝", 
      label: "Text", 
      description: "Articles, poems, stories" 
    },
    { 
      name: "images", 
      icon: "🖼️", 
      label: "Images", 
      description: "Art, photos, designs" 
    },
    { 
      name: "audio", 
      icon: "🎵", 
      label: "Audio", 
      description: "Music, voices, sounds" 
    },
    { 
      name: "videos", 
      icon: "🎬", 
      label: "Videos", 
      description: "Clips, animations, films" 
    },
  ];

  return (
    <div className="min-h-screen pond-gradient flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
        
        {/* Title Section */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="nes-container is-dark with-title mb-4 sm:mb-6">
            <p className="title text-xs sm:text-sm md:text-base">Choose Your Category</p>
            <p className="text-white text-[10px] sm:text-xs md:text-sm opacity-90 py-3 sm:py-4 px-2 sm:px-4">
              Select what type of content you want to test
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
          {categories.map((category) => (
            <div key={category.name} className="nes-container is-rounded pond-theme">
              <div className="text-center py-4 sm:py-5 md:py-6">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3">
                  {category.icon}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
                  {category.label}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm opacity-80 mb-3 sm:mb-4">
                  {category.description}
                </p>
                <button
                  onClick={() => handleCategorySelect(category.name)}
                  className="nes-btn is-primary text-xs sm:text-sm"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/">
            <button className="nes-btn text-xs sm:text-sm">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
