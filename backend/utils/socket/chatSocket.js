const fileBufferMap = {}; // store file chunks temporarily

module.exports = (io, socket) => {
  socket.on("send-messages", ({ roomId, user, text, fileName, fileType, chunk, isLastChunk }) => {
    // Handle file chunks
    if (chunk) {
      if (!fileBufferMap[roomId]) fileBufferMap[roomId] = {};
      if (!fileBufferMap[roomId][user]) fileBufferMap[roomId][user] = [];

      fileBufferMap[roomId][user].push(Buffer.from(chunk));

      if (isLastChunk) {
        const allChunks = fileBufferMap[roomId][user];
        const fullBuffer = Buffer.concat(allChunks);
        const base64 = fullBuffer.toString("base64");

        io.to(roomId).emit("received-messages", {
          user,
          fileName,
          fileType,
          fileData: base64,
        });

        delete fileBufferMap[roomId][user];
      }
    }

    // Handle plain text messages
    else if (text) {
      io.to(roomId).emit("received-messages", { user, text });
    }
  });
};
