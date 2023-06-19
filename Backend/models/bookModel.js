const mongoose = require("mongoose");

// Create Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  genre: {
    type: String,
    required: true
  }
});

// Create Model
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
