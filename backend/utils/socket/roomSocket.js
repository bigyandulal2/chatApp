module.exports = (io, socket) => {
    socket.on("join-room", ({ roomId, user }) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
      socket.emit("joinRoomLayout", true);
  
      // Notify others in the room
      console.log("User joined:", user);
      socket.to(roomId).emit("user-joined", user);
    });
  };
