"use client";

interface ExitConfirmDialogProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitConfirmDialog({
  show,
  onConfirm,
  onCancel,
}: ExitConfirmDialogProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 animate-fade-in">
      <div className="nes-dialog is-rounded is-dark max-w-md w-full">
        <div className="p-4 sm:p-6">
          {/* Icon */}
          <div className="text-center mb-4">
            <div className="text-4xl sm:text-5xl mb-3">⚠️</div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
              确定要退出吗？
            </h2>
            <p className="text-xs sm:text-sm text-white opacity-80">
              你的进度已自动保存，下次可以继续游戏
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCancel}
              className="nes-btn is-primary flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <i className="nes-icon heart is-small"></i>
              <span>继续游戏</span>
            </button>
            <button
              onClick={onConfirm}
              className="nes-btn is-error flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <i className="nes-icon close is-small"></i>
              <span>确定退出</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

