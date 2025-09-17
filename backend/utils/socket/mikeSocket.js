const userMediaStates = {}; // { userId: { micOn: boolean, videoOn: boolean } }

module.exports = (io, socket) => {
  let currentRoomId = null;
  let currentUserId = null;

  // User joins a room
  socket.on("joinRoom", ({ roomId, userId }) => {
    if (!roomId || !userId) return;

    currentRoomId = roomId;
    currentUserId = userId;

    socket.join(roomId);
    console.log(`✅ User ${userId} joined room ${roomId}`);

    // Send initial media states to the new user
    const statesInRoom = Object.entries(userMediaStates)
      .filter(([uid]) => uid !== userId)
      .map(([uid, state]) => ({ userId: uid, ...state }));

    socket.emit("initialUserMediaStates", statesInRoom);
  });

  // Fallback: client requests initial states manually
  socket.on("requestInitialStates", ({ roomId, userId }) => {
    if (!roomId || !userId) return;

    const statesInRoom = Object.entries(userMediaStates)
      .filter(([uid]) => uid !== userId)
      .map(([uid, state]) => ({ userId: uid, ...state }));

    socket.emit("initialUserMediaStates", statesInRoom);
  });

  // User updates mic/video state
  socket.on("updateMediaState", ({ roomId, userId, micOn, videoOn }) => {
    if (!roomId || !userId) return;

    userMediaStates[userId] = {
      micOn: micOn ?? userMediaStates[userId]?.micOn ?? false,
      videoOn: videoOn ?? userMediaStates[userId]?.videoOn ?? false,
    };

    // Broadcast to others in the room
    socket.to(roomId).emit("userMediaStateChanged", {
      userId,
      micOn: userMediaStates[userId].micOn,
      videoOn: userMediaStates[userId].videoOn,
    });

    console.log(
      `🎙️ Media state updated for ${userId} in ${roomId}: mic=${userMediaStates[userId].micOn}, video=${userMediaStates[userId].videoOn}`
    );
  });

  // Cleanup on disconnect
  socket.on("disconnect", () => {
    if (!currentUserId || !currentRoomId) return;

    delete userMediaStates[currentUserId];

    socket.to(currentRoomId).emit("userMediaStateChanged", {
      userId: currentUserId,
      micOn: false,
      videoOn: false,
    });

    console.log(`❌ User ${currentUserId} disconnected. Media state cleared.`);
  });
};