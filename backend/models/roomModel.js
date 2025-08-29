const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    roomName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Field to track when the room was created
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60*2, // ⏳ TTL index: 8 hours (in seconds)
    },
  },
  { timestamps: true } // still adds createdAt & updatedAt by default
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
