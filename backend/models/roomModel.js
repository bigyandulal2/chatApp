const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: "true",
      unique: true,
    },
    roomName: {
      type: String,
      required: "true",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
