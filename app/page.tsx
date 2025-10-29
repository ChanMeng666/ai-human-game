"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/src/assets/bg_dim.png";
import windowSquareAndTitle from "@/src/assets/window_square_and_title.png";
import playBtn from "@/src/assets/txt_play.png";

export default function Home() {
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
          <p className="text-lg font-peaberry">Please switch to a larger screen for the best experience. 🐟</p>
        </div>
      )}

      {!isMobile && (
        <div className="relative w-[400px] md:w-[600px]">
          <h1 className="absolute top-4 left-5 md:top-6 md:left-7 text-xl md:text-4xl text-white font-peaberry">
            AI vs Human
          </h1>
          <Image 
            src={windowSquareAndTitle} 
            alt="Window Square and Title" 
            className="w-[400px] md:w-[600px]" 
            quality={100}
            priority
          />
          <div className="absolute inset-x-0 transform flex flex-col space-y-4 md:space-y-8 bottom-16 md:bottom-20">
            <div className="flex justify-center">
              <Link href="/category">
                <Image
                  src={playBtn}
                  alt="Play Button"
                  className="cursor-pointer hover:scale-110 transition-transform w-[150px] md:w-[250px]"
                  quality={100}
                  onClick={playBubbleSound}
                />
              </Link>
            </div>
            <div className="flex justify-center">
              <p className="text-white text-center font-peaberry text-sm md:text-lg max-w-md px-4">
                Can you tell the difference between<br />
                AI-generated and human-created content?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
