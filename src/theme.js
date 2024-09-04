// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Set the theme mode to dark
    primary: {
      main: '#90caf9', // Light blue for primary elements
    },
    secondary: {
      main: '#f48fb1', // Pink for secondary elements
    },
    background: {
      default: '#121212', // Dark background color
      paper: '#1e1e1e', // Slightly lighter for components
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0bec5', // Grey text for secondary content
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontSize: '1.5rem',
      color: '#ffffff', // White text for headers
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
    body1: {
      fontSize: '0.875rem',
      color: '#ffffff', // White text for body
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#90caf9', // Primary color for buttons
          color: '#121212',
          '&:hover': {
            backgroundColor: '#64b5f6', // Slightly darker on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // Dark background for AppBar
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // Dark background for Paper components
          color: '#ffffff', // White text on Paper components
        },
      },
    },
  },
});

export default theme;

