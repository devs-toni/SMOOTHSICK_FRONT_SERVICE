import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalProvider } from './context/GlobalContext'
import { LanguageProvider } from './context/LanguageContext'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import 'flowbite';
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <LanguageProvider>
      <GlobalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalProvider>
    </LanguageProvider>
  </AuthProvider>
)
