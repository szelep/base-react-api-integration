import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Button } from '@mui/material';
import userEvent from '@testing-library/user-event';
import {
  AuthProvider,
  AuthState,
} from './AuthProvider';
import { sessionService } from '../services/storageService';
import { requestService } from '../services/requestService';

jest.mock('../services/storageService');
jest.mock('../services/requestService');

it('should provide authenticated user data and functions', () => {
  const data = {
    username: 'test-user',
    roles: ['ROLE_ADMIN'],
    token: 'ey.token',
  };
  sessionService.get.mockImplementation((key) => data[key]);

  render(
    <AuthProvider>
      <AuthState.Consumer>
        {(state) => (
          <div>
            {expect(state.authenticated).toStrictEqual(true)}
            {expect(state.username).toStrictEqual('test-user')}
            {expect(state.roles).toStrictEqual(['ROLE_ADMIN'])}
            {expect(state.token).toStrictEqual('ey.token')}
            {expect(state.onLogin).toBeDefined()}
            {expect(state.onLogout).toBeDefined()}
            {expect(state.onUpdate).toBeDefined()}
          </div>
        )}
      </AuthState.Consumer>
    </AuthProvider>
  );
});

it('should provide default unknown values for unauthenticated user', () => {
  sessionService.get.mockImplementation(() => null);

  render(
    <AuthProvider>
      <AuthState.Consumer>
        {(state) => (
          <div>
            {expect(state.authenticated).toStrictEqual(false)}
            {expect(state.username).toStrictEqual(null)}
            {expect(state.roles).toStrictEqual([])}
            {expect(state.token).toStrictEqual(null)}
          </div>
        )}
      </AuthState.Consumer>
    </AuthProvider>
  );
});

it('should clear cache onLogout invoke', async () => {
  render(
    <AuthProvider>
      <AuthState.Consumer>
        {({ onLogout }) => (
          <div>
            <Button onClick={() => onLogout()}>Trigger onLogout</Button>
          </div>
        )}
      </AuthState.Consumer>
    </AuthProvider>
  );

  userEvent.click(screen.getByRole('button', { name: /trigger onlogout/i }));

  await waitFor(() => {
    expect(sessionService.clear).toBeCalled();
  });
});

it('should write updated values to session', async () => {
  render(
    <AuthProvider>
      <AuthState.Consumer>
        {({ onUpdate }) => (
          <div>
            <Button onClick={() => onUpdate({
              firstName: 'test',
              lastName: 'test2',
            })}
            >
              Trigger onUpdate
            </Button>
          </div>
        )}
      </AuthState.Consumer>
    </AuthProvider>
  );

  userEvent.click(screen.getByRole('button', { name: /trigger onupdate/i }));

  await waitFor(() => {
    expect(sessionService.write).toBeCalledWith({
      firstName: 'test',
      lastName: 'test2',
    });
  });
});

it('should invoke onFailure action on bad request response', async () => {
  const onFailureFuncMock = jest.fn();
  render(
    <AuthProvider>
      <AuthState.Consumer>
        {({ onLogin }) => (
          <div>
            <Button onClick={() => onLogin('user', 'password', jest.fn(), onFailureFuncMock)}>
              Trigger onLogin
            </Button>
          </div>
        )}
      </AuthState.Consumer>
    </AuthProvider>
  );

  requestService.post.mockRejectedValue();

  userEvent.click(screen.getByRole('button', { name: /trigger onlogin/i }));

  await waitFor(() => {
    expect(onFailureFuncMock).toBeCalled();
  });
});

it('should invoke onSuccess on request success and write decoded JWT to session', async () => {
  const onSuccessMock = jest.fn();
  render(
    <AuthProvider>
      <AuthState.Consumer>
        {({ onLogin }) => (
          <div>
            <Button onClick={() => onLogin('SOME-USER', 'password', onSuccessMock)}>
              Trigger onLogin
            </Button>
          </div>
        )}
      </AuthState.Consumer>
    </AuthProvider>
  );

  requestService.post.mockReturnValue({
    data: {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.'
        + 'eyJmaXJzdE5hbWUiOiJuYW1lIiwidXNlcm5hbWUiOiJ1c2VyMSJ9.2hzvDH-UVSbjAjCip3FCBD5D08UndJltYWZWodnbIOc',
      refresh_token: 'xx',
    },
  });

  userEvent.click(screen.getByRole('button', { name: /trigger onlogin/i }));

  await waitFor(() => {
    expect(onSuccessMock).toBeCalled();
  });
  await waitFor(() => {
    expect(sessionService.write).toBeCalledWith({
      firstName: 'name',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.'
        + 'eyJmaXJzdE5hbWUiOiJuYW1lIiwidXNlcm5hbWUiOiJ1c2VyMSJ9.2hzvDH-UVSbjAjCip3FCBD5D08UndJltYWZWodnbIOc',
      username: 'user1',
    });
  });
});
