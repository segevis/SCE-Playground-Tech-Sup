// frontend/src/pages/HomePage.jsx
import React from 'react';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Our E-Commerce Store!</h1>
      <p>Explore our products, check your receipts, or get support. </p>
      
      <div className="home-images">
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
          alt="Colorful Product 1"
        />
        <img
          src="https://images.unsplash.com/photo-1503602642458-232111445657"
          alt="Colorful Product 2"
        />
        <img
          src="https://images.unsplash.com/photo-1600185365779-cdd964fba85f"
          alt="Colorful Product 3"
        />
      </div>
    </div>
  );
}
