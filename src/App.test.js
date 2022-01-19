import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FX calculator', () => {
  const { getByText } =  render(<App />)
  const headerElement = screen.getByText(/FX Calculator/i)
  expect(headerElement).toBeTruthy()
});
