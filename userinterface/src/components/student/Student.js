import React, { useState } from 'react';
import './Student.css';
import Navbar from '../navbar/Navbar';
import '../navbar/Navbar.css';
import { BASE_URL } from '../../config'

const Student = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    id: '',
    email: '',
    phone: '',
    selectedBooks: [],
  });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [allBooks, setAllBooks] = useState([
    // Initialize with some sample books
    'Book 1',
    'Book 2',
    'Book 3',
    'Book 4',
    'Book 5',
  ]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const isDuplicateId = (id) => {
    return students.some((student) => student.id === id);
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.id && newStudent.email && newStudent.phone) {
      if (isDuplicateId(newStudent.id)) {
        alert('Student with the same ID already exists.');
      } else {
        setStudents([...students, newStudent]);
        setNewStudent({
          name: '',
          id: '',
          email: '',
          phone: '',
          selectedBooks: [],
        });
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const handleEditStudent = (index) => {
    setEditingIndex(index);
    setNewStudent(students[index]);
  };

  const handleUpdateStudent = () => {
    if (newStudent.name && newStudent.id && newStudent.email && newStudent.phone) {
      if (isDuplicateId(newStudent.id)) {
        alert('Student with the same ID already exists.');
      } else {
        const updatedStudents = [...students];
        updatedStudents[editingIndex] = newStudent;
        setStudents(updatedStudents);
        setNewStudent({
          name: '',
          id: '',
          email: '',
          phone: '',
          selectedBooks: [],
        });
        setEditingIndex(-1);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleBookSelection = (e) => {
    const selectedBookName = e.target.value.toLowerCase();
    const selectedBook = allBooks.find((book) => book.toLowerCase() === selectedBookName);
  
    if (selectedBook) {
      if (!newStudent.selectedBooks.includes(selectedBook)) {
        setNewStudent((prevStudent) => ({
          ...prevStudent,
          selectedBooks: [...prevStudent.selectedBooks, selectedBook],
        }));
        setErrorMessage('');
      } else {
        setErrorMessage('Book already selected.');
      }
    } else {
      setErrorMessage('Book not found.');
    }
  };
  

  return (
    <div className="student-page">
      <Navbar />
      <h2>Student Page</h2>

      <div className="student-form">
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          placeholder="Enter student name"
        />
        <input
          type="text"
          name="id"
          value={newStudent.id}
          onChange={handleInputChange}
          placeholder="Enter student ID"
        />
        <input
          type="text"
          name="email"
          value={newStudent.email}
          onChange={handleInputChange}
          placeholder="Enter student email"
        />
        <input
          type="number"
          name="phone"
          value={newStudent.phone}
          onChange={handleInputChange}
          placeholder="Enter student phone"
        />
        <div>
          <label htmlFor="bookSelection">Select Book:</label>
          <input
            type="text"
            id="bookSelection"
            value={newStudent.selectedBook}
            onChange={handleBookSelection}
            placeholder="Enter book title"
          />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>

      {editingIndex === -1 ? (
        <button onClick={handleAddStudent}>Add Student</button>
      ) : (
        <button onClick={handleUpdateStudent}>Update Student</button>
      )}

      <table className="student-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Student Email</th>
            <th>Student Phone</th>
            <th>Selected Books</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.id}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <ul>
                  {student.selectedBooks.map((book, bookIndex) => (
                    <li key={bookIndex}>{book}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => handleDeleteStudent(index)}>Delete</button>
                <button onClick={() => handleEditStudent(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
