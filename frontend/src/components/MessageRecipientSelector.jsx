// components/MessageRecipientSelector.js

import React, { useEffect, useState } from "react";
import { socket } from "../utils/Socket";
import {useDispatch, useSelector} from "react-redux";
import { setRecipient } from "../redux/chatMessageActionSlicer";
import { setUsersInRoom } from "../redux/chatMessageActionSlicer";
export default function MessageRecipientSelector() {

 const userId=useSelector((state)=>state.chat.userId);
 const recipient=useSelector((state)=>state.chat.recipient)
 const usersInRoom=useSelector((state)=>state.chat.usersInRoom);
 const dispatch=useDispatch();
  useEffect(()=>{
    socket.on("roomUsers", (users) => {
      console.log("Updated user list:", users);
      dispatch(setUsersInRoom(users)); // or however you store it
    });
    return ()=>{
       socket.off("roomUsers");
    }
  },[])
  // console.log("recipieentttttttttttttttttttttttttttttt",recipient);
  
  return (
    <select
      value={recipient}
      onChange={(e) => dispatch(setRecipient(e.target.value))}
      className="ml-2 mb-2 bg-gray-700 text-gray-200 rounded-full px-3 py-1 text-sm focus:outline-none hover:bg-gray-600 cursor-pointer"
      aria-label="Select message recipient"
      
    >
      <option value={"everyone"}>everyone</option>
     
      {
  usersInRoom
    .filter(u => u.userId && u.userId !== userId)  // only users with userId and not the current user
    .map(u => (
      <option key={u.userId} value={u.name}>{u.name}</option>
    ))
}

    </select>
  );
}
