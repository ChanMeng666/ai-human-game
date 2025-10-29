"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ContentDisplayProps {
  type: string;
  contentPath: string;
  position: string;
}

export default function ContentDisplay({ type, contentPath, position }: ContentDisplayProps) {
  const [textContent, setTextContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (type === "text") {
      // Load text content
      fetch(contentPath)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load content");
          return res.text();
        })
        .then((text) => {
          setTextContent(text);
          setLoading(false);
        })
        .catch((err) => {
          setError("Content not found. Please add content files.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [type, contentPath]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white font-pixel-display text-base sm:text-lg md:text-xl">Loading...</div>
      </div>
    );
  }

  if (error && type === "text") {
    return (
      <div className="w-full h-full flex items-center justify-center p-3 sm:p-4">
        <div className="text-white font-pixel-display text-center">
          <div className="flex justify-center mb-2">
            <i className="nes-icon file is-medium"></i>
          </div>
          <p className="text-xs sm:text-sm">{error}</p>
          <p className="text-[10px] sm:text-xs mt-2 opacity-70 break-all">{contentPath}</p>
        </div>
      </div>
    );
  }

  switch (type) {
    case "text":
      return (
        <div className="w-full h-full overflow-y-auto scrollable-container p-3 sm:p-4 md:p-5 lg:p-6 bg-[#c8b78c] bg-opacity-30 rounded">
          <p className="text-white font-pixel-content text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed whitespace-pre-wrap break-words">
            {textContent || "Sample text content will appear here."}
          </p>
        </div>
      );

    case "images":
      return (
        <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4 bg-[#c8b78c] bg-opacity-20 rounded">
          <div className="relative w-full h-full">
            <Image
              src={contentPath}
              alt={`${position} image`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const container = target.parentElement;
                if (container) {
                  container.innerHTML = `
                    <div class="flex flex-col items-center justify-center h-full text-white font-pixel-display text-center px-2">
                      <div class="flex justify-center mb-2">
                        <i class="nes-icon star is-large"></i>
                      </div>
                      <p class="text-xs sm:text-sm md:text-base">Image not found</p>
                      <p class="text-[10px] sm:text-xs mt-2 opacity-70 break-all">${contentPath}</p>
                    </div>
                  `;
                }
              }}
            />
          </div>
        </div>
      );

    case "audio":
      return (
        <div className="w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 w-full max-w-md">
            <div className="flex justify-center">
              <i className="nes-icon heart is-large"></i>
            </div>
            <audio
              controls
              className="w-full max-w-full"
              style={{ maxWidth: "100%" }}
              onError={(e) => {
                console.log("Audio load error:", contentPath);
              }}
            >
              <source src={contentPath} type="audio/mpeg" />
              <source src={contentPath} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            <p className="text-white font-pixel-display text-xs sm:text-sm opacity-70">
              {position === "left" ? "Option A" : "Option B"}
            </p>
          </div>
        </div>
      );

    case "videos":
      return (
        <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4 bg-[#c8b78c] bg-opacity-20 rounded">
          <video
            controls
            className="w-full h-full object-contain max-w-full max-h-full"
            playsInline
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = "none";
              const container = target.parentElement;
              if (container) {
                container.innerHTML = `
                  <div class="flex flex-col items-center justify-center h-full text-white font-pixel-display text-center px-2">
                    <div class="flex justify-center mb-2">
                      <i class="nes-icon trophy is-large"></i>
                    </div>
                    <p class="text-xs sm:text-sm md:text-base">Video not found</p>
                    <p class="text-[10px] sm:text-xs mt-2 opacity-70 break-all">${contentPath}</p>
                  </div>
                `;
              }
            }}
          >
            <source src={contentPath} type="video/mp4" />
            <source src={contentPath} type="video/webm" />
            Your browser does not support the video element.
          </video>
        </div>
      );

    default:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white font-pixel-display text-sm sm:text-base">Unknown content type</p>
        </div>
      );
  }
}
