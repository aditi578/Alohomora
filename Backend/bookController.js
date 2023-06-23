const express = require("express");
const router = express.Router();
const cors = require("cors");
const Book = require("./models/bookModel");

// Enable CORS for requests from http://localhost:3000
router.use(cors({ origin: "http://localhost:3000" }));

// Create a new book
router.post("/", async (req, res) => {
  try {
    const { title, author, description, code, genre } = req.body;
    const newBook = await Book.create({
      title,
      author,
      description,
      code,
      genre,
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve book details
router.get("/:bookCode", async (req, res) => {
  try {
    const bookCode = req.params.bookCode;
    const book = await Book.findOne({ code: bookCode });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update book details
router.put("/:bookCode", async (req, res) => {
  try {
    const bookCode = req.params.bookCode;
    const { title, author, description, genre } = req.body;
    const updatedBook = await Book.findOneAndUpdate(
      { code: bookCode },
      { title, author, description, genre },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a book
router.delete("/:bookCode", async (req, res) => {
  try {
    const bookCode = req.params.bookCode;
    const deletedBook = await Book.findOneAndDelete({ code: bookCode });
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search books
router.get("/search", async (req, res) => {
  try {
    const { title, author, genre } = req.query;
    const query = {};
    if (title) query.title = title;
    if (author) query.author = author;
    if (genre) query.genre = genre;
    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
