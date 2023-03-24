import ReactDOM from 'react-dom/client'
import { App, GlobalProvider, LanguageProvider, AuthProvider, UserProvider } from './index'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom"
import './index.css'
import 'flowbite';
import './assets/styles/style.css';
import { CLIENT_ID } from './config';



ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
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
