import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {socket} from "../../utils/Socket"
import { toggle } from "../../redux/feature/RoomActionSlicer";
import DesktopSidebar from "./DesktopSidebar";
import MobileSheet from "./MobileSheet";
import {useParams} from "react-router-dom"
import {v4 as uuidv4} from "uuid"
const DEFAULT_MESSAGES = [
  // { id: 1, sender: "User1", text: "Hello everyone!" },
  // { id: 2, sender: "You", text: "Hi! 👋" },
];

export default function ChatSidebar() {
  const {id}=useParams();
  console.log("id here",id);
  const isExpanded = useSelector((state) => state.uistate.isExpanded);
  const dispatch = useDispatch();
  useEffect(()=>{

  },[])

  // Tabs
  const [selected, setSelected] = useState("chat"); // "chat" | "people" | "setting"

  // Chat state
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const user=localStorage.getItem("user");
  console.log(messages);
  // Socket (example listeners)
  useEffect(() => {
    console.log("i have been called here mannnnn");
    const onUserJoined = (data) => {
      console.log("hello here userJoined",data);
      setMessages(prev => [
        ...prev,
        { id: uuidv4(), sender: "System", text: `${data} joined` }
      ]);
    };
  
    const onReceive = (data) => {
      console.log("received message has been called",data);
      setMessages(prev => [
        ...prev,
        { id: uuidv4(), sender: data.user, text: data.text }
      ]);
    };
   socket.emit("join-room",{roomId:id,user:user});
    socket.on("user-joined", onUserJoined);
    socket.on("received-messages", onReceive);
  
    return () => {
      socket.off("user-joined", onUserJoined);
      socket.off("received-messages", onReceive); // ✅ fixed!
    };
  }, []);
  

  // Actions
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), sender: "you", text: input }]);
     socket.emit("send-messages",{roomId:id,user,text:input});
    setInput("");
  };

  const handleChat = () => {
    dispatch(toggle());
    setSelected("chat");
  };
  const handlePeople = () => {
    if (isExpanded) dispatch(toggle());
    setSelected("people");
  };
  const handleSetting = () => {
    if (isExpanded) dispatch(toggle());
    setSelected("setting");
  };

  // Responsive
  const [isMobile, setIsMobile] = useState(false);
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const onResize = () => {
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sheetHeights = useMemo(() => {
    const sheetH = Math.round(vh * 0.85);
    const headerH = 56;
    const collapsedY = sheetH - headerH;
    const midY = Math.round(sheetH * 0.45);
    const expandedY = 0;
    return { sheetH, headerH, collapsedY, midY, expandedY };
  }, [vh]);

  return (
    <div
      className={`${
        isExpanded ? "col-span-12 md:col-span-1" : "col-span-12 md:col-span-3"
      } bg-gray-900 md:h-auto flex text-white`}
    >
      {/* Desktop / Tablet */}
      <div className="hidden md:block w-full">
        <DesktopSidebar
          isExpanded={isExpanded}
          selected={selected}
          onChat={handleChat}
          onPeople={handlePeople}
          onSetting={handleSetting}
          messages={messages}
          input={input}
          setInput={setInput}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          onSend={handleSend}
        />
      </div>

      {/* Mobile */}
      <div className="block md:hidden w-full">
        <MobileSheet
          selected={selected}
          setSelected={setSelected}
          sheetHeights={sheetHeights}
          messages={messages}
          input={input}
          setInput={setInput}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
