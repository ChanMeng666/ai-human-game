"use client";

import { useState, useEffect } from "react";

interface HintBubbleProps {
  questionIndex: number;
  category: string;
}

const HINT_KEY_PREFIX = "aiHumanGame_hint_";

export default function HintBubble({ questionIndex, category }: HintBubbleProps) {
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState("");

  useEffect(() => {
    // 检查是否应该显示提示
    const hintKey = `${HINT_KEY_PREFIX}${category}_${questionIndex}`;
    
    if (typeof window !== "undefined") {
      const hasSeenHint = localStorage.getItem(hintKey);
      
      if (!hasSeenHint) {
        // Show different hints based on question number
        if (questionIndex === 0) {
          setHint("Tip: Carefully compare the details on both sides and choose the one you think was created by a human!");
          setShow(true);
        } else if (questionIndex === 2) {
          setHint("Tip: You can return to the category page anytime. Your progress is automatically saved!");
          setShow(true);
        } else if (questionIndex === 5) {
          setHint("Tip: You're halfway there! Keep going!");
          setShow(true);
        }
      }
    }
  }, [questionIndex, category]);

  const handleClose = () => {
    // Save read marker
    const hintKey = `${HINT_KEY_PREFIX}${category}_${questionIndex}`;
    if (typeof window !== "undefined") {
      localStorage.setItem(hintKey, "true");
    }
    setShow(false);
  };

  if (!show || !hint) {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-md animate-slide-in-down">
      <div className="nes-balloon from-left shadow-xl border-4 border-[#c846ab]" style={{ backgroundColor: '#ffffff', opacity: 1 }}>
        <div className="flex items-start gap-2 p-3 rounded" style={{ backgroundColor: '#ffffff', opacity: 1 }}>
          <i className="nes-icon exclamation is-small flex-shrink-0"></i>
          <p className="text-xs sm:text-sm flex-1">{hint}</p>
          <button
            onClick={handleClose}
            className="flex-shrink-0 nes-btn is-small"
            title="Close hint"
          >
            <i className="nes-icon close is-small"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

