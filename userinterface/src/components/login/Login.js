import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegistering) {
        const response = await axios.post('http://localhost:5000/users/register', {
          username,
          email,
          password,
        });
        console.log('Registration successful:', response.data.message);
        // Perform any additional actions after successful registration
      } else {
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
