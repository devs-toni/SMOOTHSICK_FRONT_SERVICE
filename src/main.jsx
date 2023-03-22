import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './index'
import { GlobalProvider } from './context/GlobalContext'
import { LanguageProvider } from './context/LanguageContext'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import 'flowbite';
import './assets/styles/style.css';
import { UserProvider } from './context/UserContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="1028595791747-g35j211ljte5olsej2jmvugv4uk0rbtc.apps.googleusercontent.com">
    <GlobalProvider>
      <AuthProvider>
        <UserProvider>
          <LanguageProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LanguageProvider>
        </UserProvider>
      </AuthProvider>
    </GlobalProvider>
  </GoogleOAuthProvider>
)
