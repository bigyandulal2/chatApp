
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ImagePreviewer from "../../components/ImagePreviewer";
import MessageTranslator from "../../components/MessageTranslator";
export default function MessageList({ messages }) {
  const currentUser = useSelector((state) => state.login.user); // e.g. "nancy"
  const usersInRoom = useSelector((state) => state.chat.usersInRoom);
  const scrollRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages?.length]);

  return (
    <>
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-900 flex flex-col"
      >
        {messages.map((m) => {
          const isSender = m.sender === currentUser;
          const isPrivate = m.type === "private";

          // Resolve recipient name if needed
          const recipientName =
            usersInRoom.find((u) => u.userId === m.to)?.name || "Unknown";

          return (
            <div
              key={m.id}
              className={`mb-3 max-w-[70%] ${
                isSender ? "self-end text-right" : "self-start text-left"
              }`}
            >
              {/* Sender line */}
              <div
                className={`block font-bold text-sm mb-1 ${
                  isSender ? "text-blue-400" : "text-orange-300"
                }`}
              >
                {isPrivate ? (
                  <>
                    <span className={isSender ? "text-blue-400" : "text-orange-300"}>
                      {isSender ? "You" : m.sender}
                    </span>
                    <span className="text-red-500 mx-1">→</span>
                    <span className="text-red-500 font-semibold">
                      {isSender
                        ? recipientName
                        : m.to === currentUserId
                        ? "You"
                        : recipientName}
                    </span>
                    <span className="ml-1">🔒</span>
                  </>
                ) : (
                  m.sender
                )}
              </div>

              {/* Message Text */}
              {/* {m.text && (
                <div
                  className={`inline-block px-3 py-2 rounded-xl bg-gray-800 ${
                    isPrivate ? "text-red-400" : "text-white"
                  }`}
                >
                  {m.text}
                </div> */}
                {m.text && (
  <div className="inline-block bg-gray-800 p-3 rounded-xl text-white">
    <div>{m.text}</div>
    <MessageTranslator text={m.text} />
  </div>
   

              )}

              {/* Image */}
              {m.fileData && m.fileType?.startsWith("image/") && (
                <img
                  src={`data:${m.fileType};base64,${m.fileData}`}
                  onClick={() =>
                    setPreviewImage(`data:${m.fileType};base64,${m.fileData}`)
                  }
                  alt={m.fileName}
                  className="max-w-[100px] rounded-lg shadow-md border border-gray-700 cursor-pointer mt-1"
                />
              )}

              {/* Other Files */}
              {m.fileData && !m.fileType?.startsWith("image/") && (
                <a
                  href={`data:${m.fileType};base64,${m.fileData}`}
                  download={m.fileName}
                  className="text-blue-400 underline mt-1 block"
                >
                  📎 {m.fileName}
                </a>
              )}
            </div>
          );
        })}
      </main>

      {/* Image preview modal */}
      {previewImage && (
        <ImagePreviewer
          imageSrc={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </>
  );
}

