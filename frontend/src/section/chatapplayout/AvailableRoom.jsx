import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateRoomModal from "../../components/modals/CreateRoomModal";
import JoinRoomModal from "../../components/modals/JoinRoomModal";
import EnterRoomPasswordModal from "../../components/modals/EnterRoomModal";
import { useApi } from "../../hooks/useApi";
import "../../css/AvailableRoom.css";

import { socket } from "../../utils/Socket";
import { usePost } from "../../hooks/usePost";
import api from "../../utils/api";

export default function AvailableRoom() {
  const createRoom = useSelector((state) => state.room.createRoom);
  const joinRoom = useSelector((state) => state.room.joinRoom);
  const user=localStorage.getItem("user");
  const navigate = useNavigate();

  const [joinedRoomId, setJoinedRoomId] = useState("");
  const [joinTargetRoom, setJoinTargetRoom] = useState(null); // { _id, roomId, roomName }
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordChecking, setPasswordChecking] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { data, loading, error, refetch } = useApi(
    "/rooms/allRooms"
  );
  

  const handleRoomCreated = () => {
    refetch();
  };

  // === Socket listeners for join result ===
  useEffect(() => {
    const handleJoinOk = (isJoin) => {
      if (isJoin && joinedRoomId) {
        navigate(`/room/${joinedRoomId}`);
      }
    };
    
    socket.on("joinRoomLayout", handleJoinOk);
    // socket.on("join-error", handleJoinErr);
    socket.emit("join-room",data=>{
       console.log("from joinRoom data",data);
    })

    return () => {
      socket.off("joinRoomLayout", handleJoinOk);
      // socket.off("join-error", handleJoinErr);
      socket.off("join-room")
      
    };
  }, [joinedRoomId, navigate]);

  if (loading) return <div className="loading">Loading rooms...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Click card: open password modal first
  function handleOpenJoin(room) {
    setJoinTargetRoom(room); // keep roomId + name for modal
    setPasswordError("");
    setPasswordModalOpen(true);
  }

  // After user submits password in modal
  async function handleSubmitPassword(password) {
    console.log("password from enterROommodal is ",password);
    if (!joinTargetRoom) return;
    try {
      setPasswordChecking(true);
      setPasswordError("");

      // If you prefer HTTP:
      // await api.post("/api/rooms/join", { roomId: joinTargetRoom.roomId, password })
     const res= await api.post("/rooms/joinRoom",{roomId:joinTargetRoom.roomId,password});
     console.log(res.data);

     

      // Using your existing socket join:
      const { roomId } = joinTargetRoom;
      setJoinedRoomId(roomId);

      // emit credentials
      socket.emit("join-room", {roomId,user});

      // Let socket listeners handle success/error and navigation
    } catch (e) {
      console.log("erorr here from eee",`${e.status}`);
      setPasswordError(`invalid password for given room`);
      setPasswordChecking(false);
    }
  }

  return (
    <>
      {createRoom && <CreateRoomModal onRoomCreated={handleRoomCreated} />}
      {joinRoom && <JoinRoomModal />}

      {/* Password Modal */}
      <EnterRoomPasswordModal
        open={passwordModalOpen}
        roomName={joinTargetRoom?.roomName || ""}
        onClose={() => {
          setPasswordModalOpen(false);
          setPasswordChecking(false);
          setPasswordError('');
          setJoinTargetRoom(null);
        }}
        onSubmit={handleSubmitPassword}
        loading={passwordChecking}
        error={passwordError}
      />

      {/* chatlist is displayed here */}
      <section className="roomlist grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data && data.data && data.data.length > 0 ? (
          data.data.map((room) => (
            <div key={room._id} className="roomcard">
              <div className="roomcard-header">
                <h2>{room.roomName} Room</h2>
              </div>

              <ul className="roomcard-content grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <li key={idx} className="roomcard-circle"></li>
                ))}
              </ul>

              <div className="roomcard-footer"  onClick={() => handleOpenJoin(room)}>
                <p className="btn-container">
                  <button
                    className="roomcard-btn cursor-pointer"
                  
                  >
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