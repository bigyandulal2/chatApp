const chatSocket = require("./chatSocket");
const {JoinRooms} = require("./roomSocket");
const mikeSocket = require("./mikeSocket");

module.exports = (io,socket) => {
    console.log("User connected:", socket.id);
    // Load all socket handlers
    chatSocket(io, socket);
    JoinRooms(io, socket);
    mikeSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
};
