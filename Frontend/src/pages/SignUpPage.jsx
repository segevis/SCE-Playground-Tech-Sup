// frontend/src/pages/SignUpPage.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext.jsx';
import api from '../services/api.js';

export default function SignUpPage() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: ''
  });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    console.log("Submit sign up", JSON.stringify(form));
    
    try {
      // Sign up the user
      const response = await api.post('/auth/signup', form);
      // After sign-up, optionally auto-sign them in
      const signInResponse = await api.post('/auth/signin', {
        email: form.email,
        password: form.password
      });
      const { token } = signInResponse.data;
      const userData = {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName
      };
      signIn(userData, token);

      navigate('/products');
    } catch (err) {
      console.log("errror occured", err);
      setError(err.response?.data?.message || 'Sign up failed');
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            name="email"
            value={form.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            name="password"
            value={form.password}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>First Name: </label>
          <input 
            type="text" 
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input 
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth: </label>
          <input 
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
