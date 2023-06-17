import React, { useState } from 'react';
import './Student.css';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    id: '',
    email: '',
    phone: '',
  });

  const [editingIndex, setEditingIndex] = useState(-1);

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
        });
        setEditingIndex(-1);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="student-page">
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
          type="text"
          name="phone"
          value={newStudent.phone}
          onChange={handleInputChange}
          placeholder="Enter student phone"
        />
        {editingIndex === -1 ? (
          <button onClick={handleAddStudent}>Add Student</button>
        ) : (
          <button onClick={handleUpdateStudent}>Update Student</button>
        )}
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Student Email</th>
            <th>Student Phone</th>
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
                <button onClick={() => handleEditStudent(index)}>Edit</button>
                <button onClick={() => handleDeleteStudent(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
