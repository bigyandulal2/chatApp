const userMicStates = {}; // store mic states per userId

module.exports = (io, socket) => {
  let currentRoomId = null;
  let currentUserId = null;

  // When a user joins a room
  socket.on("joinRoom", ({ roomId, userId }) => {
    currentRoomId = roomId;
    currentUserId = userId;

    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
  });

  // When mic state changes
  socket.on("onmike", ({ roomId, userId, micOn }) => {
    if (!userId || !roomId) return;

    // Store mic state by userId
    userMicStates[userId] = micOn;

    // Broadcast mic state to others in the room
    socket.to(roomId).emit("userMicStateChanged", {
      userId,
      micOn,
    });

    console.log(`Mic state for user ${userId} in room ${roomId}: ${micOn}`);
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    if (currentUserId) {
      delete userMicStates[currentUserId];

      if (currentRoomId) {
        socket.to(currentRoomId).emit("userMicStateChanged", {
          userId: currentUserId,
          micOn: false,
        });
      }

      console.log(`User ${currentUserId} disconnected and mic state cleared.`);
    }
  });
};
