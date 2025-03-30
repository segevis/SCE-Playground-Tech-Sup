// frontend/src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext.jsx';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(StoreContext);

  if (!token) {
    // If there's no token, redirect to /signin
    return <Navigate to="/signin" replace />;
  }

  return children;
}
