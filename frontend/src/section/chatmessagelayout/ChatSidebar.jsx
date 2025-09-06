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
 

  // Tabs
  const [selected, setSelected] = useState("chat"); // "chat" | "people" | "setting"
//useEffect her




  // Chat state
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");

   const user=useSelector((state)=>state.login.user);
  //  const [emojiInput, setEmojiInput] = useState("");

  console.log(messages);

  

  // Actions
  const handleSend = () => {
    if (!input.trim()) return;
   
    if(input===messages.text) return; 
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
  useEffect(() => {
    if (!id || !user) return;
  
    console.log("Joining room:", id);
    socket.emit("join-room", { roomId: id, user });
  
    const onUserJoined = (data) => {
      setMessages((prev) => [
        ...prev,
        { id: uuidv4(), sender: "System", text: `${data} joined` }
      ]);
    };
  
    const onReceive = (data) => {
      setMessages((prev) => [
        ...prev,
        { id: uuidv4(), sender: data.user, text: data.text,fileType:data?.fileType,fileData:data?.fileData }
      ]);
    };
  
    socket.on("user-joined", onUserJoined);
    socket.on("received-messages", onReceive);
  
    return () => {
      socket.off("user-joined", onUserJoined);
      socket.off("received-messages", onReceive);
    };
  }, [id, user]);

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
         onSend={(recipient) => {
              if (!input.trim()) return;
          
              if (recipient === "everyone") {
                socket.emit("public-message", {
                  text: input,
                  roomId,
                  sender: user,
                });
              } else {
                socket.emit("private-message", {
                  text: input,
                  to: recipient, // recipient user ID
                  from: user.id,
                  senderName: user.name,
                });
              }
          
              setInput(""); // Clear input
            }}
          
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
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
