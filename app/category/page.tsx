"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import backgroundImage from "@/src/assets/bg_dim.png";
import windowSquare from "@/src/assets/window_square.png";
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
    { name: "text", label: "📝 Text", description: "Articles, poems, stories" },
    { name: "images", label: "🖼️ Images", description: "Art, photos, designs" },
    { name: "audio", label: "🎵 Audio", description: "Music, voices, sounds" },
    { name: "videos", label: "🎬 Videos", description: "Clips, animations, films" },
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Image 
        src={backgroundImage} 
        alt="Background" 
        fill 
        quality={100} 
        className="z-[-1] object-cover" 
        priority
      />

      <div className="relative w-full max-w-[95%] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-peaberry mb-2 sm:mb-3 md:mb-4">
            Choose Your Category
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-peaberry px-4">
            Select what type of content you want to test
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategorySelect(category.name)}
              className="relative group touch-manipulation"
            >
              <div className="relative">
                <Image
                  src={windowSquare}
                  alt={`${category.label} Category`}
                  width={300}
                  height={300}
                  className="w-full hover:scale-105 active:scale-95 transition-transform duration-200"
                  quality={100}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-5 md:p-6">
                  <p className="text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2 font-peaberry text-white">
                    {category.label.split(" ")[0]}
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 font-peaberry text-white">
                    {category.label.split(" ")[1]}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base font-peaberry text-white opacity-80">
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Link href="/">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-[#6D845A] hover:bg-[#526443] active:bg-[#526443] text-white font-peaberry text-base sm:text-lg md:text-xl rounded-lg transition-colors touch-manipulation">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

