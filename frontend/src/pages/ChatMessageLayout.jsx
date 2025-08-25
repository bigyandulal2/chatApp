import React from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../section/chatmessagelayout/Screen";
import ChatSidebar from "../section/chatmessagelayout/ChatSIdebar";
import "../css/ChatMessageLayout.css";

export default function ChatMessageLayout() {
  const navigate = useNavigate();
  return (
    <div>
      <Screen />
      <ChatSidebar />
      <button onClick={() => navigate("/")} className="btn">
        YapSpace
      </button>
    </div>
  );
}
