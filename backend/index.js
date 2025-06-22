// require("dotenv").config(); // If using environment variables

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // allow your frontend origin
    credentials: true,
  })
);
app.use(express.json());
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
// Connect to Database
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
