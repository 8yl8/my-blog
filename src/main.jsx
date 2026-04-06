import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext.js'
import styles from './index.module.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>,
)
