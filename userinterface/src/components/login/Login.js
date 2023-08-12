import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
  // State variables to store form input values and registration mode
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); // Update the username state on input change
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Update the password state on input change
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update the email state on input change
  };

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering); // Toggle the registration mode
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegistering) {
        // Registration form submission
        const response = await axios.post('http://localhost:5000/users/register', {
          username,
          email,
          password,
        });
        console.log('Registration successful:', response.data.message);
        // Perform any additional actions after successful registration
      } else {
        // Login form submission
        const response = await axios.post('http://localhost:5000/users/login', {
          username,
          password,
        });
        console.log('Login successful:', response.data.message);
        // Perform any additional actions after successful login
      }
    } catch (error) {
      console.error('Authentication error:', error.response.data.error);
      // Handle authentication error
    }
  };

  return (
    <div className="login-container">
      <form className="login" onSubmit={handleSubmit}>
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
        />
        {isRegistering && (
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
        )}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        <p>
          {isRegistering
            ? 'Already have an account?'
            : "Don't have an account?"}
          <button type="button" onClick={handleToggleMode}>
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
