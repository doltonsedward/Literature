import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/root.css'
import App from './pages/App';

// import MUI component
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme()

theme.typography.h1 = {
  ...theme.typography.h1,
  fontFamily: "Avenir"
}

theme.typography.subtitle1 = {
  ...theme.typography.subtitle1,
  fontFamily: "Avenir"
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
