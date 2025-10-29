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
        <div className="text-white font-peaberry text-xl">Loading...</div>
      </div>
    );
  }

  if (error && type === "text") {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="text-white font-peaberry text-center">
          <p className="text-lg mb-2">📄</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2 opacity-70">Expected: {contentPath}</p>
        </div>
      </div>
    );
  }

  switch (type) {
    case "text":
      return (
        <div className="w-full h-full overflow-y-auto scrollable-container p-6 bg-[#c8b78c] bg-opacity-30 rounded">
          <p className="text-white font-peaberry text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            {textContent || "Sample text content will appear here."}
          </p>
        </div>
      );

    case "images":
      return (
        <div className="w-full h-full flex items-center justify-center p-4 bg-[#c8b78c] bg-opacity-20 rounded">
          <div className="relative w-full h-full">
            <Image
              src={contentPath}
              alt={`${position} image`}
              fill
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.innerHTML = `
                  <div class="flex flex-col items-center justify-center h-full text-white font-peaberry">
                    <p class="text-4xl mb-2">🖼️</p>
                    <p>Image not found</p>
                    <p class="text-xs mt-2 opacity-70">Expected: ${contentPath}</p>
                  </div>
                `;
              }}
            />
          </div>
        </div>
      );

    case "audio":
      return (
        <div className="w-full h-full flex items-center justify-center p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl">🎵</div>
            <audio
              controls
              className="w-full max-w-md"
              onError={(e) => {
                console.log("Audio load error:", contentPath);
              }}
            >
              <source src={contentPath} type="audio/mpeg" />
              <source src={contentPath} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            <p className="text-white font-peaberry text-sm opacity-70">
              {position === "left" ? "Option A" : "Option B"}
            </p>
          </div>
        </div>
      );

    case "videos":
      return (
        <div className="w-full h-full flex items-center justify-center p-4 bg-[#c8b78c] bg-opacity-20 rounded">
          <video
            controls
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = "none";
              target.parentElement!.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-white font-peaberry">
                  <p class="text-4xl mb-2">🎬</p>
                  <p>Video not found</p>
                  <p class="text-xs mt-2 opacity-70">Expected: ${contentPath}</p>
                </div>
              `;
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
          <p className="text-white font-peaberry">Unknown content type</p>
        </div>
      );
  }
}

