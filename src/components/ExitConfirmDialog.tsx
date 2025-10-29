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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 animate-fade-in backdrop-blur-sm">
      <div className="nes-dialog is-rounded is-dark max-w-md w-full shadow-2xl" style={{ backgroundColor: '#1f1e44', opacity: 1 }}>
        <div className="p-4 sm:p-6" style={{ backgroundColor: '#1f1e44', opacity: 1 }}>
          {/* Icon */}
          <div className="text-center mb-4">
            <div className="mb-3 flex justify-center">
              <i className="nes-icon exclamation-triangle is-large"></i>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
              Are you sure you want to exit?
            </h2>
            <p className="text-xs sm:text-sm text-white opacity-80">
              Your progress has been automatically saved. You can continue later.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCancel}
              className="nes-btn is-primary flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <i className="nes-icon heart is-small"></i>
              <span>Continue</span>
            </button>
            <button
              onClick={onConfirm}
              className="nes-btn is-error flex-1 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <i className="nes-icon close is-small"></i>
              <span>Exit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

