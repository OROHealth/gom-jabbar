import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: 'bold',
    },
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: 'bold',
      },
      label: {
        color: '#B0B0B0',
      },
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
    secondary: { main: '#B0B0B0' },
  },
});
