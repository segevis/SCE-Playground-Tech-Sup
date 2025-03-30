// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import { AuthProvider } from './store/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  console.log("Render app");
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={{ padding: '1rem', background: '#eee' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/signin">Sign In</Link> |{' '}
          <Link to="/signup">Sign Up</Link> |{' '}
          <Link to="/products">Products</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
