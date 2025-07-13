import React, { useState } from "react";
import { RxCommit, RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { joinRoom } from "../../redux/feature/RoomActionSlicer";
import axios from "axios";
export default function JoinRoomModal() {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.roomList);
  const [roomData, setRoomData] = useState({
    roomId: "",
    password: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const { roomId, password } = roomData;

    if (!roomId || !password) {
      alert("field cannot be empty");
      return;
    }
    try {
      const response = await axios.post("/api/rooms/joinRoom", roomData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data.success) {
        throw new Error(
          response.data.message || "room id and credentials donot match"
        );
      }
      console.log(response.data);
      dispatch(joinRoom(false));
    } catch (error) {
      alert(error?.response?.data);
      console.log(error);
    }
  }
  console.log("roomlist", roomList);
  console.log("roomData", roomData);

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.id]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Join a Room</h2>
          <button type="button" onClick={() => dispatch(joinRoom(false))}>
            <RxCross1 className="text-white text-xl cursor-pointer" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="roomId"
              className="block text-white text-sm font-medium mb-1"
            >
              Room ID
            </label>
            <input
              type="text"
              id="roomId"
              onChange={handleChange}
              placeholder="Enter room ID"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-white font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md font-medium transition-colors"
          >
            Join Room
          </button>
        </div>
      </form>
    </div>
  );
}
