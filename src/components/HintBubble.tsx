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
        // 根据题号显示不同的提示
        if (questionIndex === 0) {
          setHint("💡 提示：仔细比较两侧内容的细节，选择你认为是人类创作的那一侧！");
          setShow(true);
        } else if (questionIndex === 2) {
          setHint("📊 提示：你可以随时返回分类页面选择其他分类，进度会自动保存！");
          setShow(true);
        } else if (questionIndex === 5) {
          setHint("🎯 提示：已经完成一半了！继续加油！");
          setShow(true);
        }
      }
    }
  }, [questionIndex, category]);

  const handleClose = () => {
    // 保存已读标记
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
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-md animate-fade-in">
      <div className="nes-balloon from-left pond-theme">
        <div className="flex items-start gap-2">
          <p className="text-xs sm:text-sm flex-1">{hint}</p>
          <button
            onClick={handleClose}
            className="flex-shrink-0 nes-btn is-small"
            title="关闭提示"
          >
            <i className="nes-icon close is-small"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

