import React from "react";
import Sidebar from "../section/chatapplayout/Sidebar";
import { useProfile } from "../hooks/useProfile";
import ChatMessage from "../section/chatapplayout/ChatMessage";
export default function ChatAppLayout() {
  const { user, loading, error } = useProfile();
  console.log("user detail", user);
  return (
    <div className=" h-screen  flex flex-col md:flex-row ">
      <Sidebar user={user} />
      <ChatMessage />
    </div>
  );
}
