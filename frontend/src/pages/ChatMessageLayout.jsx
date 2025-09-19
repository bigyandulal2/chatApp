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
  

  return (
   
    
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 bg-gray-900 min-h-screen">
       
        <Screen />

      
        <ChatSidebar />
      </div>
  
   
  );
}
