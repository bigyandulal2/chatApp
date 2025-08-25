const express = require("express");
const router = express.Router();
const {
  registerRoom,
  joinRoom,
  allRooms,
} = require("../controllers/roomController.js");
router.post("/createRoom", registerRoom);
router.post("/joinRoom", joinRoom);
router.get("/allRooms", allRooms);
module.exports = router;
