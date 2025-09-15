import React from "react";

import AvailableRoom from "../section/chatapplayout/AvailableRoom";
import RoomHeader from "../section/chatapplayout/RoomHeader";
export default function ChatAppLayout() {
  

  // console.log("user detail", user);
  return (
    <div className=" h-screen bg-gray-900">
      <RoomHeader />
      <AvailableRoom />
    </div>
  );
}
