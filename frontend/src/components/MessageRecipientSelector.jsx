// components/MessageRecipientSelector.js

import React, { useEffect, useState } from "react";
import { socket } from "../utils/Socket";
export default function MessageRecipientSelector({
  recipient,
  setRecipient,
  usersInRoom,
  setUsersInRoom
}) {
 
  useEffect(()=>{
    socket.on("roomUsers", (users) => {
      console.log("Updated user list:", users);
      setUsersInRoom(users); // or however you store it
    });
    return ()=>{
       socket.off("roomUsers");
    }
  },[])
 
  
  return (
    <select
      value={recipient}
      onChange={(e) => setRecipient(e.target.value)}
      className="ml-2 mb-2 bg-gray-700 text-gray-200 rounded-full px-3 py-1 text-sm focus:outline-none hover:bg-gray-600 cursor-pointer"
      aria-label="Select message recipient"
    >
      <option value={recipient} selected disabled>{recipient}</option>
      {usersInRoom
        .filter((u) => u.id !== recipient?.id)
        .map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
    </select>
  );
}
