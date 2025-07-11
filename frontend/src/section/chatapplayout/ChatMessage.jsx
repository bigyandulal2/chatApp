import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreateRoomModal from "../../components/modals/CreateRoomModal";
import JoinRoomModal from "../../components/modals/JoinRoomModal";
import { IoCall, IoVideocam } from "react-icons/io5";
export default function ChatMessage() {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const chatAreaRef = useRef(null);
  const timerRef = useRef(null);
  const createRoom = useSelector((state) => state.room.createRoom);
  const joinRoom = useSelector((state) => state.room.joinRoom);

  useEffect(() => {
    if (recording && !paused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [recording, paused]);

  const handleMicClick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setAudioChunks([]);

    recorder.ondataavailable = (e) =>
      setAudioChunks((prev) => [...prev, e.data]);
    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
    setPaused(false);
    setRecordingTime(0);
  };

  const handleSendClick = () => {
    if (!message.trim()) return;
    const div = document.createElement("div");
    div.className = "mb-2 text-right";
    div.innerHTML = `<span class='font-bold'>You:</span> ${message}`;
    chatAreaRef.current.appendChild(div);
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    setMessage("");
  };

  const handlePauseClick = () => {
    if (!mediaRecorder) return;
    if (mediaRecorder.state === "recording") {
      mediaRecorder.pause();
      setPaused(true);
    } else {
      mediaRecorder.resume();
      setPaused(false);
    }
  };

  const handleDeleteRecording = () => {
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    setRecording(false);
    setRecordingTime(0);
    setMediaRecorder(null);
    setAudioChunks([]);
  };

  const handleSendRecording = () => {
    if (!mediaRecorder) return;
    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      const div = document.createElement("div");
      div.className = "mb-2 text-right";
      div.innerHTML = `<span class='font-bold'>You:</span> <audio controls src='${url}' class='inline-block'></audio>`;
      chatAreaRef.current.appendChild(div);
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      setAudioChunks([]);
      setMediaRecorder(null);
      setRecording(false);
      setRecordingTime(0);
    };
    mediaRecorder.stop();
  };

  return (
    <div className="h-full flex flex-col flex-1">
      {createRoom && <CreateRoomModal />}
      {joinRoom && <JoinRoomModal />}
      {/* Header */}
      <header className="bg-gray-800 text-white flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Room: General</h1>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded hover:bg-gray-700"
            title="Start Video Call"
          >
            <IoVideocam />
          </button>
          <button
            className="p-2 rounded hover:bg-gray-700"
            title="Start Audio Call"
          >
            <IoCall />
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 cursor-pointer px-4 py-2 rounded flex items-center justify-center"
            title="Leave Room"
          >
            <span className="hidden sm:inline">Leave Room</span>
          </button>
        </div>
      </header>

      {/* Chat area */}
      <main
        ref={chatAreaRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-100 flex flex-col justify-end"
      >
        <div className="mb-2">
          <span className="font-bold">User1:</span> Hello everyone!
        </div>
        <div className="mb-2 text-right">
          <span className="font-bold">You:</span> Hi! 👋
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#222] p-4 flex items-center justify-center">
        {!recording ? (
          <div className="relative flex-1 max-w-2xl w-full">
            <div className="flex items-center justify-between bg-[#222] border border-gray-700 rounded-full px-3 py-2 w-full">
              <button
                onClick={() => setShowActionMenu(!showActionMenu)}
                className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              <button className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2">
                {/* Emoji Icon */}
                😊
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 min-w-0 bg-transparent border-none text-gray-100 placeholder-gray-400 focus:outline-none"
              />
              {!message.trim() ? (
                <button
                  onClick={handleMicClick}
                  className="ml-2 text-gray-200 hover:bg-gray-700 rounded-full p-2"
                >
                  🎙️
                </button>
              ) : (
                <button
                  onClick={handleSendClick}
                  className="ml-2 bg-green-600 hover:bg-green-700 rounded-full p-2"
                >
                  ➤
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-[#222] border border-gray-700 rounded-full px-3 py-2 flex items-center justify-center w-full mt-2">
            <button
              onClick={handlePauseClick}
              className="text-gray-200 hover:bg-gray-700 rounded-full p-2"
            >
              {paused ? "▶️" : "⏸️"}
            </button>
            <span className="text-gray-200 font-mono mx-4">
              {`${Math.floor(recordingTime / 60)}:${(recordingTime % 60)
                .toString()
                .padStart(2, "0")}`}
            </span>
            <button
              onClick={handleDeleteRecording}
              className="text-gray-200 hover:bg-gray-700 rounded-full p-2"
            >
              🗑️
            </button>
            <button
              onClick={handleSendRecording}
              className="text-green-600 hover:bg-green-700 rounded-full p-2"
            >
              📤
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}
