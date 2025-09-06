
// const fileBufferMap = {}; // Store file chunks temporarily
// const { Users } = require("./roomSocket"); // Assumes exported from roomSocket.js

// module.exports = (io, socket) => {
//   // userslist 
//   // console.log(Users(),"total users here");
//   const users=Users();
//   // -----------------------------
//   // 🔒 Private Message Handler
//   // -----------------------------
//   socket.on("private-message", ({ roomId, from, to, text, fileName, fileType, chunk, isLastChunk }) => {
//     const allUsers = Object.values(users).flat();
//     console.log("all userssssssssssssssssssssssssssssss",allUsers)
//     console.log("frommmmmmm",from,"tooooooooooooooooooooo",to);
//     const roomUsers = allUsers[roomId] || [];
//     const targetUser = roomUsers.find((u) => u.userId === to);

//     if (!targetUser) {
//       console.warn("Private message target user not found in room:", to);
//       return;
//     }

//     // Handle private file chunks
//     if (chunk) {
//       const key = `${roomId}_${from.userId}_${to}`;
//       if (!fileBufferMap[key]) fileBufferMap[key] = [];

//       fileBufferMap[key].push(Buffer.from(chunk));

//       if (isLastChunk) {
//         const allChunks = fileBufferMap[key];
//         const fullBuffer = Buffer.concat(allChunks);
//         const base64 = fullBuffer.toString("base64");

//         const filePayload = {
//           sender: from,
//           fileName,
//           fileType,
//           fileData: base64,
//           type: "private",
//           timestamp: new Date(),
//         };

//         io.to(targetUser.socketId).emit("new-private-message", filePayload);
//         io.to(socket.id).emit("new-private-message", { ...filePayload, to }); // echo back to sender

//         delete fileBufferMap[key];
//       }
//     } else if (text) {
//       const msgPayload = {
//         sender: from,
//         message: text,
//         type: "private",
//         timestamp: new Date(),
//         to,
//       };

//       io.to(targetUser.socketId).emit("new-private-message", msgPayload);
//       io.to(socket.id).emit("new-private-message", msgPayload); // echo to sender
//     }
//   });

//   // -----------------------------
//   // 🌐 Public Message Handler
//   // -----------------------------
//   socket.on("send-messages", ({ roomId, user, text, fileName, fileType, chunk, isLastChunk }) => {
//     // Handle file chunked upload
//     if (chunk) {
//       const key = `${roomId}_${user.userId}`;
//       if (!fileBufferMap[key]) fileBufferMap[key] = [];

//       fileBufferMap[key].push(Buffer.from(chunk));

//       if (isLastChunk) {
//         const allChunks = fileBufferMap[key];
//         const fullBuffer = Buffer.concat(allChunks);
//         const base64 = fullBuffer.toString("base64");

//         io.to(roomId).emit("received-messages", {
//           user,
//           fileName,
//           fileType,
//           fileData: base64,
//           type: "public",
//           timestamp: new Date(),
//         });

//         delete fileBufferMap[key];
//       }
//     } else if (text) {
//       io.to(roomId).emit("received-messages", {
//         user,
//         text,
//         type: "public",
//         timestamp: new Date(),
//       });
//     }
//   });
// };
const fileBufferMap = {}; // Store file chunks temporarily
const { Users } = require("./roomSocket"); // Function returning users object

module.exports = (io, socket) => {
  // Private Message Handler
  socket.on("private-message", ({ roomId, from, to, text, fileName, fileType, chunk, isLastChunk }) => {
    const users = Users(); // Get current users object: { roomId: [userObjects] }
    console.log("Users object:", users);
    console.log("From:", from, "To:", to);

    const roomUsers = users[roomId] || []; // Users in the specific room
    console.log("Users in room:", roomUsers);

    const targetUser = roomUsers.find(u => u.userId === to);
    if (!targetUser) {
      console.warn("Private message target user not found in room:", to);
      return;
    }
    console.log("Found target user:", targetUser);

    // Handle private file chunks
    if (chunk) {
      const key = `${roomId}_${from.userId}_${to}`;
      if (!fileBufferMap[key]) fileBufferMap[key] = [];

      fileBufferMap[key].push(Buffer.from(chunk));

      if (isLastChunk) {
        const allChunks = fileBufferMap[key];
        const fullBuffer = Buffer.concat(allChunks);
        const base64 = fullBuffer.toString("base64");

        const filePayload = {
          sender: from,
          fileName,
          fileType,
          fileData: base64,
          type: "private",
          timestamp: new Date(),
        };

        io.to(targetUser.socketId).emit("new-private-message", filePayload);
        io.to(socket.id).emit("new-private-message", { ...filePayload, to }); // echo back to sender

        delete fileBufferMap[key];
      }
    } else if (text) {
      const msgPayload = {
        sender: from,
        message: text,
        type: "private",
        timestamp: new Date(),
        to,
      };

      io.to(targetUser.socketId).emit("new-private-message", msgPayload);
      io.to(socket.id).emit("new-private-message", msgPayload); // echo to sender
    }
  });

  // Public Message Handler
  socket.on("send-messages", ({ roomId, user, text, fileName, fileType, chunk, isLastChunk }) => {
    if (chunk) {
      const key = `${roomId}_${user.userId}`;
      if (!fileBufferMap[key]) fileBufferMap[key] = [];

      fileBufferMap[key].push(Buffer.from(chunk));

      if (isLastChunk) {
        const allChunks = fileBufferMap[key];
        const fullBuffer = Buffer.concat(allChunks);
        const base64 = fullBuffer.toString("base64");

        io.to(roomId).emit("received-messages", {
          user,
          fileName,
          fileType,
          fileData: base64,
          type: "public",
          timestamp: new Date(),
        });

        delete fileBufferMap[key];
      }
    } else if (text) {
      io.to(roomId).emit("received-messages", {
        user,
        text,
        type: "public",
        timestamp: new Date(),
      });
    }
  });
};

