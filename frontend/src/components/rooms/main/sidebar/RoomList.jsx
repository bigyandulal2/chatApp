import React from "react";
import { motion } from "framer-motion";
export default function RoomList({ roomList }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  console.log("roomList", roomList);
  return (
    <>
      {roomList.map((room) => (
        <motion.div
          key={room.roomId}
          className="bg-indigo-500/50 hover:bg-indigo-500/70 text-white p-3 rounded-lg cursor-pointer"
          whileHover={{ x: 5 }}
          variants={itemVariants}
        >
          {room.roomName}
        </motion.div>
      ))}
    </>
  );
}
