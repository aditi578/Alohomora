import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Books from './components/books/Books';
import Navbar from './components/navbar/Navbar';
import Student from './components/student/Student';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/students" element={<Student />} />
      </Routes>
    </div>
  );
};

export default App;