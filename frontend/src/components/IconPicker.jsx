// src/components/IconPicker.jsx
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const unicodeEmojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳",
  "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖",
  "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯",
  "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔",
  "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦",
  "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴",
];

export default function IconPicker({ onSelect, onClose }) {
  const pickerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={pickerRef}
      className="absolute bottom-16 right-0 z-50 w-72 h-80 bg-gray-800 text-white p-4 rounded-lg shadow-lg border border-gray-700 overflow-y-scroll grid grid-cols-6 gap-3"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600"
      >
        <IoClose size={22} />
      </button>

      {unicodeEmojis.map((emoji, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(emoji)}
          className=" w-[40px] hover:bg-gray-700 p-2 rounded text-center text-xl"
          type="button"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
