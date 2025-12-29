const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// Import database connection
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Blog routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);


app.get("/", (req, res) => {
  res.send("BeyondChats API running");
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
