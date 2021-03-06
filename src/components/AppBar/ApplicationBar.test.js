import {
  render,
  screen,
} from '@testing-library/react';
import React from 'react';
import { ApplicationBar } from './ApplicationBar';
import { AuthState } from '../../providers/AuthProvider';

jest.mock('./ApplicationBarTools', () => ({
  ApplicationBarTools: () => <p>ApplicationBarTools component</p>,
}));

it('should render expected elements', () => {
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthState.Provider value={{ authenticated: true }}>
      <ApplicationBar />
    </AuthState.Provider>
  );

  expect(screen.getByText(/applicationbartools component/i)).toBeInTheDocument();
  expect(screen.getByText(/base react/i)).toBeInTheDocument();
  expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
});

it('should render empty string on unauthenticated user', () => {
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthState.Provider value={{ authenticated: false }}>
      <div data-testid="empty">
        <ApplicationBar />
      </div>
    </AuthState.Provider>
  );

  expect(screen.getByTestId('empty')).toHaveTextContent('');
});
