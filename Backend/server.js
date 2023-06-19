const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const User = require("./models/studentModel");
const userController = require("./studentController");
const bookController = require("./bookController");

app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("Running Successfully at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });

app.use("/users", userController); // Use userController for handling user routes
app.use("/books", bookController); // Use bookController for handling book routes

app.get("/", (req, res) => {
  res.send("API running");
});
