import React, { useEffect, useState, useMemo } from "react";
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
  ParticipantsAudio,
} from "@stream-io/video-react-sdk";

export default function Screen() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const isExpanded = useSelector((state) => state.uistate.isExpanded);
  const [remoteMicStates, setRemoteMicStates] = useState({});

  const localUserId = localStorage.getItem("userId");

  const call = useCall();
  const {
    useLocalParticipant,
    useParticipants,
    useMicrophoneState,
    useCameraState,
  } = useCallStateHooks();

  const localParticipant = useLocalParticipant();
  const participants = useParticipants();

  const {
    microphone,
    isMute: micIsMute,       // from SDK
    hasBrowserPermission: micHasPerm,
    status: micStatus,         // maybe status provides “enabled” / “disabled”
  } = useMicrophoneState();

  const {
    camera,
    isEnabled: cameraIsEnabled,
    hasBrowserPermission: camHasPerm,
    status: cameraStatus,
  } = useCameraState();

  const isVideoOn = cameraIsEnabled;

  // Sync local isMicOn based on SDK's micIsMute
  const isMicOn = !micIsMute;

  // Emit mic status using localUserId
  const emitMicStatus = async (micOn) => {
    // Wait until SDK microphone status has changed?
    // Possibly wait for microphone.enable()/disable() to resolve
    if (localUserId) {
      socket.emit("onmike", {
        roomId,
        userId: localUserId,
        micOn,
      });
    }
  };

  const handleMicToggle = async () => {
    if (!call || !microphone) return;

    try {
      if (isMicOn) {
        await microphone.disable();
        // Optionally check microphone.status or micIsMute after disable
        emitMicStatus(false);
      } else {
        await microphone.enable();
        emitMicStatus(true);
      }
    } catch (error) {
      console.error("Failed to toggle microphone:", error);
    }
  };

  const handleVideoToggle = async () => {
    if (!call || !camera) return;

    try {
      if (cameraIsEnabled) {
        await camera.disable();
      } else {
        await camera.enable();
      }
    } catch (error) {
      console.error("Failed to toggle video:", error);
    }
  };

  const handleEndCall = async () => {
    if (!call) return;
    try {
      await call.leave();
      navigate("/room");
    } catch (error) {
      console.error("Failed to leave call:", error);
    }
  };

  // socket listener for remote mic changes
  useEffect(() => {
    const handler = ({ userId, micOn }) => {
      if (userId) {
        setRemoteMicStates((prev) => ({
          ...prev,
          [userId]: micOn,
        }));
      }
    };
    socket.on("userMicStateChanged", handler);
    return () => {
      socket.off("userMicStateChanged", handler);
    };
  }, []);

  // Memoize unique participants by userId
  const uniqueRemoteParticipants = useMemo(() => {
    const seen = new Set();
    return participants.filter((p) => {
      if (!p?.userId) return false;
      if (p.userId === localUserId) return false;
      if (seen.has(p.userId)) return false;
      seen.add(p.userId);
      return true;
    });
  }, [participants, localUserId]);

  // Only remote participants whose mic is ON (according to our state)
  const remoteParticipantsWithMicOn = useMemo(() => {
    return uniqueRemoteParticipants.filter((p) => remoteMicStates[p.userId] === true);
  }, [uniqueRemoteParticipants, remoteMicStates]);

  // Logging for debugging
  useEffect(() => {
    console.log("SDK mic status:", {
      micIsMute,
      micHasPerm,
      micStatus,
      localUserId,
      remoteMicStates,
    });
  }, [micIsMute, micHasPerm, micStatus, remoteMicStates, localUserId]);

  return (
    <div className={`${
      isExpanded ? "col-span-12 md:col-span-10" : "col-span-12 md:col-span-9"
    } bg-gray-900 flex flex-col justify-between md:block relative`}>
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

        {/* Video Section */}
        <div className="w-full px-3 h-[30vh] lg:h-[60vh] grid grid-cols-2 gap-2">
          {isVideoOn && localParticipant ? (
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

          {uniqueRemoteParticipants.map((participant) => (
            <div key={participant.sessionId} className="rounded-lg overflow-hidden">
              <ParticipantView
                participant={participant}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Only play audio for remote participants whose mic is ON */}
        {remoteParticipantsWithMicOn.length > 0 && (
          <ParticipantsAudio participants={remoteParticipantsWithMicOn} />
        )}

      </aside>
    </div>
  );
}
