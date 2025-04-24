// frontend/src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(StoreContext);
  console.log('user', user);

  return (
    <div className='home-container'>
      <h1>Hi {user && user.firstName}!Welcome to SCE Software Ltd.</h1>
      <p>Explore our products, check your receipts, or get support. </p>

      <div className='home-images'>
        <img src='/reports.jpg' alt='Colorful Product 1' onClick={() => navigate('/reports')} />
      </div>
    </div>
  );
}
