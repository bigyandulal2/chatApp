
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { joinRoom as toggleJoinRoom } from "../../redux/feature/RoomActionSlicer";
import api from "../../utils/api";
import FormMessage from "../../components/modals/FormMessage"; // must be the auto-hide version
import { useNavigate } from "react-router-dom";

export default function JoinRoomModal() {
  const dispatch = useDispatch();
  
  const navigate=useNavigate();
  const [roomData, setRoomData] = useState({ roomId: "", password: "" });
  const [banner, setBanner] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    // clears form and closes modal
    setRoomData({ roomId: "", password: "" });
    setBanner({ type: "", message: "" });
    dispatch(toggleJoinRoom(false));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRoomData((prev) => ({ ...prev, [id]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { roomId, password } = roomData;

    if (!roomId || !password) {
      setBanner({ type: "error", message: "Room ID and password are required." });
      return;
    }

    try {
      setSubmitting(true);

      const response = await api.post("/rooms/joinRoom", roomData);
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Room ID and password do not match.");
      }

      // ✅ Show success toast; DO NOT close here
      setBanner({ type: "success", message: "Successfully joined room." });
      navigate(`/room/${roomData.roomId}`);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Error joining the room.";
      setBanner({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      {/* Auto-hide toast (3s). If success, close AFTER it shows */}
      {banner.message && (
        <FormMessage
          type={banner.type}          // "success" | "error"
          message={banner.message}
          autoHideMs={200}
          onClose={() => {
            const wasSuccess = banner.type === "success";
            setBanner({ type: "", message: "" });
            if (wasSuccess) handleClose(); // close modal after success toast
          }}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Join a Room</h2>
          <button type="button" onClick={handleClose}>
            <RxCross1 className="text-white text-xl cursor-pointer" />
          </button>
        </div>

        <div className="space-y-4">
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
              autoFocus
            />
          </div>

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
            {submitting ? "Joining..." : "Join Room"}
          </button>
        </div>
      </form>
    </div>
  );
}
