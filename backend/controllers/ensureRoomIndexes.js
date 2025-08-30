// controllers/ensureRoomIndexes.js
const Room = require("../models/roomModel"); // default export = Room
const TTL_SECS = 5 * 60 * 60; // 5 hours

async function ensureRoomIndexes() {
  try {
    // Optional: see what exists before
    const before = await Room.collection.indexes().catch(() => []);
    console.log("[Room] Indexes BEFORE:", before);

    // Drop any legacy TTL on createdAt (ignore if not found)
    try { await Room.collection.dropIndex("createdAt_1"); } catch (_) {}

    // Recreate the intended TTL on createdAt (5h)
    await Room.collection.createIndex(
      { createdAt: 1 },
      { name: "createdAt_1", expireAfterSeconds: TTL_SECS }
    );

    // Keep other schema indexes (e.g., unique roomId) in sync
    await Room.syncIndexes();

    const after = await Room.collection.indexes().catch(() => []);
    console.log("[Room] Indexes AFTER:", after);
  } catch (e) {
    console.error("[Room] ensureRoomIndexes error:", e);
    throw e; // fail fast on startup so you notice
  }
}

module.exports = ensureRoomIndexes;
