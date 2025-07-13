const express = require("express");
const router = express.Router();
const { registerRoom, joinRoom } = require("../controllers/roomController.js");
router.post("/createRoom", registerRoom);
router.post("/joinRoom", joinRoom);

module.exports = router;
