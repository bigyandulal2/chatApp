// src/components/chat/ChatSidebar/ThreadHeader.jsx
import React from "react";

export default function ThreadHeader({ label, youLabel }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900">
      <div className="text-sm text-gray-300">
        <span className="font-semibold">{label}</span>
      </div>
      <div className="text-xs text-gray-500">{youLabel}</div>
    </div>
  );
}
