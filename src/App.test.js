import { render, screen } from '@testing-library/react';
import App from './App';

xtest('renders header text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Wanna build an App/i);
  expect(linkElement).toBeInTheDocument();
});
