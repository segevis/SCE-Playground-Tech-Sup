// frontend/src/pages/SignInPage.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext.jsx';
import api from '../services/api.js';

export default function SignInPage() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post('/auth/signin', { email, password });
      const { token } = response.data;
      // You might want to decode token or fetch user data from /profile
      const userData = { email }; 
      signIn(userData, token);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign in failed');
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            type="email"
            value={email} 
            onChange={e => setEmail(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password"
            value={password} 
            onChange={e => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
