import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../providers/AuthProvider';
import { ApplicationBarTools } from './ApplicationBarTools';

/**
 * Application header toolbar.
 *
 * @returns {ApplicationBar|string} - empty string is returned for unauthenticated access
 */
export function ApplicationBar() {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return '';
  }

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open application drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: {
            xs: 'none',
            sm: 'block',
          } }}
        >
          Base React App integrated with API
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ApplicationBarTools />
      </Toolbar>
    </AppBar>
  );
}
