const mongoose = require("mongoose");
const ensureRoomIndexes = require("../controllers/ensureRoomIndexes");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await ensureRoomIndexes();
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("it's me mongodb");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
