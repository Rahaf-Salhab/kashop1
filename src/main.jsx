 import { createRoot } from 'react-dom/client'
import App from './App.jsx'
 import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/index.js'
import { ToastContainer} from 'react-toastify';
import './index.css'
import ThemeContextProvider from './context/ThemeContext.jsx';
 
createRoot(document.getElementById('root')).render(
       <>
        <ThemeContextProvider >
        <App />
       <ToastContainer />
      </ThemeContextProvider >
  </>
 
)
