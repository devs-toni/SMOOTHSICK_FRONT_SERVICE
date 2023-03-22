import ReactDOM from 'react-dom/client'
import { App, GlobalProvider, LanguageProvider, AuthProvider, UserProvider } from './index'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom"
import './index.css'
import 'flowbite';
import './assets/styles/style.css';



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
