
const usersInRoom = {};
function Users(io,socket){
    return usersInRoom;
}
function JoinRooms(io, socket) {
  socket.on("join-room", ({ roomId, user,userId }) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
    socket.emit("joinRoomLayout", true);

    // Add user to tracking
    if (!usersInRoom[roomId]) {
      usersInRoom[roomId] = [];
    }

    // Avoid duplicate user entries (in case of reconnects)
    const alreadyInRoom = usersInRoom[roomId].some(
      (u) => u.userId === userId
    );

    if (!alreadyInRoom) {
      usersInRoom[roomId].push({
        socketId: socket.id,
        userId: userId,
        name: user,
        roomId:roomId
      });
    }

    // Notify others in the room
    console.log("User joined:", user);
    socket.to(roomId).emit("user-joined", user);

    // Send updated user list to all clients in the room
    io.to(roomId).emit("roomUsers", usersInRoom[roomId]);
  });

  socket.on("disconnect", () => {
    for (const roomId in usersInRoom) {
      const before = usersInRoom[roomId].length;

      usersInRoom[roomId] = usersInRoom[roomId].filter(
        (u) => u.socketId !== socket.id
      );

      const after = usersInRoom[roomId].length;

      if (before !== after) {
        io.to(roomId).emit("roomUsers", usersInRoom[roomId]);
      }
    }
  });
};
module.exports={Users,JoinRooms}