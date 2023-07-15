const mongoose = require("mongoose");

// Define the book schema using Mongoose.Schema
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

// Create a Book model using the book schema
const Book = mongoose.model("Book", bookSchema);

// Export the Book model to be used in other files
module.exports = Book;
