// src/components/chat/ChatSidebar/DesktopSidebar.jsx
import React from "react";
import Tabs from "./Tabs";
import ThreadHeader from "./ThreadHeader";
import MessageList from "./MessageList";
import Composer from "./Composer";
import PeopleList from "./PeopleList";
import Settings from "./Settings";

export default function DesktopSidebar({
  isExpanded,
  selected,
  onChat,
  onPeople,
  onSetting,
  messages,
  input,
  setInput,
  onSend,
}) {
  return (
    <section className="flex flex-1 flex-col h-screen">
      <Tabs selected={selected} onChat={onChat} onPeople={onPeople} onSetting={onSetting} />

      {selected === "chat" && (
        <>
          <ThreadHeader label="Chat" youLabel="You" />
          {!isExpanded && (
            <>
              <MessageList messages={messages} />
              <Composer input={input} setInput={setInput} onSend={onSend} />
            </>
          )}
        </>
      )}

      {selected === "people" && <PeopleList />}
      {selected === "setting" && <Settings />}
    </section>
  );
}
