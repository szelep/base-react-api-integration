import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { LinearProgress } from '@mui/material';
import { Copyright } from '../components/Login/Copyright';
import { useAuth } from '../providers/AuthProvider';
import { LoginForm } from '../components/Login/Login.form';

/**
 * Login page component.
 *
 * @returns {Login}
 */
export function Login() {
  const [state, setState] = useState({
    submitted: false,
    error: null,
  });

  const { onLogin } = useAuth();
  const {
    control, handleSubmit,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async ({
    username, password,
  }) => {
    setState((s) => ({
      ...s,
      submitted: true,
    }));

    const handleFailure = () => {
      setState((s) => ({
        ...s,
        submitted: false,
        error: 'Invalid credentials.',
      }));
    };

    const handleSuccess = () => {
      setState((s) => ({
        ...s,
        error: null,
      }));
    };

    await onLogin(
      username,
      password,
      handleSuccess,
      handleFailure
    );
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: '100vh' }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
      />

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{
            m: 1,
            backgroundColor: 'primary.main',
          }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>

          <LoginForm
            disabled={state.submitted}
            handleSubmit={handleSubmit(onSubmit)}
            formControl={control}
            errorMessage={state.error}
          />

          {state.submitted && (
            <LinearProgress sx={{ mb: 2 }} />
          )}

          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
