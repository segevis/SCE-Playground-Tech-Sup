// frontend/src/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Example fetch from the gateway
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products'); 
        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} - ${p.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
