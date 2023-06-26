const express = require("express");
const router = express.Router();
const cors = require("cors");
const Student = require("./models/studnetModel");
const mongoose = require("mongoose");


// Enable CORS for requests from http://localhost:3000
router.use(cors({ origin: "http://localhost:3000" }));

// Create a new student
router.post("/", async (req, res) => {
  try {
    const { name, id, email, mobileNo } = req.body;
    const newStudent = await Student.create({
      name,
      id,
      email,
      mobileNo,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve student details
router.get("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update student details
router.put("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, id, email, mobileNo } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, id, email, mobileNo },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search students
router.get("/search", async (req, res) => {
  try {
    const { name, id, email } = req.query;
    const query = {};
    if (name) query.name = name;
    if (id) query.id = id;
    if (email) query.email = email;
    const students = await Student.find(query);
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
