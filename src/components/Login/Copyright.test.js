import {
  render,
  screen,
} from '@testing-library/react';
import { Copyright } from './Copyright';

it('should render expected copyright', () => {
  render(
    <Copyright />
  );

  expect(screen.getByText(/copyright/i)).toBeInTheDocument();
});
