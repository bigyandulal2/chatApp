import React from "react";
import {
  FaMicrophone,
  FaVideo,
  FaPhone,
} from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Screen() {
  const isExpanded = useSelector((state) => state.uistate.isExpanded);
  return (
    <div className={`${isExpanded ? "col-span-12 md:col-span-10" : "col-span-12 md:col-span-9"} bg-gray-900 flex flex-col justify-between md:block relative`}>
      <aside className="pt-2">
        {/* Static Call Controls */}
        <div className="flex justify-center bg-gray-900 py-3 px-2">
          <div className="flex gap-[10px] bg-black px-3 py-1 rounded-lg">
            <button className="rounded-xl p-2 border shadow-lg bg-gray-900 border-blue-800 hover:bg-blue-600">
              <FaMicrophone className="text-2xl text-white" />
            </button>
            <button className="rounded-xl p-2 border shadow-lg bg-gray-900 border-blue-800 hover:bg-blue-600">
              <FaVideo className="text-xl text-white" />
            </button>
            <button className="rounded-xl p-2 border shadow-lg bg-gray-900 border-blue-800 hover:bg-blue-600">
              <FaPhone className="text-xl text-red-500" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
