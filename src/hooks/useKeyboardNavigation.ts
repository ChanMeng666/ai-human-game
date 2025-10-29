import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseKeyboardNavigationProps {
  onLeft?: () => void;
  onRight?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onSpace?: () => void;
  onNumber?: (num: number) => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  onLeft,
  onRight,
  onEnter,
  onEscape,
  onSpace,
  onNumber,
  enabled = true,
}: UseKeyboardNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // 忽略在输入框中的按键
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          onLeft?.();
          break;
        case "ArrowRight":
          event.preventDefault();
          onRight?.();
          break;
        case "Enter":
          event.preventDefault();
          onEnter?.();
          break;
        case "Escape":
          event.preventDefault();
          onEscape?.();
          break;
        case " ":
          event.preventDefault();
          onSpace?.();
          break;
        case "1":
        case "2":
        case "3":
        case "4":
          event.preventDefault();
          onNumber?.(parseInt(event.key));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onLeft, onRight, onEnter, onEscape, onSpace, onNumber, enabled]);
}

