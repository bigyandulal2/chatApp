import React from "react";
import Sidebar from "./sidebar/Sidebar";
import ChatSection from "./chatarea/ChatSection";
import { Outlet } from "react-router-dom";
import { useProfile } from "../../../hooks/useProfile";
export default function ChatAppLayout() {
  const { user, loading, error } = useProfile();
  console.log("user detail", user);
  return (
    <div className=" h-screen  flex flex-col md:flex-row ">
      <Sidebar user={user} />
      <ChatSection />
    </div>
  );
}
