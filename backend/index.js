require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const socketHandlers = require("./utils/socket/index"); // 👈 import socket handlers

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

// ====================
// Middlewares
// ====================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Attach io to requests (if you still need it in APIs)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ====================
// API Routes
// ====================
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

// ====================
// DB Connect
// ====================
connectDB();

// ====================
// Root Route
// ====================
app.get("/", (req, res) => {
  res.send("API Running");
});

// ====================
// Socket Setup
// ====================
io.on("connection", (socket) => {
  socketHandlers(io, socket); // 👈 delegate socket logic to external file
});

// ====================
// Server Start
// ====================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
