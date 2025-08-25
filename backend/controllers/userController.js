const User = require("../models/userModel");
const { generateToken, protect } = require("../utils/jwt.js");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  console.log("user registered here !!!");
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    console.log(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    // console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log("i am loginuser, and checking here");

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Success response with token
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      username: user.name,
      userEmail: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
