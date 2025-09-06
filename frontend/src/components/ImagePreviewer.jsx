// src/components/ImagePreviewer.jsx
import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

export default function ImagePreviewer({ imageSrc, onClose }) {
  const modalRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50  bg-opacity-80 flex items-center justify-center">
      <div ref={modalRef} className="relative">
        {/* Close Icon */}
        <button
          className="absolute top-[-10px] right-[-10px] bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Image */}
        <img
          src={imageSrc}
          alt="Preview"
          className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
