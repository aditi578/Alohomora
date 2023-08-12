const mongoose = require("mongoose");

// Define the book schema using Mongoose.Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true
  }
});

// Create a Book model using the book schema
const Student = mongoose.model("Student", studentSchema);

// Export the Book model to be used in other files
module.exports = Student;
