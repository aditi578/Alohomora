import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isLoginPage = window.location.pathname === '/login';

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="navbar" style={isLoginPage ? {display: 'none'} : {}}>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/students" className="navbar-link">
            Students
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/books" className="navbar-link">
            Books
          </Link>
        </li>
        <li className="navbar-item">
          <button onClick={toggleMode}>
            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
