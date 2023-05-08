import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, HashRouter } from "react-router-dom"
import './index.css'
import 'flowbite';
import './assets/styles/style.css';
import App from './App';
import { GlobalProvider } from './context/GlobalContext';
import { RecoveryProvider } from './context/RecoveryContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { PlayerProvider } from './context/PlayerContext';
import { LanguageProvider } from './context/LanguageContext';

ReactDOM.createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <GlobalProvider>
      <RecoveryProvider>
        <AuthProvider>
          <UserProvider>
            <PlayerProvider>
              <LanguageProvider>
                <HashRouter>
                  <App />
                </HashRouter>
              </LanguageProvider>
            </PlayerProvider>
          </UserProvider>
        </AuthProvider>
      </RecoveryProvider>
    </GlobalProvider>
  </GoogleOAuthProvider>
)
