// src/components/chat/ChatSidebar/Tabs.jsx
import React from "react";
import { IoChatboxEllipses, IoPeople, IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {toggle} from "../../redux/feature/ui/UIStateSlicer"
export default function Tabs({ selected, onPeople,onChat, onSetting, compact = false }) {
  const size = compact ? 20 : 24;
  const active = "border-b-2 border-blue-400 text-blue-600";
  const inactive = "text-gray-400";
  const dispatch=useDispatch();
 
  return (
    <div className="flex items-center border-b border-gray-700 bg-gray-800 text-sm md:text-base justify-evenly w-full">
      <button
        className={`flex-1 py-3 hover:text-blue-400 ${selected === "chat" ? active : inactive} font-semibold flex justify-center`}
        onClick={()=>{dispatch(toggle())
          onChat()
        }}
        title="Chat"
      >
        <IoChatboxEllipses size={size}  />
      </button>
      <button
        className={`flex-1 py-3 hover:text-blue-400 ${selected === "people" ? active : inactive} flex justify-center`}
        onClick={onPeople}
        title="People"
      >
        <IoPeople size={size} />
      </button>
      <button
        className={`flex-1 py-3 hover:text-blue-400 ${selected === "setting" ? active : inactive} flex justify-center`}
        onClick={onSetting}
        title="Settings"
      >
        <IoSettingsOutline size={size} />
      </button>
    </div>
  );
}
