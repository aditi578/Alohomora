const express = require("express");
const router = express.Router();
const cors = require("cors");
const Student = require("./models/studentModel");

// Enable CORS for requests from http://localhost:3000
router.use(cors({ origin: "http://localhost:3000" }));

// Create a new student
router.post("/", async (req, res) => {
  try {
    const { name, studentId, email, mobileNumber } = req.body;
    const newStudent = await Student.create({
      name,
      studentId,
      email,
      mobileNumber,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve student details by studentId
router.get("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update student details by studentId
router.put("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { name, email, mobileNumber } = req.body;
    const updatedStudent = await Student.findOneAndUpdate(
      { studentId },
      { name, email, mobileNumber },
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

// Delete a student by studentId
router.delete("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const deletedStudent = await Student.findOneAndDelete({ studentId });
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
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
