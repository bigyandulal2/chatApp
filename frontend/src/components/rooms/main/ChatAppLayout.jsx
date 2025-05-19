import React from "react";
import Sidebar from "./sidebar/Sidebar";
import ChatSection from "./chatarea/ChatSection";
import { Outlet } from "react-router-dom";
export default function ChatAppLayout() {
  return (
    <div className=" h-screen  flex flex-col md:flex-row ">
      <Sidebar />
      <ChatSection />
    </div>
  );
}
