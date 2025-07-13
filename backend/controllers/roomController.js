const Room = require("../models/roomModel");

const bcrypt = require("bcrypt");

exports.registerRoom = async (req, res) => {
  const { roomName, roomId, password } = req.body;
  const existingRoom = await Room.findOne({ roomId });
  if (existingRoom) {
    return res
      .status(400)
      .json({ success: false, message: "Room Id already exists" });
  }
  //  hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  //create and save the room
  const roomInstance = new Room({
    roomName,
    roomId,
    password: hashedPassword,
  });
  await roomInstance.save();
  res.status(200).json({
    success: true,
    message: "successfully register",
    rooms: {
      roomName: roomInstance.roomName,
      roomId: roomInstance.roomId,
    },
  });
};
exports.joinRoom = async (req, res) => {
  console.log("i am join room");
  console.log(req.body);
  const { roomId, password } = req.body;
  const existingRoom = await Room.findOne({ roomId });
  if (!existingRoom) {
    return res
      .status(400)
      .json({ success: false, message: "Room doesn't exist" });
  }
  const doPasswordMatch = await bcrypt.compare(password, existingRoom.password);
  if (!doPasswordMatch) {
    return res
      .status(401)
      .json({ success: false, message: "invalid roomId and password" });
  }
  return res.status(200).json({
    success: true,
    message: "join Room is successfull",
    room: {
      roomId: existingRoom.roomId,
      roomName: existingRoom.roomName,
    },
  });
};
