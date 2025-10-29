"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="nes-container is-dark text-center">
        <div className="flex flex-col items-center gap-4">
          {/* Loading Icon */}
          <div className="animate-bounce flex justify-center">
            <i className="nes-icon snes is-large"></i>
          </div>
          
          {/* Loading Text */}
          <div className="text-white text-sm sm:text-base animate-pulse">
            Loading...
          </div>
          
          {/* Progress Bar */}
          <progress className="nes-progress is-primary" value="50" max="100"></progress>
        </div>
      </div>
    </div>
  );
}

