import React from 'react'
import ReactDOM from 'react-dom'
import {} from 'dotenv/config'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import './assets/scss/shortcut.scss'
import './assets/css/root.css'
import { ToastContainer } from 'react-toastify'
import App from './pages/App'
import store from './store'
import { Provider } from "react-redux"

// import MUI component
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#AF2E1C'
    }
  }
})

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

theme.typography.subtitle2 = {
  ...theme.typography.subtitle2,
  fontFamily: "Avenir",
  color: 'var(--subtitle-alternate)'
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer position="top-right" />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
