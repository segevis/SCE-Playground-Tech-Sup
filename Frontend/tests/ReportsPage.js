// HomePage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportsPage from '../src/pages/ReportsPage.jsx';
import { Router } from 'react-router-dom';

describe('HomePage', () => {
  test('Renders the welcome message', () => {
    render(
      <Router>
        <ReportsPage />
      </Router> 
    );
    // screen is your access point to the rendered DOM
    expect(screen.getByText('Reports Page')).toBeInTheDocument();
  });
});
