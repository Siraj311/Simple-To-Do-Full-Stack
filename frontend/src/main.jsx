import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthProvider';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={2000} />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
