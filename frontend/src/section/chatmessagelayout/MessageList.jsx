// src/components/chat/ChatSidebar/MessageList.jsx
import React, { useEffect, useRef } from "react";

export default function MessageList({ messages }) {
  const scrollRef = useRef(null);
  console.log("from the messsagelist",messages);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages?.length]);

  return (
    <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-gray-900 flex flex-col">
      {messages.map((m) => (
        <div key={m.id} className={`mb-2 ${m.sender === "you" ? "text-right" : "text-left"}`}>
          <span className={`font-bold text-sm ${m.sender==="you"?"text-blue-600":"text-orange-300"}`}>{m.sender}: </span>
          {m.text}
        </div>
      ))}
    </main>
  );
}
