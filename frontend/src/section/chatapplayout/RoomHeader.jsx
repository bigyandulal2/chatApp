import React from "react";
import { FiPlusCircle, FiLogIn, FiUser } from "react-icons/fi";
import {
  createRoom,
  joinRoom,
  
} from "../../redux/feature/RoomActionSlicer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function RoomHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  return (
    <header className="text-white shadow-md px-6 py-4 flex items-center justify-between fixed w-full">
      {/* Left side - Title */}
      <h1
        className="text-2xl font-bold tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        YapSpace
      </h1>

      {/* Center - Buttons */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl shadow-md transition cursor-pointer"onClick={() => dispatch(createRoom(true))}>
          <FiPlusCircle size={20} />
          <span
            className="hidden sm:inline"
           
          >
            Create Room
          </span>
        </button>
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl shadow-md transition cursor-pointer"  onClick={() => dispatch(joinRoom(true))}>
          <FiLogIn size={20} />
          <span
            className="hidden sm:inline"
           
          >
            Join Room
          </span>
        </button>
      </div>

      {/* Right side - User */}
      <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition">
        <FiUser size={30} />
        <span className="font-semibold hidden sm:inline">{user}</span>
      </div>
    </header>
  );
}
