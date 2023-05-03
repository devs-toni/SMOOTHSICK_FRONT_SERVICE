import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, HashRouter } from "react-router-dom"
import './index.css'
import 'flowbite';
import './assets/styles/style.css';
import App from './App';
import { GlobalProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { PlayerProvider } from './context/PlayerContext';
import { LanguageProvider } from './context/LanguageContext';
import { CLIENT_ID } from './config';

ReactDOM.createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <GlobalProvider>
      <AuthProvider>
        <UserProvider>
          <PlayerProvider>
            <LanguageProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </LanguageProvider>
          </PlayerProvider>
        </UserProvider>
      </AuthProvider>
    </GlobalProvider>
  </GoogleOAuthProvider>
)
