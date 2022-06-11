import {
  render,
  screen,
} from '@testing-library/react';
import App from './App';

jest.mock('./routes/RouterSwitch', () => ({
  RouterSwitch: () => 'routerswitch component',
}));

test('renders router switch', () => {
  render(<App />);

  expect(screen.getByText(/routerswitch component/i)).toBeInTheDocument();
});
