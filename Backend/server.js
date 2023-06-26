const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userController = require("./studentController");
const bookController = require("./bookController");

app.use(express.json());

mongoose
  .connect(process.env.URI || "mongodb://127.0.0.1:27017/libdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log("Running Successfully at", process.env.PORT || 5000);
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });

app.use("/students", userController); // Use userController for handling user routes
app.use("/books", bookController); // Use bookController for handling book routes

app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;
