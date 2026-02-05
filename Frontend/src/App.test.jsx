import { render, screen } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import App from './App';

test('renders ConfidenSee title', () => {
  render(<App />);
  const titleElement = screen.getByText(/ConfidenSee/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders main navigation', () => {
  render(<App />);
  const featuresLink = screen.getByText(/Features/i);
  const pricingLink = screen.getByText(/Pricing/i);
  const testimonialsLink = screen.getByText(/Testimonials/i);
  expect(featuresLink).toBeInTheDocument();
  expect(pricingLink).toBeInTheDocument();
  expect(testimonialsLink).toBeInTheDocument();
});
