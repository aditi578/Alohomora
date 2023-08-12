// Define the User schema
const mongoose = require("mongoose");

// Define the book schema using Mongoose.Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  
// Create a Book model using the book schema
const User = mongoose.model('User', userSchema);

// Export the Book model to be used in other files
module.exports = User;