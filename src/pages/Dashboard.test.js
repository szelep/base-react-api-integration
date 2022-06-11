import {
  render,
  screen,
} from '@testing-library/react';
import { Dashboard } from './Dashboard';

it('should render hello text', () => {
  render(
    <Dashboard />
  );

  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});
