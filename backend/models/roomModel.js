const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    roomName: { type: String, required: true },
    password: { type: String, required: true },

    // Mongoose will cast Date.now() to Date
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// TTL index: delete 5 hours (18,000 seconds) after createdAt
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 5 });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
