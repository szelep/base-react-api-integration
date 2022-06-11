import { responsiveFontSizes } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'light',
  },
}));
