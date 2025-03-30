// frontend/src/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    return <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>Products</h2>
      {products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No products found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: '0', marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {products.map((p) => (
            <li key={p.id} style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '1rem', width: '200px', textAlign: 'center' }}>
              <strong>{p.name}</strong>
              <div>${p.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
