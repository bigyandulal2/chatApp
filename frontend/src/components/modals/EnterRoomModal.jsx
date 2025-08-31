import React, { useState, useEffect } from "react";

export default function EnterRoomPasswordModal({
  open,
  roomName,
  onClose,
  onSubmit,
  loading = false,
  error = "",
}) {
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (open) setPassword("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60">
      <div className="w-full md:max-w-md bg-gray-900 text-white rounded-t-2xl md:rounded-2xl shadow-xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Enter password for <span className="text-blue-400">{roomName}</span>
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
        <div className="px-5 py-4 space-y-3">
          <label className="block text-sm text-gray-300">Room password</label>
          <input
            type="password"
            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Enter room password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? (
            <p className="text-red-400 text-sm">{error}</p>
          ) : (
            <p className="text-gray-400 text-xs">
              You must enter the correct password to join this room.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(password)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
            disabled={loading || !password}
          >
            {loading ? "Checking…" : "Join Room"}
           
          </button>
        </div>
      </div>
    </div>
  );
}
