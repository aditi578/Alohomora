const express = require("express");
const router = express.Router();
const Student = require("./models/studnetModel");

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

module.exports = router;