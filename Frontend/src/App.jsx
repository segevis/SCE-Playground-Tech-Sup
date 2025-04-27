// frontend/src/App.jsx
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import TechSupportPage from './pages/TechSupportPage.jsx';
import { StoreProvider, StoreContext } from './store/StoreContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css'; // Import the new CSS
import ReportsPage from './pages/ReportsPage.jsx';
import TechSupport from './pages/TechSupportPage.jsx';

function Navbar() {
  const { user, signOut, isLoading, isValidating } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isValidating && !user) {
      console.log('No valid user found after validation. Redirecting to /signin');
      navigate('/signin');
    }
  }, [isLoading, isValidating, user, navigate]);

  function signUserOut() {
    signOut();
    navigate('/signin');
  }

  const userInitial = user && user.firstName ? user.firstName[0] : user && user.email ? user.email[0] : null;

  // While loading/validating, you can show a spinner or skeleton here
  if (isLoading || isValidating) {
    return (
      <div className='navbar'>
        <div className='nav-left'>
          <img
            className='university-icon'
            src='https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png'
            alt='University Icon'
          />
        </div>
        <div className='nav-right'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='navbar'>
      <div className='nav-left'>
        <img
          className='university-icon'
          src='https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png'
          alt='University Icon'
        />
      </div>

      <div className='nav-right'>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/products'>Products</Link>
          {!user ? (
            <div className='nav-links'>
              <Link to='/signin'>Sign In</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
          ) : (
            <a onClick={signUserOut}>Sign out</a>
          )}
        </div>
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
            <Route path='/techsupport' element={<TechSupportPage />} />
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
