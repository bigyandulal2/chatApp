import React, { useEffect } from "react";

export default function RoomExistsModal({
  open,
  onClose,
  message = "Room already created. Cannot create rooms.",
  autoHideMs = 3000,
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), autoHideMs);
    return () => clearTimeout(t);
  }, [open, autoHideMs, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-[90%] max-w-md rounded-xl border border-red-600 bg-gray-900 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-red-600/50">
          <h3 className="text-base font-semibold text-red-400">
            Cannot Create Room
          </h3>
          <button
            onClick={onClose}
            className="px-2 py-1 rounded hover:bg-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
          <p className="text-sm text-red-300">{message}</p>
        </div>

        {/* Footer (optional, we keep it empty to auto-hide) */}
        <div className="px-4 py-3 border-t border-red-600/50 text-right">
          <span className="text-xs text-gray-400">
            This will close automatically…
          </span>
        </div>
      </div>
    </div>
  );
}
