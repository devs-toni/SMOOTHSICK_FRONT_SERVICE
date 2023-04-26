import ReactDOM from 'react-dom/client'
import { App, GlobalProvider, LanguageProvider, AuthProvider, UserProvider, PlayerProvider } from './index'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HashRouter } from "react-router-dom"
import './index.css'
import 'flowbite';
import './assets/styles/style.css';
import { CLIENT_ID } from './config';


let container = null;

// document.addEventListener('DOMContentLoaded', function (event) {
//   if (!container) {
//     container = document.getElementById('root') as HTMLElement;
//     const root = createRoot(container)
//     root.render(
//       <GoogleOAuthProvider clientId={CLIENT_ID}>
//         <GlobalProvider>
//           <AuthProvider>
//             <UserProvider>
//               <PlayerProvider>
//                 <LanguageProvider>
//                   <HashRouter>
//                     <App />
//                   </HashRouter>
//                 </LanguageProvider>
//               </PlayerProvider>
//             </UserProvider>
//           </AuthProvider>
//         </GlobalProvider>
//       </GoogleOAuthProvider>
//     );
//   }
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <GlobalProvider>
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
    </GlobalProvider>
  </GoogleOAuthProvider>
)
