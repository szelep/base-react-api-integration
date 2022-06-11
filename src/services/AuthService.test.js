import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { authService } from './authService';
import { sessionService } from './storageService';
import { API_ROUTES } from '../constants/ApiRoutes';

jest.mock('./storageService');

it('should retrieve user data from session', () => {
  const data = {
    username: 'test-user',
    roles: ['ROLE_ADMIN'],
    token: 'ey.token',
  };
  sessionService.get.mockImplementation((key) => data[key]);
  const retrievedData = authService.retrieveUser();

  expect(retrievedData).toHaveProperty('authenticated', true);
  expect(retrievedData).toHaveProperty('username', 'test-user');
  expect(retrievedData).toHaveProperty('roles', ['ROLE_ADMIN']);
  expect(retrievedData).toHaveProperty('token', 'ey.token');
});

it('should invoke onSuccess on request success', async () => {
  const onSuccessMock = jest.fn();
  const onFailureMock = jest.fn();

  const mock = new MockAdapter(axios);
  mock
    .onPost(API_ROUTES.authentication)
    .reply(200, {
      username: 'test-user',
    });

  authService.handleLogin('test', 'test', onSuccessMock, onFailureMock);

  await waitFor(() => {
    expect(onSuccessMock).toBeCalledWith({ username: 'test-user' });
  });
  await waitFor(() => {
    expect(onFailureMock).toBeCalledTimes(0);
  });
});

it('should invoke onFailure on request fail', async () => {
  const onSuccessMock = jest.fn();
  const onFailureMock = jest.fn();

  const mock = new MockAdapter(axios);
  mock
    .onPost(API_ROUTES.authentication)
    .reply(400);

  authService.handleLogin('test', 'test', onSuccessMock, onFailureMock);

  await waitFor(() => {
    expect(onSuccessMock).toBeCalledTimes(0);
  });
  await waitFor(() => {
    expect(onFailureMock).toBeCalledTimes(1);
  });
});
