import React from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../section/chatmessagelayout/ChatSidebar";
import ChatSidebar from "../section/chatmessagelayout/Screen";
import "../css/ChatMessageLayout.css";

export default function ChatMessageLayout() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12 h-[100vh] w-full relative">
      <ChatSidebar/>
      <Screen />
   
    </div>
  );
}
