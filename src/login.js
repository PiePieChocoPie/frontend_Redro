import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/login.css'; 
function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      login: login,
      password: password
    };

    try {
      const response = await axios.post('http://192.168.90.7:3000/api/auth/customer-login', data);
      const userData = response.data.payload.user;
      const token = response.data.payload.token.accessToken;

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      navigate('/product');
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Login:
            <input type="text" value={login} onChange={handleLoginChange} required />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;