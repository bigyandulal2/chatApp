const chatSocket = require("./chatSocket");
const roomSocket = require("./roomSocket");
const mikeSocket = require("./mikeSocket");

module.exports = (io,socket) => {
    console.log("User connected:", socket.id);
    // Load all socket handlers
    chatSocket(io, socket);
    roomSocket(io, socket);
    mikeSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
};
