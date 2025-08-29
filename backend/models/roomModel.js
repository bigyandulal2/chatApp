
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    roomName: { type: String, required: true },
    password: { type: String, required: true },

    // Will store a Date (Mongoose casts Date.now() to Date)
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // ok to keep; it reuses createdAt
);

// ✅ Explicit TTL index: delete 2 minutes after createdAt
roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 5 });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
