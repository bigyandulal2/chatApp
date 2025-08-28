import React, { useState } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Screen() {
  const [isMike, setIsMike] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const isExpanded=useSelector((state)=>state.uistate.isExpanded);

  return (
    <div className={`${isExpanded ?"col-span-12 md:col-span-11":"col-span-12 md:col-span-9"} bg-gray-900 flex flex-col justify-between md:block`}>
      <aside className="pt-2">
        {/* Controls */}
        <div className="flex justify-center bg-gray-900 py-3 px-2 ">
          <div className="flex gap-[10px] bg-black px-3 py-1 rounded-lg">
            {/* Microphone Toggle */}
            <button
              onClick={() => setIsMike(!isMike)}
              className={`rounded-xl p-2 border shadow-lg  ${
                isMike
                  ? "bg-gray-900 border-blue-800 hover:bg-blue-600"
                  : "bg-blue-600 border-blue-800 hover:bg-blue-700"
              }`}
            >
              {isMike ? (
                <FaMicrophone className="text-2xl text-white" />
              ) : (
                <FaMicrophoneSlash className="text-2xl text-white" />
              )}
            </button>

            {/* Video Toggle */}
            <button
              onClick={() => setIsVideo(!isVideo)}
              className={`rounded-xl p-2 border shadow-lg ${
                isVideo
                  ? "bg-gray-900 border-blue-800 hover:bg-blue-600"
                  : "bg-blue-600 border-red-800"
              }`}
            >
              {isVideo ? (
                <FaVideo className="text-xl text-white" />
              ) : (
                <FaVideoSlash className="text-xl text-white" />
              )}
            </button>

            {/* End Call */}
            <button className="bg-gray-900 hover:bg-blue-600 rounded-xl p-2 border border-blue-800 shadow-lg">
              <FaPhone className="text-xl text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full px-3 h-[50vh] lg:h-[60vh]">
          {isVideo ? (
            <video
              className="bg-black h-full w-full  object-cover rounded-lg"
              autoPlay
              muted
              playsInline
            />
          ) : (
            <div className="bg-gray-800 h-full object-cover flex items-center justify-center rounded-lg text-gray-400">
              Video Off
            </div>
          )}
        </div>

        {/* User Tile */}
        <div className="flex-1 flex flex-col items-center justify-center pt-[20px]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-28 h-28 rounded-lg bg-gray-700 flex items-center justify-center text-5xl font-bold text-white">
              AL
            </div>
            <div className="flex items-center gap-2 mt-2 relative w-full">
              <span className="bg-blue-600 text-xs px-2 py-0.5 rounded absolute bottom-2 left-0">
                Owner
              </span>
              {isMike ? (
                <FaMicrophone className="text-white absolute bottom-[10px] right-2" />
              ) : (
                <FaMicrophoneSlash className="text-blue-500 absolute bottom-[10px] right-2" />
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
