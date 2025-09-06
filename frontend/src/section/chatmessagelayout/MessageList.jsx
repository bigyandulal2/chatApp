
import React, { useEffect, useRef,useState } from "react";
import { useSelector } from "react-redux";
import ImagePreviewer from "../../components/ImagePreviewer";
export default function MessageList({ messages }) {
  const user=useSelector((state)=>state.login.user);
  const scrollRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
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
      {messages.map((m) => (

        <div
          key={m.id} // Use unique id as key!
          className={`mb-3 max-w-[70%] ${
            m.sender === `${user}` ? "self-end text-right" : "self-start text-left"
          }`}
        >
          {/* Sender */}
          <span
            className={`block font-bold text-sm mb-1 ${
              m.sender === `${user}` ? "text-blue-400" : "text-orange-300"
            }`}
          >
            {m.sender}
          </span>

          {/* Text */}
          {m.text && (
            <div className="inline-block px-3 py-2 rounded-xl bg-gray-800 text-white">
              {m.text}
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
              className="max-w-[100px] rounded-lg shadow-md border border-gray-700"
            />
          )}

          {/* Other File */}
          {m.fileData && !m.fileType?.startsWith("image/") && (
            <a
              href={`data:${m.fileType};base64,${m.fileData}`}
              download={m.fileName}
              className="text-blue-400 underline"
            >
              📎 {m.fileName}
            </a>
          )}
        </div>
      ))}
    </main>
        {previewImage && (
          <ImagePreviewer imageSrc={previewImage} onClose={() => setPreviewImage(null)} />
        )}
        </>
  );
}
