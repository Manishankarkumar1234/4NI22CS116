import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import './index.css'; // Ensure this is minimal or complements MUI

// A more refined dark theme
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7986cb', // A softer, professional blue
      light: '#aab6fe',
      dark: '#49599a',
    },
    secondary: {
      main: '#ce93d8', // A complementary purple
      light: '#ffc4ff',
      dark: '#9c64a6',
    },
    background: {
      default: '#1a1a1a', // Slightly lighter dark background
      paper: '#242424',   // Paper elements background
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // More modern button text
      fontWeight: 600,
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c2c2c', // Darker AppBar for contrast
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2, // Subtle elevation for paper components
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Ensure no conflicting background images from themes
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly more rounded buttons
        }
      }
    }
  },
});

theme = responsiveFontSizes(theme); // Make typography responsive

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* MUI's baseline CSS, adapts to theme mode */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);