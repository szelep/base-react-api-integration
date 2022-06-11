import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationBarTools } from './ApplicationBarTools';
import { AuthState } from '../../providers/AuthProvider';

it('should render expected icons and username', () => {
  render(
    <AuthState.Provider value={{
      username: 'some-username',
    }}
    >
      <ApplicationBarTools />
    </AuthState.Provider>
  );

  expect(screen.getByTestId('LogoutIcon')).toBeInTheDocument();
  expect(screen.getByText(/some-username/i)).toBeInTheDocument();
});

it('should logout button triggers onLogout of auth provider', async () => {
  const onLogoutMock = jest.fn();

  render(
    <AuthState.Provider value={{
      onLogout: onLogoutMock,
    }}
    >
      <ApplicationBarTools />
    </AuthState.Provider>
  );

  userEvent.click(screen.getByTestId('LogoutIcon'));
  await waitFor(() => {
    expect(onLogoutMock).toBeCalledTimes(1);
  });
});
