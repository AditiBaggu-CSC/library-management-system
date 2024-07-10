const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4444;
const userRoutes = require("./Routes/UserRoutes");
const imageRoutes = require("./Routes/ImageRoutes");
const { scheduleEmailReminders } = require("./emailScheduler");

dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS,PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Use user routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});
scheduleEmailReminders();

mongoose
  .connect(
    `mongodb+srv://thecorrectsteps:sajaljain%40390@cluster0.qaath81.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
