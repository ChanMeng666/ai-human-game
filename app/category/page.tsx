"use client";

import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
    <div className="relative h-screen w-full flex items-center justify-center">
      <Image 
        src={backgroundImage} 
        alt="Background" 
        fill 
        quality={100} 
        className="z-[-1] object-cover" 
        priority
      />

      {isMobile && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center text-white text-center p-6 z-50">
          <p className="text-2xl font-bold mb-4 font-peaberry">⚠️</p>
          <p className="text-2xl font-bold mb-4 font-peaberry">Not Optimized for Mobile</p>
          <p className="text-lg font-peaberry">This game is best played on a desktop or laptop.</p>
        </div>
      )}

      {!isMobile && (
        <div className="relative w-[90%] max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl text-white font-peaberry mb-4">
              Choose Your Category
            </h1>
            <p className="text-white text-xl font-peaberry">
              Select what type of content you want to test
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategorySelect(category.name)}
                className="relative group"
              >
                <div className="relative">
                  <Image
                    src={windowSquare}
                    alt={`${category.label} Category`}
                    width={300}
                    height={300}
                    className="w-full hover:scale-105 transition-transform duration-200"
                    quality={100}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <p className="text-4xl md:text-5xl mb-2 font-peaberry text-white">
                      {category.label.split(" ")[0]}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold mb-2 font-peaberry text-white">
                      {category.label.split(" ")[1]}
                    </p>
                    <p className="text-sm md:text-base font-peaberry text-white opacity-80">
                      {category.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/">
              <button className="px-8 py-3 bg-[#6D845A] hover:bg-[#526443] text-white font-peaberry text-xl rounded-lg transition-colors">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

