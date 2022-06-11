import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Stack,
  Typography,
} from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';

/**
 * Application bar right side tools.
 *
 * @returns {ApplicationBarTools}
 */
export function ApplicationBarTools() {
  const {
    username, id, onLogout,
  } = useAuth();

  return (
    <Box sx={{
      display: 'flex',
    }}
    >
      <Stack
        sx={{
          display: {
            xs: 'none',
            sm: 'inline-flex',
          },
        }}
      >
        <Typography fontWeight="bold">
          {username}
        </Typography>
        <Typography variant="caption">
          {id}
        </Typography>
      </Stack>

      <IconButton
        size="large"
        edge="end"
        aria-label="logout"
        color="inherit"
        onClick={onLogout}
      >
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}
