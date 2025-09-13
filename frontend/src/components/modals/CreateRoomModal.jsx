// src/components/modals/CreateRoomModal.jsx
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { createRoom } from "../../redux/feature/RoomActionSlicer";
import FormMessage from "./FormMessage";
import api from "../../utils/api"; 
import { socket } from "../../utils/Socket";
import { addRoom } from "../../redux/feature/RoomActionSlicer";

export default function CreateRoomModal({ onRoomCreated }) {
  const dispatch = useDispatch();
  
  // Derive default room name from localStorage
  const stored = localStorage.getItem("user");
  const defaultName = (() => {
    try {
      const obj = JSON.parse(stored);
      return obj?.username || obj?.name || stored || "";
    } catch {
      return stored || "";
    }
  })();

  const [roomData, setRoomData] = useState({
    roomName: defaultName,
    roomId: "",
    password: "",
  });

  const [banner, setBanner] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRoomData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!roomData.roomName || !roomData.roomId || !roomData.password) {
      setBanner({ type: "error", message: "Please fill all fields." });
      return;
    }

    try {
      setSubmitting(true);

      // POST to backend (via api.js)
      const res = await api.post("/rooms/createRoom", roomData);
      const ok = Boolean(res.data?.success);
      const msg =
        res.data?.message || (ok ? "Room created." : "Failed to create room.");

      if (ok) {
        setBanner({ type: "success", message: msg });
        //onRoomCreated?.();
        onRoomCreated?.();
        dispatch(createRoom(false));
        dispatch(addRoom(res.data.rooms))
        socket.emit("newRoom-added","wow");
        // refresh list immediately
      
        // Do NOT close modal here. Let toast auto-hide then close via onClose below.
      } else {
        setBanner({ type: "error", message: msg });
      }
    
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong!";
      setBanner({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(createRoom(false));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      {/* 🔔 Auto-hide toast (3s). On success, close modal after it disappears */}
      {banner.message && (
        <FormMessage
          type={banner.type}
          message={banner.message}
          autoHideMs={3000}
          onClose={() => {
            const wasSuccess = banner.type === "success";
            setBanner({ type: "", message: "" });
            if (wasSuccess) handleClose(); // close AFTER success toast shows
          }}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create a Room</h2>
          <button type="button" onClick={handleClose}>
            <RxCross1 className="text-white text-xl cursor-pointer" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Room Name (read-only per your design) */}
          <div>
            <label htmlFor="roomName" className="block text-sm font-medium mb-1 text-white">
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              value={roomData.roomName}
              readOnly
              placeholder="Enter room name"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>

          {/* Room ID */}
          <div>
            <label htmlFor="roomId" className="block text-white text-sm font-medium mb-1">
              Room ID
            </label>
            <input
              type="text"
              id="roomId"
              value={roomData.roomId}
              onChange={handleChange}
              placeholder="Enter room ID"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-white font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={roomData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md font-medium transition-colors disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Room"}
          </button>
        </div>
      </form>
    </div>
  );
}
