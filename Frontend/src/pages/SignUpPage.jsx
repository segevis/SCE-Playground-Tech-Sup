// frontend/src/pages/SignUpPage.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext.jsx';
import api from '../services/api.js';

export default function SignUpPage() {
  const { signIn } = useContext(StoreContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await api.post('/auth/signup', form);

      // Then sign in automatically
      const signInResponse = await api.post('/auth/signin', {
        email: form.email,
        password: form.password
      });
      const { token } = signInResponse.data;
      const userData = {
        email: form.email,
        firstName: form.firstName
      };
      signIn(userData, token);

      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed');
    }
  }

  return (
    <div className='auth-container'>
      <img
        className='university-icon'
        src='https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png'
        alt='University Icon'
      />
      <h3>Sign Up</h3>
      {error && <p className='error-message'>{error}</p>}

      <form className='auth-form' onSubmit={handleSubmit}>
        <div>
          <input type='email' name='email' placeholder='Email' value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <input type='password' name='password' placeholder='Password' value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <input type='text' name='firstName' placeholder='First Name' value={form.firstName} onChange={handleChange} />
        </div>
        <div>
          <input type='text' name='lastName' placeholder='Last Name' value={form.lastName} onChange={handleChange} />
        </div>

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}
