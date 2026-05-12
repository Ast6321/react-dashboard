import "../src/app.css"
import './assets/auth.css'
import './assets/Dashboard.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProfileProvider from "../src/components/context/ProfileContext.jsx"

createRoot(document.getElementById('root')).render(
 <ProfileProvider>

    <App />

  </ProfileProvider>,
)
