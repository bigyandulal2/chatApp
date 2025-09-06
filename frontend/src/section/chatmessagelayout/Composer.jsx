// // src/components/chat/ChatSidebar/Composer.jsx
// import React from "react";
// import { HiOutlinePlus, HiOutlineEmojiHappy } from "react-icons/hi";
// import { FaMicrophone, FaPaperPlane, FaPause, FaTrash } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import {useParams} from "react-router-dom"
// import { sendFile } from "../../utils/sendFile";
// export default function Composer({
//   input,
//   setInput,
//   isRecording,
//   setIsRecording,
//   isPaused,
//   setIsPaused,
//   onSend,
// }) {
// const user=useSelector((state)=>state.login.user);
// const {id}=useParams();
  
//   return (
//     <footer className="bg-gray-900 p-3 flex items-center justify-center border-t border-gray-800">
//       <div className="w-full max-w-2xl">
//         {!isRecording ? (
//           <div className="flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
//           <input
//   type="file"
//   className="hidden"
//   id="fileInput"
//   onChange={(e) => {
//     if (e.target.files.length > 0) {
//       sendFile(id, user, e.target.files[0]);
//     }
//   }}
// />

// <label htmlFor="fileInput" className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2 cursor-pointer">
//   <HiOutlinePlus size={20} />
// </label>

//                  <button className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2">
//               <HiOutlineEmojiHappy size={20} />
//             </button>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && onSend()}
//               placeholder="Type a message"
//               className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
//             />
//             {input ? (
//               <button onClick={onSend} className="ml-2 bg-green-600 hover:bg-green-700 rounded-full p-2">
//                 <FaPaperPlane />
//               </button>
//             ) : (
//               <button
//                 onClick={() => setIsRecording(true)}
//                 className="ml-2 text-gray-200 hover:bg-gray-700 rounded-full p-2"
//               >
//                 <FaMicrophone />
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
//             <button onClick={() => setIsPaused(!isPaused)} className="text-gray-200">
//               <FaPause />
//             </button>
//             <span className="text-gray-200 font-mono">Recording…</span>
//             <button onClick={() => setIsRecording(false)} className="text-gray-200">
//               <FaTrash />
//             </button>
//             <button onClick={() => setIsRecording(false)} className="text-green-500">
//               <FaPaperPlane />
//             </button>
//           </div>
//         )}
//       </div>
//     </footer>
//   );
// }
import React, { useRef } from "react";
import { HiOutlinePlus, HiOutlineEmojiHappy } from "react-icons/hi";
import { FaMicrophone, FaPaperPlane, FaPause, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendFile } from "../../utils/sendFile";

export default function Composer({
  input,
  setInput,
  isRecording,
  setIsRecording,
  isPaused,
  setIsPaused,
  onSend,
  onSendRecording, // new prop to handle sending recorded audio
}) {
  const user = useSelector((state) => state.login.user);
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      sendFile(id, user, e.target.files[0]);
      e.target.value = ""; // Reset input so same file can be sent again
    }
  };

  const handleSendRecordingClick = () => {
    if (onSendRecording) {
      onSendRecording();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  return (
    <footer className="bg-gray-900 p-3 flex items-center justify-center border-t border-gray-800">
      <div className="w-full max-w-2xl">
        {!isRecording ? (
          <div className="flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
            <input
              type="file"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <label
              htmlFor="fileInput"
              className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2 cursor-pointer"
            >
              <HiOutlinePlus size={20} />
            </label>

            <button
              type="button"
              className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2"
              aria-label="Emoji picker (not implemented)"
            >
              <HiOutlineEmojiHappy size={20} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Type a message"
              className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
              spellCheck={false}
            />
            {input.trim() ? (
              <button
                type="button"
                onClick={onSend}
                className="ml-2 bg-green-600 hover:bg-green-700 rounded-full p-2"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsRecording(true)}
                className="ml-2 text-gray-200 hover:bg-gray-700 rounded-full p-2"
                aria-label="Start recording"
              >
                <FaMicrophone />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="text-gray-200"
              aria-label={isPaused ? "Resume recording" : "Pause recording"}
            >
              <FaPause />
            </button>
            <span className="text-gray-200 font-mono">Recording…</span>
            <button
              type="button"
              onClick={() => {
                setIsRecording(false);
                setIsPaused(false);
              }}
              className="text-gray-200"
              aria-label="Discard recording"
            >
              <FaTrash />
            </button>
            <button
              type="button"
              onClick={handleSendRecordingClick}
              className="text-green-500"
              aria-label="Send recording"
            >
              <FaPaperPlane />
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}

