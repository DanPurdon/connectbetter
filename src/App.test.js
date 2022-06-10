import { render, screen } from '@testing-library/react';
import ConnectBetter from './components/ConnectBetter';

test('renders learn react link', () => {
  render(<ConnectBetter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
