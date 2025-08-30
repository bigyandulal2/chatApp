const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    roomName: { type: String, required: true },
    password: { type: String, required: true },

    // TTL field: expires 5 hours after creation
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// TTL index: expiresAt triggers deletion
roomSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;