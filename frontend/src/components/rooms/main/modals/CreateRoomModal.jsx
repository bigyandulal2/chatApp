import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoom,
  addRoom,
} from "../../../../redux/feature/RoomActionSlicer"; // Make sure addRoomToList action exists

export default function CreateRoomModal() {
  const roomList = useSelector((state) => state.room.roomList);
  console.log("createRoomModal roomlist", roomList);
  const dispatch = useDispatch();
  const [roomData, setRoomData] = useState({
    roomName: "",
    roomId: "",
    password: "",
  });

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!roomData.roomName || !roomData.roomId || !roomData.password) {
      alert("Please fill all fields.");
      return;
    }
    const existRoomId = roomList.find(
      (item) => item.roomId === roomData.roomId
    );
    if (existRoomId) {
      alert("roomId already exist,sorry you cannot join the room");
      return;
    }

    dispatch(addRoom(roomData)); // Add to list
    dispatch(createRoom(false)); // Close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create a Room</h2>
          <button type="button" onClick={() => dispatch(createRoom(false))}>
            <RxCross1 className="text-white text-xl cursor-pointer" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="roomName"
              className="block text-sm font-medium mb-1"
            >
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              value={roomData.roomName}
              onChange={handleChange}
              placeholder="Enter room name"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="roomId" className="block text-sm font-medium mb-1">
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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
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
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md font-medium transition-colors"
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
}
