import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StreamCall, useStreamVideoClient } from "@stream-io/video-react-sdk";

import Screen from "../section/chatmessagelayout/Screen";
import ChatSidebar from "../section/chatmessagelayout/ChatSidebar";
import VideoProvider from "../utils/VideoContext";
export default function ChatMessageLayout() {
  const { id: callId } = useParams(); // get room ID from URL
  console.log("iddd hereeeeeeeee",callId);
  const client = useStreamVideoClient(); // get StreamVideoClient from context
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const joinCall = async () => {
      if (!client || !callId) return;
  
      const callInstance = client.call("default", callId);
      // 👇 Prevent automatic media access
      await callInstance.join({ microphone: false, camera: false });
      setCall(callInstance);
      setLoading(false);
    };
  
    joinCall();
  }, [client, callId]);
  
  

  if (loading || !call) {
    return <div className="text-white p-4">Joining the call...</div>;
  }

  return (
   
    <StreamCall call={call}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 bg-gray-900 min-h-screen">
        {/* Main video/screen area */}
        <Screen />

        {/* Chat / People / Settings */}
        <ChatSidebar />
      </div>
    </StreamCall>
   
  );
}
