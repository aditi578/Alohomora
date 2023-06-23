import React, { useState } from 'react';
import './Books.css';
import Navbar from '../navbar/Navbar';
import '../navbar/Navbar.css';

const Books = ({ students }) => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

  // Function to handle adding or updating a book
  const addOrUpdateBook = () => {
    if (selectedBookIndex !== null) {
      // Update existing book
      const updatedBook = {
        title,
        author,
        description,
        code,
        genre: selectedGenre,
      };
      const updatedBooks = [...books];
      updatedBooks[selectedBookIndex] = updatedBook;
      setBooks(updatedBooks);
      setSelectedBookIndex(null);
    } else {
      // Add new book
      const newBook = {
        title,
        author,
        description,
        code,
        genre: selectedGenre,
      };
      setBooks([...books, newBook]);
    }
    // Clear form inputs
    setTitle('');
    setAuthor('');
    setDescription('');
    setCode('');
    setSelectedGenre('');
  };

  // Function to handle selecting a genre
  const selectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  // Function to handle deleting a book
  const deleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  // Function to handle editing a book
  const editBook = (index) => {
    const bookToEdit = books[index];
    setTitle(bookToEdit.title);
    setAuthor(bookToEdit.author);
    setDescription(bookToEdit.description);
    setCode(bookToEdit.code);
    setSelectedGenre(bookToEdit.genre);
    setSelectedBookIndex(index);
  };

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

      <div className="buttons">
        <div className="genres-button">
          Genres
          <div className="genres-dropdown">
            {genres.map((genre, index) => (
              <button
                key={index}
                className={selectedGenre === genre ? 'active' : ''}
                onClick={() => selectGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <button className="add-book-button" onClick={addOrUpdateBook}>
          {selectedBookIndex !== null ? 'Update Book' : 'Add Book'}
        </button>
      </div>

      {/* Add Book Form */}
      <div className="add-book-form">
        <h2>{selectedBookIndex !== null ? 'Edit Book' : 'Add Book'}</h2>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Book Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Book Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Book Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="genre-dropdown">
          <label htmlFor="genre-select">Genre:</label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Select Genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* View Books */}
      <div className="table">
        <div className="table-row table-header">
          <div className="table-cell">Book Title</div>
          <div className="table-cell">Book Author</div>
          <div className="table-cell">Book Description</div>
          <div className="table-cell">Book Code</div>
          <div className="table-cell">Genre</div>
          <div className="table-cell">Selected Students</div>
          <div className="table-cell">Actions</div>
        </div>
        <div className="table-body">
          {books.length > 0 ? (
            books.map((book, index) => {
              if (
                selectedGenre === '' ||
                selectedGenre === 'All Books' ||
                selectedGenre === book.genre
              ) {
                // Filter students who have selected the current book
                const selectedStudents = students.filter((student) =>
                  student.selectedBooks.includes(book.title)
                );

                return (
                  <div className="table-row" key={index}>
                    <div className="table-cell">{book.title}</div>
                    <div className="table-cell">{book.author}</div>
                    <div className="table-cell">{book.description}</div>
                    <div className="table-cell">{book.code}</div>
                    <div className="table-cell">{book.genre}</div>
                    <div className="table-cell">
                      <ul>
                        {selectedStudents.map((student, studentIndex) => (
                          <li key={studentIndex}>{student.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="table-cell">
                      <button onClick={() => deleteBook(index)}>Delete</button>
                      <button onClick={() => editBook(index)}>Edit</button>
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
