import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/root.css'
import App from './pages/App';
import store from './store'
import { Provider } from "react-redux";
import { Notifications } from 'react-push-notification'

// import MUI component
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme()

theme.typography.h1 = {
  ...theme.typography.h1,
  fontFamily: "Times New Roman"
}

theme.typography.h2 = {
  ...theme.typography.h2,
  fontFamily: "Times New Roman"
}

theme.typography.subtitle1 = {
  ...theme.typography.subtitle1,
  fontFamily: "Avenir"
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Notifications />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
