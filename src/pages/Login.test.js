import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './Login';
import { AuthState } from '../providers/AuthProvider';

jest.mock('../components/Login/Login.form', () => ({
  __esModule: true,
  LoginForm: ({
    // eslint-disable-next-line react/prop-types
    handleSubmit, errorMessage,
  }) => (
    <div>
      <p>LoginForm component</p>
      <p>
        {`Error:${errorMessage || 'empty'}`}
      </p>
      <button type="button" data-testid="handler" onClick={handleSubmit}>handleSubmit</button>
    </div>
  ),
}));

it('should render page with expected components', () => {
  render(
    <Login />
  );

  expect(screen.getByRole('heading', { name: /log in/i })).toBeInTheDocument();
  expect(screen.getByText(/loginform component/i)).toBeInTheDocument();
});

it('should render error message after onLogin failure response', async () => {
  render(
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthState.Provider value={{ onLogin: async (
      username,
      password,
      success,
      failure
    ) => { failure(); } }}
    >
      <Login />
    </AuthState.Provider>
  );
  userEvent.click(screen.getByTestId('handler'));

  await waitFor(() => {
    expect(screen.getByText(/Error:Invalid credentials/i)).toBeInTheDocument();
  });
});

it('should error be null on onLogin success', async () => {
  render(
    <AuthState.Provider value={{
      onLogin: async (
        username,
        password,
        success,
      ) => {
        success();
      },
    }}
    >
      <Login />
    </AuthState.Provider>
  );
  userEvent.click(screen.getByTestId('handler'));

  await waitFor(() => {
    expect(screen.getByText(/Error:empty/i)).toBeInTheDocument();
  });
});
