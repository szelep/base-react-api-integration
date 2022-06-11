import {
  render,
  screen,
} from '@testing-library/react';
import { RouterSwitch } from './RouterSwitch';
import { AuthState } from '../providers/AuthProvider';

jest.mock('../pages/Login', () => ({
  Login: () => <p>Login page</p>,
}));

jest.mock('../pages/Dashboard', () => ({
  Dashboard: () => <p>Dashboard page</p>,
}));

it('should render default login page for unauthenticated', () => {
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthState.Provider value={{
      authenticated: false,
      hasRole: () => false,
    }}
    >
      <RouterSwitch />
    </AuthState.Provider>
  );

  expect(screen.getByText(/login page/i)).toBeInTheDocument();
});

it('should render default dashboard page for authenticated', () => {
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthState.Provider value={{
      authenticated: true,
      hasRole: () => true,
    }}
    >
      <RouterSwitch />
    </AuthState.Provider>
  );

  expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
});
