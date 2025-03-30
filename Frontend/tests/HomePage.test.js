// HomePage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../src/pages/HomePage.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('HomePage', () => {
  test('renders the welcome message', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    // screen is your access point to the rendered DOM
    expect(screen.getByText('Welcome to SCE Software Ltd.')).toBeInTheDocument();
  });
});
