import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../client/App';

describe('App', function () {

  
  test('should display hello world', function () {
    render(<App />);
    expect(screen.getByText('Hello world')).toBeTruthy();
  });
});