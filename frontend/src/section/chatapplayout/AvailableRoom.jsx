import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateRoomModal from "../../components/modals/CreateRoomModal";
import JoinRoomModal from "../../components/modals/JoinRoomModal";
import { useApi } from "../../hooks/useApi";
import "../../css/AvailableRoom.css";
import { connectSocket } from "../../redux/feature/socket/SocketActionSlicer";
import { socket } from "../../redux/socket";

export default function AvailableRoom() {
  const createRoom = useSelector((state) => state.room.createRoom);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const joinRoom = useSelector((state) => state.room.joinRoom);
  const [joinedRoomId, setJoinedRoomId] = useState("");
  const { data, loading, error, refetch } = useApi(
    "http://localhost:5000/api/rooms/allRooms"
  );

  useEffect(() => {
    dispatch(connectSocket());
  }, [dispatch]);

  const handleRoomCreated = () => {
    refetch();
  };

  // Handle successful room joining
  useEffect(() => {
    if (!joinedRoomId) return;
    console.log("roomhere from socket", joinedRoomId);
    socket.emit("join-room", joinedRoomId);

    socket.on("joinRoomLayout", (isJoin) => {
      console.log("User joined room:", joinedRoomId);
      // Navigate to the room page after successful join
      if (isJoin) {
        navigate(`/room/${joinedRoomId}`);
      }
    });

    socket.on("join-error", (error) => {
      console.error("Error joining room:", error);
      alert(`Could not join room: ${error.message}`);
    });

    // Clean up event listeners
    return () => {
      socket.off("user-joined");
      socket.off("join-error");
    };
  }, [joinedRoomId, navigate]);

  if (loading) {
    return <div className="loading">Loading rooms...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  function handleRoom(room) {
    const { roomId, roomName } = room;
    setJoinedRoomId(roomId);

    // console.log("Joining room:", roomId, roomName);
  }

  return (
    <>
      {createRoom && <CreateRoomModal onRoomCreated={handleRoomCreated} />}
      {joinRoom && <JoinRoomModal />}

      {/* chatlist is displayed here */}
      <section
        className={`roomlist grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 `}
      >
        {data && data.data && data.data.length > 0 ? (
          data.data.map((room) => (
            <div key={room._id} className="roomcard ">
              <div className="roomcard-header">
                <h2>{`${room.roomName}`}</h2>
              </div>
              <ul className="roomcard-content grid grid-cols-3 gap-2">
                {/* Display participants or empty slots */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <li key={index} className="roomcard-circle"></li>
                ))}
              </ul>
              <div className="roomcard-footer" onClick={() => handleRoom(room)}>
                <p className="btn-container">
                  <button className="roomcard-btn cursor-pointer">
                    Join Room
                  </button>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-rooms text-white">No rooms available</div>
        )}
      </section>
    </>
  );
}
