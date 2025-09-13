const mongoose = require("mongoose");
const ensureRoomIndexes = require("../controllers/ensureRoomIndexes");
const api= `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.n0qqfge.mongodb.net/yapspace?retryWrites=true&w=majority&appName=Cluster0`;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(api, {
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
