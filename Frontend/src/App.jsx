// frontend/src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import { StoreProvider, StoreContext } from './store/StoreContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css'; // Import the new CSS
import ReportsPage from './pages/ReportsPage.jsx';

function Navbar() {
  const { user, signOut } = useContext(StoreContext);
  const navigate = useNavigate();

  function signUserOut() {
    signOut();
    navigate('/signin');
  }

  // If user exists, create an initial
  const userInitial = user && user.firstName ? user.firstName[0] : user && user.email ? user.email[0] : null;

  return (
    <div className='navbar'>
      <div className='nav-left'>
        {/* University icon (replace with your own image path or URL) */}
        <img
          className='university-icon'
          src='https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png'
          alt='University Icon'
        />
      </div>

      <div className='nav-right'>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          {!user ? <Link to='/signin'>Sign In</Link> : <a onClick={signUserOut}>Sign out</a>}
          <Link to='/signup'>Sign Up</Link>
          <Link to='/products'>Products</Link>
        </div>
        {/* If logged in, show user circle */}
        {user && <div className='user-circle'>{userInitial}</div>}
      </div>
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ backgroundImage: 'url(/background.png)' }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/reports' element={<ReportsPage />} />
            <Route
              path='/products'
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
