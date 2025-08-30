
import React from "react";
import Screen from "../section/chatmessagelayout/Screen";
import ChatSidebar from "../section/chatmessagelayout/ChatSidebar";

export default function ChatMessageLayout() {
  return (
    <div className="grid grid-cols-12 gap-0 bg-gray-900 min-h-screen">
      {/* Main video/screen area */}
      <Screen />

      {/* Chat / People / Settings */}
      <ChatSidebar />
    </div>
  );
}
