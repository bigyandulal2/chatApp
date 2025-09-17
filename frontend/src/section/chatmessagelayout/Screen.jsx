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

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function Screen() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const isExpanded = useSelector((state) => state.uistate.isExpanded);
  const [dummy, setDummy] = useState(0);
  const [remoteMediaStates, setRemoteMediaStates] = useState({});
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
  const { microphone, isMute: micIsMute } = useMicrophoneState();
  const { camera, isEnabled: cameraIsEnabled } = useCameraState();

  const isMicOn = !micIsMute;
  const isVideoOn = cameraIsEnabled;

  const emitMediaState = debounce((micOn, videoOn) => {
    if (localUserId) {
      socket.emit("updateMediaState", { roomId, userId: localUserId, micOn, videoOn });
    }
  }, 300);

  const handleMicToggle = async () => {
    if (!call || !microphone) return;
    try {
      if (isMicOn) {
        await microphone.disable();
        emitMediaState(false, isVideoOn);
      } else {
        await microphone.enable();
        emitMediaState(true, isVideoOn);
      }
    } catch (error) {
      console.error("Mic toggle failed:", error);
    }
  };

  const handleVideoToggle = async () => {
    if (!call || !camera) return;
    try {
      if (isVideoOn) {
        await camera.disable();
        emitMediaState(isMicOn, false);
      } else {
        await camera.enable();
        emitMediaState(isMicOn, true);
      }
    } catch (error) {
      console.error("Video toggle failed:", error);
    }
  };

  const handleEndCall = async () => {
    if (!call) return;
    try {
      await call.leave();
      navigate("/room");
    } catch (error) {
      console.error("Leave call failed:", error);
    }
  };

  useEffect(() => {
    if (!call) return;
    const updateHandler = () => setDummy((d) => d + 1);
    call.on("participant.updated", updateHandler);
    call.on("participant.joined", updateHandler);
    call.on("participant.left", updateHandler);
    return () => {
      call.off("participant.updated", updateHandler);
      call.off("participant.joined", updateHandler);
      call.off("participant.left", updateHandler);
    };
  }, [call]);

  useEffect(() => {
    const handler = ({ userId, micOn, videoOn }) => {
      setRemoteMediaStates((prev) => ({
        ...prev,
        [userId]: { micOn, videoOn },
      }));
    };

    const initialHandler = (statesArray) => {
      const initialStates = {};
      statesArray.forEach(({ userId, micOn, videoOn }) => {
        initialStates[userId] = { micOn, videoOn };
      });
      setRemoteMediaStates(initialStates);
    };

    socket.on("userMediaStateChanged", handler);
    socket.on("initialUserMediaStates", initialHandler);

    socket.emit("requestInitialStates", { roomId, userId: localUserId });

    return () => {
      socket.off("userMediaStateChanged", handler);
      socket.off("initialUserMediaStates", initialHandler);
    };
  }, [roomId, localUserId]);

  const uniqueRemoteParticipants = useMemo(() => {
    const seen = new Set();
    return participants.filter((p) => {
      if (!p?.userId || p.userId === localUserId || seen.has(p.userId)) return false;
      seen.add(p.userId);
      return true;
    });
  }, [participants, localUserId]);

  const remoteParticipantsWithMicOn = useMemo(() => {
    return uniqueRemoteParticipants.filter((p) => {
      if (p.microphone?.isEnabled !== undefined) return p.microphone.isEnabled;
      return remoteMediaStates[p.userId]?.micOn === true;
    });
  }, [uniqueRemoteParticipants, remoteMediaStates]);

  return (
    <div className={`${isExpanded ? "col-span-12 md:col-span-10" : "col-span-12 md:col-span-9"} bg-gray-900 flex flex-col justify-between md:block relative`}>
      <aside className="pt-2">
        {/* Controls */}
        <div className="flex justify-center bg-gray-900 py-3 px-2">
          <div className="flex gap-[10px] bg-black px-3 py-1 rounded-lg">
            <button onClick={handleMicToggle} className={`rounded-xl p-2 border shadow-lg ${isMicOn ? "bg-gray-900 border-blue-800 hover:bg-blue-600" : "bg-blue-600 border-blue-800 hover:bg-blue-700"}`}>
              {isMicOn ? <FaMicrophone className="text-2xl text-white" /> : <FaMicrophoneSlash className="text-2xl text-white" />}
            </button>
            <button onClick={handleVideoToggle} className={`rounded-xl p-2 border shadow-lg ${isVideoOn ? "bg-gray-900 border-blue-800 hover:bg-blue-600" : "bg-blue-600 border-red-800"}`}>
              {isVideoOn ? <FaVideo className="text-xl text-white" /> : <FaVideoSlash className="text-xl text-white" />}
            </button>
            <button onClick={handleEndCall} className="bg-gray-900 hover:bg-blue-600 rounded-xl p-2 border border-blue-800 shadow-lg">
              <FaPhone className="text-xl text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full px-3 h-[30vh] lg:h-[60vh] grid grid-cols-2 gap-2">
          {isVideoOn && localParticipant ? (
            <div className="rounded-lg overflow-hidden">
              <ParticipantView participant={localParticipant} className="w-full h-full object-cover rounded-lg" />
            </div>
          ) : (
            <div className="bg-gray-800 h-full flex items-center justify-center rounded-lg text-gray-400">Local Video Off</div>
          )}

          {uniqueRemoteParticipants.map((participant) => {
            const isCameraOn = participant.camera?.isEnabled ?? remoteMediaStates[participant.userId]?.videoOn ?? false;
            return (
              <div key={participant.sessionId || participant.userId} className="rounded-lg overflow-hidden">
                {isCameraOn ? (
                  <ParticipantView participant={participant} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="bg-gray-800 h-full flex items-center justify-center rounded-lg text-gray-400">Video Off</div>
                )}
              </div>
            );
          })}
        </div>

        {remoteParticipantsWithMicOn.length > 0 && (
          <ParticipantsAudio participants={remoteParticipantsWithMicOn} />
        )}
      </aside>
    </div>
  );
}