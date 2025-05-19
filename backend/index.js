const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());
app.use(express.json());
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

//Add this before the app.get() block
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    console.log(data);
    socketIO.emit("message-recieved", {
      userMessage: data.text,
      userName: data.userName,
    });
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});
app.get("/", (req, res) => {
  return res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
