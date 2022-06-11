import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';

/**
 * Authentication form.
 *
 * @param {object} props - root props
 * @param {boolean} props.disabled - is form disabled
 * @param {string|null} props.errorMessage - error message to display, if provided
 * @param {object} props.formControl - react-hook-form control object
 * @param {Function} props.handleSubmit - onSubmit handler.
 * @returns {LoginForm}
 */
export function LoginForm({
  disabled, errorMessage, formControl, handleSubmit,
}) {
  return (
    <Box
      sx={{
        mt: 5,
        width: '100%',
      }}
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Controller
        rules={{
          required: {
            value: true,
            message: 'This field must be filled.',
          },
        }}
        name="username"
        control={formControl}
        render={({
          field, fieldState: {
            error,
          },
        }) => (
          <TextField
            disabled={disabled}
            error={!!error}
            helperText={error?.message}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete={null}
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        rules={{
          required: {
            value: true,
            message: 'This field must be filled.',
          },
        }}
        name="password"
        control={formControl}
        render={({
          field, fieldState: {
            error,
          },
        }) => (
          <TextField
            disabled={disabled}
            error={!!error}
            helperText={error?.message}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...field}
          />
        )}
      />

      {errorMessage && (
        <Alert variant="outlined" severity="error">{errorMessage}</Alert>
      )}

      <Button
        disabled={disabled}
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          borderRadius: 0,
        }}
      >
        Log in
      </Button>
    </Box>
  );
}

LoginForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formControl: PropTypes.instanceOf(Object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
};

LoginForm.defaultProps = {
  errorMessage: null,
};
