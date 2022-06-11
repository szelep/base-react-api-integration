import './App.css';
import { ThemeProvider } from '@mui/material';
import { RouterSwitch } from './routes/RouterSwitch';
import { theme } from './styles/theme';

/**
 * Application root.
 *
 * @returns {App}
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterSwitch />
    </ThemeProvider>
  );
}

export default App;
