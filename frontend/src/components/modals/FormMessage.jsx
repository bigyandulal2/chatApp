// src/components/modals/FormMessage.jsx
import React, { useEffect, useState } from "react";

/**
 * Tailwind toast with auto-hide.
 * type: "success" | "error"
 */
export default function FormMessage({
  type = "error",
  message = "",
  autoHideMs = 3000,
  onClose,
  className = "",
}) {
  const [visible, setVisible] = useState(Boolean(message));
  const isSuccess = type === "success";

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, autoHideMs);
    return () => clearTimeout(t);
  }, [message, type, autoHideMs, onClose]);

  if (!message || !visible) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`px-4 py-2 rounded-lg border shadow
          ${isSuccess
            ? "bg-green-900/40 border-green-600 text-green-300"
            : "bg-red-900/40 border-red-600 text-red-300"}`}
      >
        {message}
      </div>
    </div>
  );
}
