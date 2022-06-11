import {
  render,
  screen,
} from '@testing-library/react';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';
import { LoginForm } from './Login.form';

/**
 * Wrapped component.
 *
 * @param {object} props - root props
 * @param {Function} props.submitHandler - submit handler
 * @param {string|null} props.errorMessage - error message
 * @returns {WrappedComponent}
 */
function WrappedComponent({
  submitHandler,
  errorMessage,
}) {
  const {
    control,
  } = useForm({
    defaultValues: {
      username: 'admin',
      password: 'pass',
    },
  });
  return (
    <LoginForm
      formControl={control}
      handleSubmit={submitHandler}
      disabled={false}
      errorMessage={errorMessage}
    />
  );
}

WrappedComponent.propTypes = {
  submitHandler: PropTypes.func,
  errorMessage: PropTypes.string,
};
WrappedComponent.defaultProps = {
  submitHandler: jest.fn(),
  errorMessage: null,
};

it('should render form with expected fields', () => {
  render(
    <WrappedComponent />
  );

  expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
});

it('should submit button trigger submit handler', async () => {
  const submitHandlerMock = jest.fn((e) => e.preventDefault());
  render(
    <WrappedComponent submitHandler={submitHandlerMock} />
  );

  await userEvent.click(screen.getByRole('button', { name: /log in/i }));

  expect(submitHandlerMock).toBeCalledTimes(1);
});

it('should render error message', () => {
  render(
    <WrappedComponent errorMessage="Error!" />
  );

  expect(screen.getByText(/error!/i)).toBeInTheDocument();
});
