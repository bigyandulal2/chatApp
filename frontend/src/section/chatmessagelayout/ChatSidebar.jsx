import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaVideo, FaPhone, FaPause, FaTrash, FaPaperPlane } from "react-icons/fa";
import { HiOutlinePlus, HiOutlineEmojiHappy } from "react-icons/hi";
import { IoChatboxEllipses,IoPeople,IoSettingsOutline } from "react-icons/io5";
import {useSelector,useDispatch} from "react-redux";
import { toggle } from "../../redux/feature/ui/UIStateSlicer";

export default function ChatRoom() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "User1", text: "Hello everyone!" },
    { id: 2, sender: "You", text: "Hi! 👋" },
  ]);
  const [input, setInput] = useState("");
  // const [isExpanded, setIsExpanded] = useState(true); 
  const dispatch=useDispatch();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const chatEndRef = useRef(null);
  const isExpanded=useSelector((state)=>state.uistate.isExpanded);
  const [selected,setSelected]=useState("chat");
  
 
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "You", text: input }]);
    setInput("");
  };
  function handleChat(){
     dispatch(toggle())
     setSelected("chat")
  }
  function handlePeople(){
        if(isExpanded){
           dispatch(toggle())
        }
        setSelected("people")
  }
  function handleSetting(){
     if(isExpanded){
       dispatch(toggle)
     }
     setSelected("setting")

  }
  return (
    <div className={` ${isExpanded ? " col-span-12 md:col-span-1":"col-span-12 md:col-span-3"}  bg-gray-900 md:h-auto flex  text-white`}>
      <section className="flex-1 flex flex-col h-auto md:h-screen">
        {/* Tabs */}
        <div className={`flex ${isExpanded && "md:flex-col h-full items-center justify-center "}  items-center border-b border-gray-700 bg-gray-800 text-sm md:text-base justify-evenly w-full`} id="chatsidebar-header">
          <button className={` ${isExpanded && "items-center"}flex-1 py-3  hover:text-blue-400  ${selected==="chat" ? "border-b-2 border-blue-400 text-blue-600":"text-gray-400"} font-semibold flex`} onClick={handleChat}><IoChatboxEllipses size={30} id="chatsidebar-chat"/></button>
          <button className={`${isExpanded && "items-center"}flex-1 py-3  hover:text-blue-400 ${selected==="people" ? "border-b-2 border-blue-400 text-blue-600":"text-gray-400"} flex justify-center text-[20px]`} onClick={handlePeople}><IoPeople size={30} id="chatsidebar-people"/></button>
          <button className={`${isExpanded && "items-center"}flex-1 py-3  hover:text-blue-400 ${selected==="setting" ? "border-b-2 border-blue-400 text-blue-600":"text-gray-400"} flex justify-center`} onClick={handleSetting}><IoSettingsOutline size={30} id="chatsidebar-setting"/></button>
        </div>

        {/* Chat Messages */}
       {!isExpanded &&  <main className="flex-1 overflow-y-auto p-4 bg-gray-900 flex flex-col">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-2 ${m.sender === "You" ? "text-right" : "text-left"}`}
            >
              <span className="font-bold">{m.sender}: </span>
              {m.text}
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </main>    } 

        {/* Input Area */}
        {
          !isExpanded &&  <footer className="bg-gray-900 p-3 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            {!isRecording ? (
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
                <button className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2">
                  <HiOutlinePlus size={20} />
                </button>
                <button className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2">
                  <HiOutlineEmojiHappy size={20} />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message"
                  className="flex-1 bg-transparent w-[30px] text-gray-100 placeholder-gray-400 focus:outline-none"
                />
                {input ? (
                  <button onClick={handleSend} className="ml-2 bg-green-600 hover:bg-green-700 rounded-full p-2">
                    <FaPaperPlane className="text-white" />
                  </button>
                ) : (
                  <button onClick={() => setIsRecording(true)} className="ml-2 text-gray-200 hover:bg-gray-700 rounded-full p-2">
                    <FaMicrophone />
                  </button>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-full px-3 py-2"
              >
                <button onClick={() => setIsPaused(!isPaused)} className="text-gray-200">
                  <FaPause />
                </button>
                <span className="text-gray-200 font-mono">hello</span>
                <button onClick={() => setIsRecording(false)} className="text-gray-200">
                  <FaTrash />
                </button>
                <button onClick={() => setIsRecording(false)} className="text-green-500">
                  <FaPaperPlane />
                </button>
              </motion.div>
            )}
          </div>
        </footer>
        }
       
      </section>
    </div>
  );
}
