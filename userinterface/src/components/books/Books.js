import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Books.css';
import Navbar from '../navbar/Navbar';
import { BASE_URL } from '../../config';

const Books = () => {
  // State variables to store book data and form inputs
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    // Fetch books data when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      // Fetch books data from the API
      const response = await axios.get(`${BASE_URL}/books`);
      setBooks(response.data); // Update the books state with the fetched data
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async () => {
    if (title && author && description && code && selectedGenre) {
      const newBook = {
        title,
        author,
        description,
        code,
        genre: selectedGenre,
      };

      try {
        // Send a POST request to add a new book
        const response = await axios.post(`${BASE_URL}/books`, newBook);
        const addedBook = response.data; // Assuming the response contains the added book
        setBooks([...books, addedBook]); // Add the new book to the existing books array
        setTitle('');
        setAuthor('');
        setDescription('');
        setCode('');
        setSelectedGenre('');

        // Fetch the updated books data again
        fetchBooks();
      } catch (error) {
        console.error('Error adding book:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const deleteBook = async (bookId) => {
    try {
      // Send a DELETE request to remove the book
      await axios.delete(`${BASE_URL}/books/${bookId}`);
      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks); // Update the books state after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const editBook = async (bookId) => {
    // Find the book to be edited from the books state
    const bookToEdit = books.find((book) => book._id === bookId);
    if (bookToEdit) {
      setTitle(bookToEdit.title); // Set the form inputs with the book data
      setAuthor(bookToEdit.author);
      setDescription(bookToEdit.description);
      setCode(bookToEdit.code);
      setSelectedGenre(bookToEdit.genre);
      deleteBook(bookId); // Delete the existing book from the backend
    }
  };
  
  // List of genres for the dropdown select
  const genres = [
    'All Books',
    'Adventure',
    'Mystery',
    'Fantasy',
    'Romance',
    'Sci-Fi',
    'History',
    'Poetry',
    'Children',
  ];

  return (
    <div className="books-page">
      <Navbar />
      <h1 className="page-title">Books Page</h1>

      <div className="add-book-form">
        <h2>Add Book</h2>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update the title state on input change
        />
        <input
          type="text"
          placeholder="Book Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)} // Update the author state on input change
        />
        <input
          type="text"
          placeholder="Book Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update the description state on input change
        />
        <input
          type="text"
          placeholder="Book Code"
          value={code}
          onChange={(e) => setCode(e.target.value)} // Update the code state on input change
        />
        <div className="genre-dropdown">
          <label htmlFor="genre-select">Genre:</label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)} // Update the selectedGenre state on select change
          >
            <option value="">Select Genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <button className="add-book-button" onClick={addBook}>
          Add Book
        </button>
      </div>

      <div className="table2">
        <div className="table-row2 table-header">
          <div className="table-cell2">Book Title</div>
          <div className="table-cell2">Book Author</div>
          <div className="table-cell2">Book Description</div>
          <div className="table-cell2">Book Code</div>
          <div className="table-cell2">Genre</div>
          <div className="table-cell2">Actions</div>
        </div>
        <div className="table-body2">
          {books.length > 0 ? (
            books.map((book) => {
              if (
                selectedGenre === '' ||
                selectedGenre === 'All Books' ||
                selectedGenre === book.genre
              ) {
                return (
                  <div className="table-row" key={book._id}>
                    <div className="table-cell3">{book.title}</div>
                    <div className="table-cell3">{book.author}</div>
                    <div className="table-cell3">{book.description}</div>
                    <div className="table-cell3">{book.code}</div>
                    <div className="table-cell3">{book.genre}</div>
                    <div className="table-cell3">
                      <button onClick={() => deleteBook(book._id)}>Delete</button>
                      <button onClick={() => editBook(book._id)}>Edit</button>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
