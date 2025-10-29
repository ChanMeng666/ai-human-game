"use client";

import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/src/assets/bg_dim.png";
import windowSquareAndTitle from "@/src/assets/window_square_and_title.png";
import playBtn from "@/src/assets/txt_play.png";

export default function Home() {
  const playBubbleSound = () => {
    const bubbleAudio = new Audio("/audio/bubble.wav");
    bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6">
      <Image 
        src={backgroundImage} 
        alt="Background" 
        fill 
        quality={100} 
        className="z-[-1] object-cover" 
        priority
      />
      
      <div className="relative w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px]">
        <h1 className="absolute top-3 left-4 sm:top-4 sm:left-5 md:top-6 md:left-7 text-lg sm:text-2xl md:text-4xl text-white font-peaberry z-10">
          AI vs Human
        </h1>
        <Image 
          src={windowSquareAndTitle} 
          alt="Window Square and Title" 
          className="w-full" 
          quality={100}
          priority
        />
        <div className="absolute inset-x-0 transform flex flex-col space-y-3 sm:space-y-4 md:space-y-8 bottom-12 sm:bottom-14 md:bottom-20">
          <div className="flex justify-center">
            <Link href="/category">
              <Image
                src={playBtn}
                alt="Play Button"
                className="cursor-pointer hover:scale-110 active:scale-95 transition-transform w-[120px] sm:w-[180px] md:w-[250px]"
                quality={100}
                onClick={playBubbleSound}
              />
            </Link>
          </div>
          <div className="flex justify-center px-4">
            <p className="text-white text-center font-peaberry text-xs sm:text-sm md:text-lg max-w-md leading-relaxed">
              Can you tell the difference between<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              AI-generated and human-created content?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
