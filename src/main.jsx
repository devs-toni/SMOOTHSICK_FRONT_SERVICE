import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalProvider } from './context/GlobalContext'
import { BrowserRouter } from "react-router-dom"
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <GlobalProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalProvider>

)
