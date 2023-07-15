import React from 'react';
import './Home.css';
import Navbar from '../navbar/Navbar';
import '../navbar/Navbar.css';
import { BASE_URL } from '../../config'

const Home = () => {
  return (
    <div className="container">
      <Navbar /> {/* Render the Navbar component */}
      <h1 className="title">Library Management System</h1>
      <p className="description">
        The Library Management System is a comprehensive solution designed to efficiently organize and keep track of Books and Students. It provides a user-friendly interface for users. This project is made using the MERN stack.
      </p>
      <div className="card-container">
        {/* Student Card */}
        <div className="card">
          <h2 className="card-title">Students</h2>
          <p className="card-description">
            Manage student information and track their borrowing history, including their ID and phone number.
          </p>
        </div>
        {/* Book Card */}
        <div className="card">
          <h2 className="card-title">Books</h2>
          <p className="card-description">
            Organize and categorize books, track availability, and manage loans.
          </p>
        </div>
      </div>
      <footer className="footer">
        <p className="footer-text">
          &copy; 2023 Aditi Rathore and Gunwant Singh - All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Home;
