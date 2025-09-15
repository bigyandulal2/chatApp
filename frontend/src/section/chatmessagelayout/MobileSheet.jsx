// src/components/chat/ChatSidebar/MobileSheet.jsx
import React from "react";
import Tabs from "./Tabs";
import ThreadHeader from "./ThreadHeader";
import MessageList from "./MessageList";
import Composer from "./Composer";
import PeopleList from "./PeopleList";
import Settings from "./Settings";

export default function MobileSheet({
  selected,
  setSelected,
  sheetHeights,
  messages,
  input,
  setInput,
  onSend,
}) {
  return (
    <section
      className="flex flex-col h-full"
      style={{
        height: `${sheetHeights.sheetH}px`,
      }}
    >
      <Tabs
        selected={selected}
        onChat={() => setSelected("chat")}
        onPeople={() => setSelected("people")}
        onSetting={() => setSelected("setting")}
      />

      {selected === "chat" && (
        <>
          <ThreadHeader label="Chat" youLabel="You" />
          <MessageList messages={messages} />
          <Composer input={input} setInput={setInput} onSend={onSend} />
        </>
      )}

      {selected === "people" && <PeopleList />}
      {selected === "setting" && <Settings />}
    </section>
  );
}
