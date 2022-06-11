import { render } from '@testing-library/react';
import { AuthState } from '../providers/AuthProvider';
import { Logout } from './Logout';

it('should invoke onLogout immediately', () => {
  const onLogoutMock = jest.fn();
  render(
    <AuthState.Provider value={{ onLogout: onLogoutMock }}>
      <Logout />
    </AuthState.Provider>
  );

  expect(onLogoutMock).toBeCalledTimes(1);
});
