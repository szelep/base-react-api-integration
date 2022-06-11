import {
  render,
  screen,
} from '@testing-library/react';
import {
  BrowserRouter,
  MemoryRouter,
} from 'react-router-dom';
import { GoBackNavigate } from './GoBackNavigate';
import { AuthState } from '../providers/AuthProvider';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  // eslint-disable-next-line react/prop-types
  Navigate: ({ to }) => {
    if (typeof to === 'string') {
      return <p>to</p>;
    }

    return (
      <>
        {/* eslint-disable-next-line react/prop-types */}
        <p>{`pathname: ${to.pathname}`}</p>
        {/* eslint-disable-next-line react/prop-types */}
        <p>{`search: ${to.search}`}</p>
      </>
    );
  },
}));

it('should return navigate without back_to for authenticated', () => {
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthState.Provider value={{ authenticated: true }}>
      <BrowserRouter>
        <GoBackNavigate to="/some-route" />
      </BrowserRouter>
    </AuthState.Provider>
  );

  expect(screen.getByText(/pathname: \/some-route/i)).toBeInTheDocument();
  expect(screen.getByText(/search: undefined/i)).toBeInTheDocument();
});

it('should append back_to to url for unauthenticated', () => {
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthState.Provider value={{ authenticated: false }}>
      <MemoryRouter
        initialEntries={[
          '/some-auth-page',
        ]}
      >
        <GoBackNavigate to="/unauthorized-page" />
      </MemoryRouter>
    </AuthState.Provider>
  );

  expect(screen.getByText(/pathname: \/unauthorized-page/i)).toBeInTheDocument();
  expect(screen.getByText(/search: back_to=%2fsome-auth-page/i)).toBeInTheDocument();
});

it('should back_to search part be converted to pathname for authenticated', () => {
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthState.Provider value={{ authenticated: true }}>
      <MemoryRouter
        initialEntries={[
          `/test?back_to=${encodeURIComponent('/redirect-here-after-auth')}`,
        ]}
      >
        <GoBackNavigate to="/original-url" />
      </MemoryRouter>
    </AuthState.Provider>
  );

  expect(screen.getByText(/pathname: \/redirect-here-after-auth/i)).toBeInTheDocument();
  expect(screen.getByText(/search: undefined/i)).toBeInTheDocument();
});

it('should navigate to orignal "to" path if back_to contains restricted word', () => {
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthState.Provider value={{ authenticated: true }}>
      <MemoryRouter
        initialEntries={[
          `/test?back_to=${encodeURIComponent('/login')}`,
        ]}
      >
        <GoBackNavigate to="/original-page" />
      </MemoryRouter>
    </AuthState.Provider>
  );

  expect(screen.getByText(/pathname: \/original-page/i)).toBeInTheDocument();
  expect(screen.getByText(/search: undefined/i)).toBeInTheDocument();
});
