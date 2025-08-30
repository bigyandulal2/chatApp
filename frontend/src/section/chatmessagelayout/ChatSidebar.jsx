
import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IoChatboxEllipses, IoPeople, IoSettingsOutline } from "react-icons/io5";
import { HiOutlinePlus, HiOutlineEmojiHappy } from "react-icons/hi";
import { FaMicrophone, FaPaperPlane, FaPause, FaTrash } from "react-icons/fa";
import { toggle } from "../../redux/feature/ui/UIStateSlicer";

export default function ChatSidebar() {
  // UI state from your store
  const isExpanded = useSelector((state) => state.uistate.isExpanded);
  const dispatch = useDispatch();

  // Local UI
  const [selected, setSelected] = useState("chat");
  const [messages, setMessages] = useState([
    { id: 1, sender: "User1", text: "Hello everyone!" },
    { id: 2, sender: "You", text: "Hi! 👋" },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Actions
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), sender: "You", text: input }]);
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

  // --------- MOBILE DRAGGABLE BOTTOM SHEET ----------
  const [isMobile, setIsMobile] = useState(false);
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const onResize = () => {
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth < 768); // md breakpoint
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

  const y = useMotionValue(sheetHeights.collapsedY);

  useEffect(() => {
    if (isMobile) y.set(sheetHeights.collapsedY);
  }, [isMobile, sheetHeights.collapsedY, y]);

  const handleDragEnd = (_, info) => {
    const currentY = info.point.y - (vh - sheetHeights.sheetH);
    const { collapsedY, midY, expandedY } = sheetHeights;
    const points = [expandedY, midY, collapsedY];
    const nearest = points.reduce((a, b) =>
      Math.abs(b - currentY) < Math.abs(a - currentY) ? b : a
    );
    y.stop();
    y.set(nearest);
  };
  // --------------------------------------------------

  // Desktop/Tablet sidebar (unchanged grid behavior)
  const DesktopSidebar = () => (
    <section className="hidden md:flex flex-1 flex-col h-screen">
      {/* Tabs */}
      <div
        className="flex items-center border-b border-gray-700 bg-gray-800 text-sm md:text-base justify-evenly w-full"
        id="chatsidebar-header"
      >
        <button
          className={`flex-1 py-3 hover:text-blue-400 ${
            selected === "chat" ? "border-b-2 border-blue-400 text-blue-600" : "text-gray-400"
          } font-semibold flex justify-center`}
          onClick={handleChat}
        >
          <IoChatboxEllipses size={24} />
        </button>
        <button
          className={`flex-1 py-3 hover:text-blue-400 ${
            selected === "people" ? "border-b-2 border-blue-400 text-blue-600" : "text-gray-400"
          } flex justify-center`}
          onClick={handlePeople}
        >
          <IoPeople size={24} />
        </button>
        <button
          className={`flex-1 py-3 hover:text-blue-400 ${
            selected === "setting" ? "border-b-2 border-blue-400 text-blue-600" : "text-gray-400"
          } flex justify-center`}
          onClick={handleSetting}
        >
          <IoSettingsOutline size={24} />
        </button>
      </div>

      {/* Messages */}
      {!isExpanded && (
        <main className="flex-1 overflow-y-auto p-4 bg-gray-900 flex flex-col">
          {messages.map((m) => (
            <div key={m.id} className={`mb-2 ${m.sender === "You" ? "text-right" : "text-left"}`}>
              <span className="font-bold">{m.sender}: </span>
              {m.text}
            </div>
          ))}
        </main>
      )}

      {/* Input */}
      {!isExpanded && (
        <footer className="bg-gray-900 p-3 flex items-center justify-center">
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
                  className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
                />
                {input ? (
                  <button
                    onClick={handleSend}
                    className="ml-2 bg-green-600 hover:bg-green-700 rounded-full p-2"
                  >
                    <FaPaperPlane />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsRecording(true)}
                    className="ml-2 text-gray-200 hover:bg-gray-700 rounded-full p-2"
                  >
                    <FaMicrophone />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
                <button onClick={() => setIsPaused(!isPaused)} className="text-gray-200">
                  <FaPause />
                </button>
                <span className="text-gray-200 font-mono">Recording…</span>
                <button onClick={() => setIsRecording(false)} className="text-gray-200">
                  <FaTrash />
                </button>
                <button onClick={() => setIsRecording(false)} className="text-green-500">
                  <FaPaperPlane />
                </button>
              </div>
            )}
          </div>
        </footer>
      )}
    </section>
  );

  // Mobile bottom sheet
  const MobileSheet = () => (
    <section className="md:hidden w-full">
      <motion.div
        className="fixed left-0 right-0 bottom-0 z-40 bg-gray-900 rounded-t-2xl shadow-2xl border-t border-gray-800"
        style={{ height: `${sheetHeights.sheetH}px`, y, touchAction: "none" }}
        drag="y"
        dragConstraints={{ top: -sheetHeights.expandedY, bottom: sheetHeights.collapsedY }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {/* Grabber + Tabs */}
        <div className="pt-2 pb-3">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-700" />
        </div>

        <div className="flex items-center border-b border-gray-700 bg-gray-800 text-sm justify-evenly">
          <button
            className={`flex-1 py-3 hover:text-blue-400 ${
              selected === "chat" ? "border-b-2 border-blue-400 text-blue-500" : "text-gray-400"
            } font-semibold flex justify-center`}
            onClick={() => setSelected("chat")}
          >
            <IoChatboxEllipses size={22} />
          </button>
          <button
            className={`flex-1 py-3 hover:text-blue-400 ${
              selected === "people" ? "border-b-2 border-blue-400 text-blue-500" : "text-gray-400"
            } flex justify-center`}
            onClick={() => setSelected("people")}
          >
            <IoPeople size={22} />
          </button>
          <button
            className={`flex-1 py-3 hover:text-blue-400 ${
              selected === "setting" ? "border-b-2 border-blue-400 text-blue-500" : "text-gray-400"
            } flex justify-center`}
            onClick={() => setSelected("setting")}
          >
            <IoSettingsOutline size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col" style={{ height: `calc(100% - 64px)` }}>
          {selected === "chat" && (
            <>
              <main className="flex-1 overflow-y-auto p-4 bg-gray-900">
                {messages.map((m) => (
                  <div key={m.id} className={`mb-2 ${m.sender === "You" ? "text-right" : "text-left"}`}>
                    <span className="font-bold">{m.sender}: </span>
                    {m.text}
                  </div>
                ))}
              </main>
              <footer className="bg-gray-900 p-3 border-t border-gray-800">
                <div className="w-full">
                  {!isRecording ? (
                    <div className="flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
                      <button className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2">
                        <HiOutlinePlus size={18} />
                      </button>
                      <button className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2">
                        <HiOutlineEmojiHappy size={18} />
                      </button>
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type a message"
                        className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none text-sm"
                      />
                      {input ? (
                        <button onClick={handleSend} className="ml-2 bg-green-600 hover:bg-green-700 rounded-full p-2">
                          <FaPaperPlane />
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsRecording(true)}
                          className="ml-2 text-gray-200 hover:bg-gray-700 rounded-full p-2"
                        >
                          <FaMicrophone />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
                      <button onClick={() => setIsPaused(!isPaused)} className="text-gray-200">
                        <FaPause />
                      </button>
                      <span className="text-gray-200 font-mono text-sm">Recording…</span>
                      <button onClick={() => setIsRecording(false)} className="text-gray-200">
                        <FaTrash />
                      </button>
                      <button onClick={() => setIsRecording(false)} className="text-green-500">
                        <FaPaperPlane />
                      </button>
                    </div>
                  )}
                </div>
              </footer>
            </>
          )}

          {selected === "people" && (
            <div className="flex-1 overflow-y-auto p-4 text-gray-300">People list…</div>
          )}
          {selected === "setting" && (
            <div className="flex-1 overflow-y-auto p-4 text-gray-300">Settings…</div>
          )}
        </div>
      </motion.div>
    </section>
  );

  return (
    <div
      className={`${
        isExpanded ? "col-span-12 md:col-span-1" : "col-span-12 md:col-span-3"
      } bg-gray-900 md:h-auto flex text-white`}
    >
      {/* Desktop/Tablet sidebar (in-grid) */}
      <div className="hidden md:block w-full">
        <DesktopSidebar />
      </div>

      {/* Mobile draggable bottom sheet (overlays the bottom) */}
      <div className="block md:hidden w-full">
        <MobileSheet />
      </div>
    </div>
  );
}
