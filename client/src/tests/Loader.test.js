import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from '../components/Loader.jsx';

describe('Loader Component', () => {
  test('should render loading text', () => {
    render(<Loader />);
    expect(screen.getByText('Loading intelligence data')).toBeInTheDocument();
  });

  test('should have correct CSS class', () => {
    render(<Loader />);
    const loaderElement = screen.getByText('Loading intelligence data');
    expect(loaderElement).toHaveClass('loader');
  });
});
