// src/components/chat/ChatSidebar/Composer.jsx
import React from "react";
import { HiOutlinePlus, HiOutlineEmojiHappy } from "react-icons/hi";
import { FaMicrophone, FaPaperPlane, FaPause, FaTrash } from "react-icons/fa";

export default function Composer({
  input,
  setInput,
  isRecording,
  setIsRecording,
  isPaused,
  setIsPaused,
  onSend,
}) {

  return (
    <footer className="bg-gray-900 p-3 flex items-center justify-center border-t border-gray-800">
      <div className="w-full max-w-2xl">
        {!isRecording ? (
          <div className="flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
            <button className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2">
              <HiOutlinePlus size={20} />
            </button>
            <button className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2">
              <HiOutlineEmojiHappy size={20} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Type a message"
              className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
            />
            {input ? (
              <button onClick={onSend} className="ml-2 bg-green-600 hover:bg-green-700 rounded-full p-2">
                <FaPaperPlane />
              </button>
            ) : (
              <button
                onClick={() => setIsRecording(true)}
                className="ml-2 text-gray-200 hover:bg-gray-700 rounded-full p-2"
              >
                <FaMicrophone />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
            <button onClick={() => setIsPaused(!isPaused)} className="text-gray-200">
              <FaPause />
            </button>
            <span className="text-gray-200 font-mono">Recording…</span>
            <button onClick={() => setIsRecording(false)} className="text-gray-200">
              <FaTrash />
            </button>
            <button onClick={() => setIsRecording(false)} className="text-green-500">
              <FaPaperPlane />
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
