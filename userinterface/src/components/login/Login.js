import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlemailchange = (event) => {
    setEmail(event.target.value);
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  
  const login = (event) => {
    event.preventDefault();
    // Perform login logic
    console.log('Login:', username, password);
  };

  const register = (event) => {
    event.preventDefault();
    // Perform registration logic
    console.log('Register:', username, email,password);
  };

  return (
    <div className="login-container">
      <form className='login'>
        <h1>Login</h1>
        <input type='text' placeholder='username' value={username} onChange={handleUsernameChange}/>
        <input type='password' placeholder='password' value={password} onChange={handlePasswordChange}/>
        <button onClick={login}>Login</button>
      </form>

      <form className='register'>
        <h1>Register</h1>
        <input type='text' placeholder='username' value={username} onChange={handleUsernameChange}/>
        <input type='email' placeholder='email' value={email} onChange={handlemailchange}/>
        <input type='password' placeholder='password' value={password} onChange={handlePasswordChange}/>
      
        <button onClick={register}>Register</button>
      </form>
    </div>
  );
}

export default Login;
