 import { createRoot } from 'react-dom/client'
import App from './App.jsx'
 import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/index.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider >
)
