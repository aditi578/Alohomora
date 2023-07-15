// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const studentController = require("./studentController");
const bookController = require("./bookController");
const userController = require("./userController");

// Load environment variables from .env file
dotenv.config();

// Middleware to parse request bodies as JSON
app.use(express.json());

// Connect to MongoDB database using the provided URI
mongoose
  .connect(process.env.URI || "mongodb://127.0.0.1:27017/libdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully");
    // Start the server and listen for incoming requests
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log("Running Successfully at", process.env.PORT || 5000);
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });

// Mount the studentController, bookController, and userController middleware
app.use("/students", studentController);
app.use("/books", bookController);
app.use("/users", userController);

// Route for the root URL
app.get("/", (req, res) => {
  res.send("API running");
});

// Export the app for external use (e.g., in tests)
module.exports = app;
