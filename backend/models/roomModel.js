const mongoose = require("mongoose");

// 5 hours (in seconds)
const TTL_SECS = 5 * 60 * 60;

const roomSchema = new mongoose.Schema(
  {
    roomId:   { type: String, required: true, unique: true, index: true },
    roomName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt/updatedAt
);

// TTL: delete 5h after createdAt
roomSchema.index({ createdAt: 1 }, { name: "createdAt_1", expireAfterSeconds: TTL_SECS });

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

/**
 * Ensure the TTL index is correct (use once after connecting).
 * Safe to call on every boot; it will drop/recreate the TTL if needed
 * and sync the unique roomId index from the schema.
 */

module.exports =  Room ;
