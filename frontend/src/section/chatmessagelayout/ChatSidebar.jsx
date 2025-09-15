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
  // console.log("id here",id);
  const isExpanded = useSelector((state) => state.uistate.isExpanded);
  const userId=useSelector((state)=>state.login.userId);
  const usersInRoom=useSelector((state)=>state.chat.usersInRoom);
 
  const dispatch = useDispatch();
 

  // Tabs
  const [selected, setSelected] = useState("chat"); // "chat" | "people" | "setting"
//recipient
const recipient=useSelector((state)=>state.chat.recipient);
// console.log("recipient, chatsidebarrr",recipient);



  // Chat state
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");

   const user=useSelector((state)=>state.login.user);
  //  const [emojiInput, setEmojiInput] = useState("");

  // console.log(messages);

  

  // Actions
  const handleSend = () => {
    if (!input.trim()) return;
    if(recipient==="everyone"){
        socket.emit("send-messages",{roomId:id,user,text:input});
    }
    else{
      console.log("userrrrrrrrrrrrrrsroom",usersInRoom);
      const targetUser = usersInRoom.find(u => u.name === recipient);
      console.log("target userrrrrrrrrrrrrrrrrrrrrrrr",targetUser);
      // console.log(targetUser);
      console.log("hllo from the private-message hereeeeeeeeeeeeeeeeeeee");
     socket.emit("private-message",{
      roomId:id,
      from: user,//username
      to: targetUser.userId,  // 👈 this is a userId (e.g. "user123")
      text: input,
     })
    }

    
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
  
    // console.log("Joining room:", id);
    socket.emit("join-room", { roomId: id, user,userId });
  
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
    const onPrivate=(data)=>{
      console.log("i have been calledddddddddddddddddd");
       console.log("from private mssage ",data);
       setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          sender: data.sender,
          text: data.message || `[File] ${data.fileName}`,
          fileType: data.fileType,
          fileData: data.fileData,
          type: data.type,
          timestamp: data.timestamp,
          to:data.to
        },
      ]);

    }
  
    socket.on("user-joined", onUserJoined);
    socket.on("received-messages", onReceive);
    socket.on("new-private-message",onPrivate)
  
    return () => {
      socket.off("user-joined", onUserJoined);
      socket.off("received-messages", onReceive);
      socket.off("new-private-message",onPrivate);
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
        isExpanded ? "col-span-12 md:col-span-2" : "col-span-12 md:col-span-3"
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
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
