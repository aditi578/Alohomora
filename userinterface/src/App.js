import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Books from './components/books/Books';
import Student from './components/student/Student';
import Home from './components/home/Home';
import { BASE_URL } from './config';


const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/books" element={<Books />} />
        <Route path="/students" element={<Student />} />
      </Routes>
    </div>
  );
};

export default App;