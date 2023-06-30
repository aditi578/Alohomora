import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css';
import Navbar from '../navbar/Navbar';
import { BASE_URL } from '../../config';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    studentId: '',
    email: '',
    mobileNumber: '',
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const isDuplicateId = (id) => {
    return students.some((student) => student.studentId === id);
  };

  const handleAddStudent = async () => {
    if (newStudent.name && newStudent.studentId && newStudent.email && newStudent.mobileNumber) {
      if (isDuplicateId(newStudent.studentId)) {
        alert('Student with the same ID already exists.');
      } else {
        try {
          const response = await axios.post(`${BASE_URL}/students`, newStudent);
          const addedStudent = response.data;
          setStudents([...students, addedStudent]);
          setNewStudent({
            name: '',
            studentId: '',
            email: '',
            mobileNumber: '',
          });
        } catch (error) {
          console.error('Error adding student:', error);
        }
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`${BASE_URL}/students/${studentId}`);
      const updatedStudents = students.filter((student) => student.studentId !== studentId);
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEditStudent = (index) => {
    setEditingIndex(index);
    const editedStudent = students[index];
    setNewStudent({
      name: editedStudent.name,
      studentId: editedStudent.studentId,
      email: editedStudent.email,
      mobileNumber: editedStudent.mobileNumber,
    });
  };
  
  const handleUpdateStudent = async () => {
    if (newStudent.name && newStudent.studentId && newStudent.email && newStudent.mobileNumber) {
      if (!isDuplicateId(newStudent.studentId)) {
        try {
          const response = await axios.put(
            `${BASE_URL}/students/${newStudent.studentId}`,
            newStudent
          );
          const updatedStudent = response.data;
          const updatedStudents = [...students];
          updatedStudents[editingIndex] = updatedStudent;
          setStudents(updatedStudents);
          setNewStudent({
            name: '',
            studentId: '',
            email: '',
            mobileNumber: '',
          });
          setEditingIndex(-1);
        } catch (error) {
          console.error('Error updating student:', error);
        }
      } else {
        alert('Student with the same ID already exists.');
      }
    } else {
      alert('Please fill in all fields.');
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
          placeholder="Name"
        />
        <input
          type="text"
          name="studentId"
          value={newStudent.studentId}
          onChange={handleInputChange}
          placeholder="Student ID"
        />
        <input
          type="email"
          name="email"
          value={newStudent.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="mobileNumber"
          value={newStudent.mobileNumber}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        {editingIndex === -1 ? (
          <button onClick={handleAddStudent}>Add Student</button>
        ) : (
          <button onClick={handleUpdateStudent}>Update Student</button>
        )}
      </div>

      <div className="student-list">
        <h3>Students</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.studentId}>
                <td>{student.name}</td>
                <td>{student.studentId}</td>
                <td>{student.email}</td>
                <td>{student.mobileNumber}</td>
                <td>
                  <button onClick={() => handleEditStudent(index)}>Edit</button>
                  <button onClick={() => handleDeleteStudent(student.studentId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
