import React, { useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhone,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../../utils/Socket";
import {
  useCall,
  useCallStateHooks,
  ParticipantView,
} from "@stream-io/video-react-sdk";

export default function Screen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isExpanded = useSelector((state) => state.uistate.isExpanded);
  const myId = localStorage.getItem("userId");

  const call = useCall();
  const { useLocalParticipant, useParticipants } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const participants = useParticipants();

  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  // Toggle microphone
  const handleMicToggle = async () => {
    if (!call) return;
  
    try {
      if (isMicOn) {
        await call.microphone.disable();
        socket.emit("onmike", { roomId: id, text: "mic off" });
      } else {
        await call.microphone.enable(); // ⚠️ This will ask permission if not already granted
        socket.emit("onmike", { roomId: id, text: "mic on" });
      }
      setIsMicOn((prev) => !prev);
    } catch (error) {
      console.error("Failed to toggle microphone:", error);
    }
  };
  // Toggle camera
  const handleVideoToggle = async () => {
    if (!call) return;
  
    try {
      if (isVideoOn) {
        await call.camera.disable();
      } else {
        await call.camera.enable(); // ⚠️ This will ask for camera permission
      }
      setIsVideoOn((prev) => !prev);
    } catch (error) {
      console.error("Failed to toggle camera:", error);
    }
  };
  
  // Leave the call
  const handleEndCall = async () => {
    if (!call) return;

    try {
      await call.leave();
      navigate("/room"); // Redirect to room/home
    } catch (error) {
      console.error("Failed to leave the call:", error);
    }
  };

  return (
    <div
      className={`${
        isExpanded ? "col-span-12 md:col-span-11" : "col-span-12 md:col-span-9"
      } bg-gray-900 flex flex-col justify-between md:block relative`}
    >
      <aside className="pt-2">
        {/* Controls */}
        <div className="flex justify-center bg-gray-900 py-3 px-2">
          <div className="flex gap-[10px] bg-black px-3 py-1 rounded-lg">
            {/* Mic */}
            <button
              onClick={handleMicToggle}
              className={`rounded-xl p-2 border shadow-lg ${
                isMicOn
                  ? "bg-gray-900 border-blue-800 hover:bg-blue-600"
                  : "bg-blue-600 border-blue-800 hover:bg-blue-700"
              }`}
            >
              {isMicOn ? (
                <FaMicrophone className="text-2xl text-white" />
              ) : (
                <FaMicrophoneSlash className="text-2xl text-white" />
              )}
            </button>

            {/* Video */}
            <button
              onClick={handleVideoToggle}
              className={`rounded-xl p-2 border shadow-lg ${
                isVideoOn
                  ? "bg-gray-900 border-blue-800 hover:bg-blue-600"
                  : "bg-blue-600 border-red-800"
              }`}
            >
              {isVideoOn ? (
                <FaVideo className="text-xl text-white" />
              ) : (
                <FaVideoSlash className="text-xl text-white" />
              )}
            </button>

            {/* End Call */}
            <button
              onClick={handleEndCall}
              className="bg-gray-900 hover:bg-blue-600 rounded-xl p-2 border border-blue-800 shadow-lg"
            >
              <FaPhone className="text-xl text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Video Section (local + remote participants) */}
        <div className="w-full px-3 h-[30vh] lg:h-[60vh] grid grid-cols-2 gap-2">
          {/* Local participant */}
          {localParticipant ? (
            <div className="rounded-lg overflow-hidden">
              <ParticipantView
                participant={localParticipant}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="bg-gray-800 h-full flex items-center justify-center rounded-lg text-gray-400">
              Local Video Off
            </div>
          )}

          {/* Remote participants (filter out local participant) */}
          {participants
            .filter((participant) => participant.id !== localParticipant?.id)
            .map((participant) => (
              <div key={participant.id} className="rounded-lg overflow-hidden">
                <ParticipantView
                  participant={participant}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
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
              {isMicOn ? (
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
