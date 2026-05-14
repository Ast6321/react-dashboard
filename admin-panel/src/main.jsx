import "../src/app.css"
import './assets/auth.css'
import './assets/Dashboard.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProfileProvider from "../src/components/context/ProfileContext.jsx"
import AuthProvider from "./components/context/AuthContext.jsx"
import SearchProvider from "./components/context/searchContext.jsx"

createRoot(document.getElementById('root')).render(
 <AuthProvider>
<SearchProvider>
 <ProfileProvider>

    <App />

  </ProfileProvider>
  </SearchProvider>
  </AuthProvider>,
)
