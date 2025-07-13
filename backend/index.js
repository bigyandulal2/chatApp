// require("dotenv").config(); // If using environment variables

require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ frontend port during dev
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: "http://localhost:5173", // allow your frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
// Connect to Database
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("API Running");
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("socket id disconnected", socket.id);
  });
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
